import { UserModal } from "../@types";
import { prismaService } from "./prisma.service";
import bcrypt from "bcrypt";
import token from "jsonwebtoken";

export class UserService {
  async create(user: UserModal, verifyEmail: boolean) {
    const hashPassword = await bcrypt.hash(user.password, 10);

    const emailExist = await prismaService.prisma.user.findFirst({
      where: { email: user.email },
    });

    if (emailExist) {
      return false;
    }

    if (verifyEmail) {
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

    const userAbleCreated = {
      name: "Pascoal Kahamba",
      email: "pascoalkahamba25@gmail.com",
    };

    return userAbleCreated;
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

  async updatePasswordOrUsername(email: string) {}
}
