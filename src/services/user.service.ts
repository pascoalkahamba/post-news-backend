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

    return true;
  }

  async login(email: string, password: string) {
    const userExists = await prismaService.prisma.user.findFirst({
      where: { email },
    });

    if (!userExists) {
      return;
    }

    const hashPassword = await bcrypt.compare(password, userExists.password);

    if (!hashPassword) {
      return;
    }

    const { password: _, ...user } = userExists;

    const userToken = token.sign(
      { id: userExists.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "8h" }
    );
    return {
      user,
      userToken,
    };
  }
}
