import { prismaService } from "./prisma.service";

export class CommentService {
  async create(commentData: {
    content: string;
    postId: number;
    userId: number;
  }) {
    const comment = await prismaService.prisma.comment.create({
      data: {
        content: commentData.content,
        postId: commentData.postId,
        userId: commentData.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            reactions: true,
            replies: true,
          },
        },
      },
    });

    return comment;
  }

  async update(id: number, commentData: { content: string }, userId: number) {
    const commentExist = await prismaService.prisma.comment.findUnique({
      where: { id },
      select: {
        userId: true,
      },
    });

    if (!commentExist) return null;

    if (commentExist.userId !== userId) {
      const user = await prismaService.prisma.user.findUnique({
        where: { id: userId },
      });
      if (user?.role !== "ADMIN") {
        return "unauthorized";
      }
    }

    const comment = await prismaService.prisma.comment.update({
      where: { id },
      data: {
        content: commentData.content,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            reactions: true,
            replies: true,
          },
        },
      },
    });

    return comment;
  }

  async delete(id: number, userId: number) {
    const commentExist = await prismaService.prisma.comment.findUnique({
      where: { id },
      select: {
        userId: true,
        post: {
          select: {
            authorId: true,
          },
        },
      },
    });

    if (!commentExist) return null;

    const isCommentOwner = commentExist.userId === userId;
    const isPostOwner = commentExist.post.authorId === userId;

    if (!isCommentOwner && !isPostOwner) {
      const user = await prismaService.prisma.user.findUnique({
        where: { id: userId },
      });
      if (user?.role !== "ADMIN") {
        return "unauthorized";
      }
    }

    const comment = await prismaService.prisma.comment.delete({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return comment;
  }

  async getAll() {
    const comments = await prismaService.prisma.comment.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        replies: true,
        post: {
          select: {
            id: true,
            title: true,
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
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return comments;
  }

  async getById(id: number) {
    const comment = await prismaService.prisma.comment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
            authorId: true,
          },
        },
        reactions: {
          select: {
            id: true,
            type: true,
            userId: true,
          },
        },
        replies: {
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
        },
        _count: {
          select: {
            reactions: true,
            replies: true,
          },
        },
      },
    });

    return comment;
  }

  async getByPostId(postId: number) {
    const comments = await prismaService.prisma.comment.findMany({
      where: { postId },
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
        replies: {
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
        },
        _count: {
          select: {
            reactions: true,
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return comments;
  }

  async getByUserId(userId: number) {
    const comments = await prismaService.prisma.comment.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            reactions: true,
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return comments;
  }
}
