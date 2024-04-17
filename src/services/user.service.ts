import { UserModal } from "../@types";
import { prismaService } from "./prisma.service";
import bcrypt from "bcrypt";
import token from "jsonwebtoken";

export class UserService {
  async create(user: UserModal) {
    const hashPassword = await bcrypt.hash(user.password, 10);

    const emailExists = await prismaService.prisma.user.findFirst({
      where: { email: user.email },
    });

    if (emailExists) {
      return;
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
