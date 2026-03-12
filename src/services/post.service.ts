import { CreatePostI } from "../interfaces";
import { prismaService } from "./prisma.service";

export class PostService {
  async create(postData: CreatePostI) {
    const post = await prismaService.prisma.post.create({
      data: {
        title: postData.title,
        content: postData.content,
        categoryId: postData.categoryId,
        authorId: postData.authorId,
        picture: {
          create: {
            name: postData.picture?.name || "",
            url: postData.picture?.url || "",
          },
        },
      },
      include: {
        picture: true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return post;
  }

  async update(id: number, postData: Partial<CreatePostI>, userId: number) {
    const postExist = await prismaService.prisma.post.findUnique({
      where: { id },
      select: {
        picture: true,
        authorId: true,
      },
    });

    if (!postExist) return null;

    // Check if user is the author or admin
    if (postExist.authorId !== userId) {
      const user = await prismaService.prisma.user.findUnique({
        where: { id: userId },
      });
      if (user?.role !== "ADMIN") {
        return "unauthorized";
      }
      return "unauthorized";
    }

    const updateData: {
      title?: string;
      content?: string;
      categoryId?: number;
      picture?: {
        update: {
          name: string;
          url: string;
        };
      };
    } = {};
    if (postData.title) updateData.title = postData.title;
    if (postData.content) updateData.content = postData.content;
    if (postData.categoryId) updateData.categoryId = postData.categoryId;
    if (postData.picture) {
      updateData.picture = {
        update: {
          name: !postData.picture.name
            ? (postExist.picture?.name as string)
            : postData.picture.name,
          url: !postData.picture.url
            ? (postExist.picture?.url as string)
            : postData.picture.url,
        },
      };
    }

    const post = await prismaService.prisma.post.update({
      where: { id },
      data: updateData,
      include: {
        picture: true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return post;
  }

  async delete(id: number, userId: number) {
    const postExist = await prismaService.prisma.post.findUnique({
      where: { id },
    });

    if (!postExist) return null;

    // Check if user is the author or admin
    if (postExist.authorId !== userId) {
      const user = await prismaService.prisma.user.findUnique({
        where: { id: userId },
      });
      if (user?.role !== "ADMIN") {
        return "unauthorized";
      }
      return "unauthorized";
    }

    const post = await prismaService.prisma.post.delete({
      where: { id },
      include: {
        picture: true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return post;
  }

  async getAll() {
    const posts = await prismaService.prisma.post.findMany({
      include: {
        picture: true,
        favorites: true,
        reactions: true,
        comments: true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            reactions: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  }

  async getById(id: number) {
    const post = await prismaService.prisma.post.findUnique({
      where: { id },
      include: {
        picture: true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
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
        },
        reactions: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            reactions: true,
            comments: true,
          },
        },
      },
    });

    return post;
  }

  async getByAuthorId(authorId: number) {
    const posts = await prismaService.prisma.post.findMany({
      where: { authorId },
      include: {
        picture: true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            reactions: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  }

  async getByCategoryId(categoryId: number) {
    const posts = await prismaService.prisma.post.findMany({
      where: { categoryId },
      include: {
        picture: true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            reactions: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  }

  async getPublished() {
    const posts = await prismaService.prisma.post.findMany({
      where: { published: true },
      include: {
        picture: true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            reactions: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  }

  async togglePublish(id: number, userId: number) {
    const postExist = await prismaService.prisma.post.findUnique({
      where: { id },
    });

    if (!postExist) return null;

    // Check if user is the author or admin
    if (postExist.authorId !== userId) {
      const user = await prismaService.prisma.user.findUnique({
        where: { id: userId },
      });
      if (user?.role !== "ADMIN") {
        return "unauthorized";
      }
      return "unauthorized";
    }

    const post = await prismaService.prisma.post.update({
      where: { id },
      data: {
        published: !postExist.published,
      },
      include: {
        picture: true,
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return post;
  }
}
