import { prismaService } from "./prisma.service";
import { FollowStatusT } from "../@types";

export class FollowService {
  async create(followerId: number, followingId: number) {
    const userToFollow = await prismaService.prisma.user.findUnique({
      where: { id: followingId },
    });

    if (!userToFollow) {
      return { error: "userNotFound" };
    }

    if (followerId === followingId) {
      return { error: "cannotFollowYourself" };
    }

    const existingFollow = await prismaService.prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      if (existingFollow.status === "ACCEPTED") {
        await this.delete(followerId, existingFollow.id);
        return { message: "Unfollowed successfully", follow: null };
      }
      return { error: "followAlreadyExists", follow: existingFollow };
    }

    const follow = await prismaService.prisma.follow.create({
      data: {
        followerId,
        followingId,
        status: "PENDING",
      },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        following: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return follow;
  }

  async delete(followerId: number, followId: number) {
    const follow = await prismaService.prisma.follow.findUnique({
      where: { id: followId },
    });

    if (!follow) {
      return null;
    }

    if (follow.followerId !== followerId && follow.followingId !== followerId) {
      return "unauthorized";
    }

    const deletedFollow = await prismaService.prisma.follow.delete({
      where: { id: followId },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        following: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return deletedFollow;
  }

  async updateStatus(followId: number, userId: number, status: FollowStatusT) {
    const follow = await prismaService.prisma.follow.findUnique({
      where: {
        followerId_followingId: { followerId: followId, followingId: userId },
      },
    });

    if (!follow) {
      return null;
    }

    if (follow.followingId !== userId) {
      return "unauthorized";
    }

    const updatedFollow = await prismaService.prisma.follow.update({
      where: {
        followerId_followingId: { followerId: followId, followingId: userId },
      },
      data: {
        status,
      },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        following: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return updatedFollow;
  }

  async getFollowers(userId: number) {
    const followers = await prismaService.prisma.follow.findMany({
      where: {
        followingId: userId,
        status: "ACCEPTED",
      },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            posts: true,
            following: true,
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

    return followers;
  }

  async getFollowing(userId: number) {
    const following = await prismaService.prisma.follow.findMany({
      where: {
        followerId: userId,
        status: "ACCEPTED",
      },
      include: {
        following: {
          select: {
            id: true,
            username: true,
            profession: true,
            following: true,
            posts: true,
            email: true,
            profile: {
              select: {
                id: true,
                userId: true,
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

    return following;
  }

  async getPendingRequests(userId: number) {
    const pending = await prismaService.prisma.follow.findMany({
      where: {
        followingId: userId,
        status: "PENDING",
      },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            posts: true,
            email: true,
            following: true,
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

    return pending;
  }

  async getFollowStatus(followerId: number, followingId: number) {
    const follow = await prismaService.prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
      select: {
        id: true,
        status: true,
        follower: {
          select: {
            username: true,
            id: true,
            email: true,
          },
        },
        following: {
          select: {
            username: true,
            id: true,
            email: true,
          },
        },
      },
    });

    return { isFollowing: !!follow, ...follow };
  }

  async getFollowersCount(userId: number) {
    const count = await prismaService.prisma.follow.count({
      where: {
        followingId: userId,
        status: "ACCEPTED",
      },
    });

    return { followersCount: count };
  }

  async getFollowingCount(userId: number) {
    const count = await prismaService.prisma.follow.count({
      where: {
        followerId: userId,
        status: "ACCEPTED",
      },
    });

    return { followingCount: count };
  }
}
