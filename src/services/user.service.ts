import { UserModalT } from "../@types";
import { UpdateProfileI } from "../interfaces";
import { generateResetToken } from "../utils";
import { addMinutes, isBefore } from "date-fns";
import { prismaService } from "./prisma.service";
import bcrypt from "bcrypt";
import token from "jsonwebtoken";

export const DEFAULT_SELECT = {
  username: true,
  email: true,
  role: true,
  cellPhone: true,
};

export class UserService {
  async create(user: UserModalT) {
    const hashPassword = await bcrypt.hash(user.password, 10);

    const emailExist = await prismaService.prisma.user.findFirst({
      where: { email: user.email },
    });

    const userCellPhoneExist = await prismaService.prisma.user.findFirst({
      where: { cellPhone: user.cellPhone },
    });

    if (user.role !== "ADMIN" && user.role !== "USER") {
      return "not-accept";
    }

    if (emailExist || userCellPhoneExist) return;

    const created = await prismaService.prisma.user.create({
      data: {
        email: user.email,
        role: user.role,
        username: user.username,
        cellPhone: user.cellPhone,
        password: hashPassword,
        profile: {
          create: {
            bio: "Aqui pode ser a sua biografia",
            picture: {
              create: {
                url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
                name: "Default_Name_Of_Photo",
              },
            },
          },
        },
      },
      select: {
        username: true,
        email: true,
        cellPhone: true,
        role: true,
        id: true,
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
      { expiresIn: "8h" },
    );
    return {
      user,
      token: userToken,
    };
  }

  async delete(id: number) {
    const userExist = await prismaService.prisma.user.findFirst({
      where: { id },
    });

    const currentUser = await prismaService.prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        role: true,
      },
    });

    if (!userExist) {
      return;
    }

    if (currentUser?.role === "ADMIN") {
      return "not-accept";
    }

    const userDeleted = await prismaService.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    return userDeleted;
  }

  async requestPasswordReset(email: string) {
    const userExist = await prismaService.prisma.user.findFirst({
      where: { email },
    });

    if (!userExist) return;

    const token = generateResetToken();
    const expiresAt = addMinutes(new Date(), 15);

    await prismaService.prisma.user.update({
      where: { email },
      data: { resetToken: token, resetExpiresAt: expiresAt },
      select: {
        username: true,
        email: true,
      },
    });

    const linkToReset = `http://localhost:3000/reset-password?token=${token}`;
    return linkToReset;
  }

  async resetPassword(newPassword: string, token: string) {
    const userWithToken = await prismaService.prisma.user.findFirst({
      where: { resetToken: token },
    });

    if (
      !userWithToken ||
      !userWithToken.resetExpiresAt ||
      isBefore(userWithToken.resetExpiresAt, new Date())
    )
      return;

    const hashed = await bcrypt.hash(newPassword, 10);

    const passwordUpdated = await prismaService.prisma.user.update({
      where: { id: userWithToken.id },
      data: {
        password: hashed,
        resetExpiresAt: null,
        resetToken: null,
      },
      select: {
        email: true,
        username: true,
        id: true,
      },
    });

    return passwordUpdated;
  }

  async updateProfile(userInfo: UpdateProfileI) {
    const { email, username, password, cellPhone, bio, picture, id } = userInfo;
    const hashPassword = await bcrypt.hash(password ? password : "", 10);

    const currentUser = await prismaService.prisma.user.findFirst({
      where: { id },
      select: {
        password: true,
        profile: {
          select: {
            picture: {
              select: {
                url: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!currentUser) return;

    const userUpdated = await prismaService.prisma.user.update({
      where: { id },
      data: {
        username,
        password: password ? hashPassword : currentUser.password,
        email,
        cellPhone,
        profile: {
          update: {
            bio,
            picture: {
              update: {
                url: picture.url
                  ? picture.url
                  : currentUser.profile?.picture?.url,
                name: picture.name
                  ? picture.name
                  : currentUser.profile?.picture?.name,
              },
            },
          },
        },
      },
      select: {
        username: true,
        email: true,
      },
    });

    return userUpdated;
  }

  async getUserById(id: number) {
    const user = await prismaService.prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        cellPhone: true,
        posts: true,
        likes: true,
        profile: {
          select: {
            bio: true,
            picture: true,
          },
        },
      },
    });

    if (!user) {
      return;
    }

    return user;
  }

  async getAllUsers() {
    const users = await prismaService.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        cellPhone: true,
      },
    });

    return users;
  }
}
