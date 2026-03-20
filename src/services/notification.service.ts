import { prismaService } from "./prisma.service";
import { CreateNotificationI, UpdateNotificationI } from "../interfaces";

export class NotificationService {
  async create(notificationData: CreateNotificationI) {
    const { userId, actorId, type, entityId, entityType } = notificationData;

    if (userId === actorId) {
      return null;
    }

    const user = await prismaService.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { error: "userNotFound" };
    }

    const actor = await prismaService.prisma.user.findUnique({
      where: { id: actorId },
    });

    if (!actor) {
      return { error: "actorNotFound" };
    }

    if (type === "FOLLOW" || type === "UNFOLLOW") {
      const existingNotification =
        await prismaService.prisma.notification.findFirst({
          where: {
            userId,
            actorId,
            type,
          },
        });

      if (existingNotification) {
        const updatedNotification =
          await prismaService.prisma.notification.update({
            where: { id: existingNotification.id },
            data: {
              type,
              read: false,
            },
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
              actor: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
            },
          });

        return updatedNotification;
      }
    }

    const notification = await prismaService.prisma.notification.create({
      data: {
        userId,
        actorId,
        type,
        entityId,
        entityType,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        actor: {
          select: {
            id: true,
            username: true,
            email: true,
            profile: {
              select: {
                id: true,
                picture: true,
              },
            },
          },
        },
      },
    });

    return notification;
  }

  async getById(id: number) {
    const notification = await prismaService.prisma.notification.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        actor: {
          select: {
            id: true,
            username: true,
            email: true,
            profile: {
              select: {
                id: true,
                picture: true,
              },
            },
          },
        },
      },
    });

    return notification;
  }

  async getByUserId(userId: number) {
    const notifications = await prismaService.prisma.notification.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        actor: {
          select: {
            id: true,
            username: true,
            email: true,
            profile: {
              select: {
                id: true,
                picture: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notifications;
  }

  async getUnreadByUserId(userId: number) {
    const notifications = await prismaService.prisma.notification.findMany({
      where: {
        userId,
        read: false,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        actor: {
          select: {
            id: true,
            username: true,
            email: true,
            profile: {
              select: {
                id: true,
                picture: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notifications;
  }

  async update(id: number, notificationData: UpdateNotificationI) {
    const notificationExist =
      await prismaService.prisma.notification.findUnique({
        where: { id },
      });

    if (!notificationExist) {
      return null;
    }

    const notification = await prismaService.prisma.notification.update({
      where: { id },
      data: notificationData,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        actor: {
          select: {
            id: true,
            username: true,
            email: true,
            profile: {
              select: {
                id: true,
                picture: true,
              },
            },
          },
        },
      },
    });

    return notification;
  }

  async markAsRead(id: number, userId: number) {
    const notificationExist =
      await prismaService.prisma.notification.findUnique({
        where: { id },
      });

    if (!notificationExist) {
      return null;
    }

    if (notificationExist.userId !== userId) {
      return "unauthorized";
    }

    const notification = await prismaService.prisma.notification.update({
      where: { id },
      data: { read: true },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        actor: {
          select: {
            id: true,
            username: true,
            email: true,
            profile: {
              select: {
                id: true,
                picture: true,
              },
            },
          },
        },
      },
    });

    return notification;
  }

  async markAllAsRead(userId: number) {
    await prismaService.prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    });

    return { message: "All notifications marked as read" };
  }

  async delete(id: number, userId: number) {
    const notificationExist =
      await prismaService.prisma.notification.findUnique({
        where: { id },
      });

    if (!notificationExist) {
      return null;
    }

    if (notificationExist.userId !== userId) {
      return "unauthorized";
    }

    const notification = await prismaService.prisma.notification.delete({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        actor: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return notification;
  }

  async getUnreadCount(userId: number) {
    const count = await prismaService.prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    });

    return { unreadCount: count };
  }
}
