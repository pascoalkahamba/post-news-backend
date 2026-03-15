import { prismaService } from "./prisma.service";

export class FavoriteService {
  async create(userId: number, postId: number) {
    const post = await prismaService.prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) return { error: "postNotFound" };

    const existingFavorite = await prismaService.prisma.favorite.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
      select: {
        id: true,
        post: true,
        user: {
          select: {
            id: true,
            username: true,
            role: true,
            email: true,
          },
        },
      },
    });

    if (existingFavorite) {
      await this.delete(userId, existingFavorite.id);
      return existingFavorite;
    }

    const favorite = await prismaService.prisma.favorite.create({
      data: {
        userId,
        postId,
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
      },
    });

    return favorite;
  }

  async delete(userId: number, favoriteId: number) {
    const favorite = await prismaService.prisma.favorite.findUnique({
      where: { id: favoriteId },
    });

    if (!favorite) return null;

    if (favorite.userId !== userId) {
      return "unauthorized";
    }

    const deletedFavorite = await prismaService.prisma.favorite.delete({
      where: { id: favoriteId },
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

    return deletedFavorite;
  }

  async getByUserId(userId: number) {
    const favorites = await prismaService.prisma.favorite.findMany({
      where: { userId },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            picture: true,
            author: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return favorites;
  }

  async getByPostId(postId: number) {
    const favorites = await prismaService.prisma.favorite.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return favorites;
  }

  async getCountForPost(postId: number) {
    const count = await prismaService.prisma.favorite.count({
      where: { postId },
    });

    return { favoriteCount: count };
  }

  async isFavorited(userId: number, postId: number) {
    const favorite = await prismaService.prisma.favorite.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return { isFavorited: !!favorite };
  }
}
