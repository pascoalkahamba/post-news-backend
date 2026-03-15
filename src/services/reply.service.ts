import { prismaService } from "./prisma.service";

export class ReplyService {
  async create(replyData: {
    content: string;
    commentId: number;
    userId: number;
  }) {
    const reply = await prismaService.prisma.reply.create({
      data: {
        content: replyData.content,
        commentId: replyData.commentId,
        userId: replyData.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
          },
        },
        _count: {
          select: {
            reactions: true,
          },
        },
      },
    });

    return reply;
  }

  async update(id: number, replyData: { content: string }, userId: number) {
    const replyExist = await prismaService.prisma.reply.findUnique({
      where: { id },
      select: {
        userId: true,
      },
    });

    if (!replyExist) return null;

    if (replyExist.userId !== userId) {
      const user = await prismaService.prisma.user.findUnique({
        where: { id: userId },
      });
      if (user?.role !== "ADMIN") {
        return "unauthorized";
      }
    }

    const reply = await prismaService.prisma.reply.update({
      where: { id },
      data: {
        content: replyData.content,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
          },
        },
        _count: {
          select: {
            reactions: true,
          },
        },
      },
    });

    return reply;
  }

  async delete(id: number, userId: number) {
    const replyExist = await prismaService.prisma.reply.findUnique({
      where: { id },
      select: {
        userId: true,
        comment: {
          select: {
            post: {
              select: {
                authorId: true,
              },
            },
          },
        },
      },
    });

    if (!replyExist) return null;

    // Check if user is the reply owner, comment owner (which is the post author via comment), or admin
    const isReplyOwner = replyExist.userId === userId;

    if (!isReplyOwner) {
      const user = await prismaService.prisma.user.findUnique({
        where: { id: userId },
      });
      if (user?.role !== "ADMIN") {
        return "unauthorized";
      }
    }

    const reply = await prismaService.prisma.reply.delete({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
          },
        },
      },
    });

    return reply;
  }

  async getAll() {
    const replies = await prismaService.prisma.reply.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
          },
        },
        reactions: {
          select: {
            id: true,
            type: true,
            userId: true,
          },
        },
        _count: {
          select: {
            reactions: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return replies;
  }

  async getById(id: number) {
    const reply = await prismaService.prisma.reply.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
            post: {
              select: {
                id: true,
                title: true,
                authorId: true,
              },
            },
          },
        },
        reactions: {
          select: {
            id: true,
            type: true,
            userId: true,
          },
        },
        _count: {
          select: {
            reactions: true,
          },
        },
      },
    });

    return reply;
  }

  async getByCommentId(commentId: number) {
    const replies = await prismaService.prisma.reply.findMany({
      where: { commentId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        reactions: {
          select: {
            id: true,
            type: true,
            userId: true,
          },
        },
        _count: {
          select: {
            reactions: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return replies;
  }
}
