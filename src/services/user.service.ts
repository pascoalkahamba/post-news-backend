import { UserModalT } from "../@types";
import { MILLISECONDSINTHREEMONTHS } from "../utils";
import { prismaService } from "./prisma.service";
import bcrypt from "bcrypt";
import token from "jsonwebtoken";

export class UserService {
  async create(user: UserModalT) {
    const hashPassword = await bcrypt.hash(user.password, 10);

    const emailExist = await prismaService.prisma.user.findFirst({
      where: { email: user.email },
    });

    if (emailExist) {
      return false;
    }

    const created = await prismaService.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword,
      },
      select: {
        name: true,
        email: true,
      },
    });
    return created;
  }

  async login(email: string, password: string) {
    const userExist = await prismaService.prisma.user.findFirst({
      where: { email },
    });

    if (!userExist) {
      return;
    }

    const hashPassword = await bcrypt.compare(password, userExist.password);

    if (!hashPassword) {
      return;
    }

    const { password: _, ...user } = userExist;

    const userToken = token.sign(
      { id: userExist.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "8h" }
    );
    return {
      user,
      userToken,
    };
  }

  async delete(id: number) {
    const userExist = await prismaService.prisma.user.findFirst({
      where: { id },
    });

    if (!userExist) {
      return;
    }

    const userDeleted = await prismaService.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return userDeleted;
  }

  async updatePassword(
    email: string,
    newPassword: string,
    verifyEmail: boolean
  ) {
    const hashPassword = await bcrypt.hash(newPassword, 10);
    let passwordUpdate;

    const userExist = await prismaService.prisma.user.findFirst({
      where: { email },
    });

    if (!userExist) {
      return;
    }

    if (verifyEmail) {
      passwordUpdate = await prismaService.prisma.user.update({
        where: { email },
        data: { password: hashPassword },
        select: {
          name: true,
          email: true,
        },
      });
    }

    if (!passwordUpdate) {
      return "not-accept";
    }

    return passwordUpdate;
  }

  async updateDataOfUser(
    id: number,
    newUser: UserModalT,
    verifyEmail: boolean
  ) {
    const { email, name, password } = newUser;
    const hashPassword = await bcrypt.hash(password, 10);

    setTimeout(() => {}, MILLISECONDSINTHREEMONTHS);

    const currentUser = await prismaService.prisma.user.findFirst({
      where: { id },
    });

    if (!currentUser) {
      return;
    }

    if (!verifyEmail && email !== currentUser.email) {
      return currentUser.id;
    }

    const userUpdated = await prismaService.prisma.user.update({
      where: { id },
      data: {
        name,
        password: hashPassword,
        email,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return userUpdated;
  }
}
