import { ReactionTypeT } from "../@types";
import { prismaService } from "./prisma.service";

export class ReactionService {
  async create(
    userId: number,
    type: ReactionTypeT,
    postId?: number,
    commentId?: number,
    replyId?: number,
  ) {
    // Check if target exists
    if (postId) {
      const post = await prismaService.prisma.post.findUnique({
        where: { id: postId },
      });
      if (!post) return { error: "postNotFound" };
    } else if (commentId) {
      const comment = await prismaService.prisma.comment.findUnique({
        where: { id: commentId },
      });
      if (!comment) return { error: "commentNotFound" };
    } else if (replyId) {
      const reply = await prismaService.prisma.reply.findUnique({
        where: { id: replyId },
      });
      if (!reply) return { error: "replyNotFound" };
    } else {
      return { error: "noTarget" };
    }

    // Check if reaction already exists
    const existingReaction = await prismaService.prisma.reaction.findFirst({
      where: {
        userId,
        OR: [
          { postId: postId || null },
          { commentId: commentId || null },
          { replyId: replyId || null },
        ],
      },
    });

    if (existingReaction) {
      // Update existing reaction
      const updatedReaction = await prismaService.prisma.reaction.update({
        where: { id: existingReaction.id },
        data: { type },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });
      return updatedReaction;
    }

    // Create new reaction
    const reaction = await prismaService.prisma.reaction.create({
      data: {
        userId,
        type,
        postId: postId || null,
        commentId: commentId || null,
        replyId: replyId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return reaction;
  }

  async delete(userId: number, reactionId: number) {
    const reaction = await prismaService.prisma.reaction.findUnique({
      where: { id: reactionId },
    });

    if (!reaction) return null;

    if (reaction.userId !== userId) {
      return "unauthorized";
    }

    const deletedReaction = await prismaService.prisma.reaction.delete({
      where: { id: reactionId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return deletedReaction;
  }

  async getByPostId(postId: number) {
    const reactions = await prismaService.prisma.reaction.findMany({
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

    return reactions;
  }

  async getByCommentId(commentId: number) {
    const reactions = await prismaService.prisma.reaction.findMany({
      where: { commentId },
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

    return reactions;
  }

  async getByReplyId(replyId: number) {
    const reactions = await prismaService.prisma.reaction.findMany({
      where: { replyId },
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

    return reactions;
  }

  async getUserReactionForPost(userId: number, postId: number) {
    const reaction = await prismaService.prisma.reaction.findFirst({
      where: {
        userId,
        postId,
      },
    });

    return reaction;
  }

  async getUserReactionForComment(userId: number, commentId: number) {
    const reaction = await prismaService.prisma.reaction.findFirst({
      where: {
        userId,
        commentId,
      },
    });

    return reaction;
  }

  async getUserReactionForReply(userId: number, replyId: number) {
    const reaction = await prismaService.prisma.reaction.findFirst({
      where: {
        userId,
        replyId,
      },
    });

    return reaction;
  }

  async getReactionCountsForPost(postId: number) {
    const [likes, dislikes] = await Promise.all([
      prismaService.prisma.reaction.count({
        where: { postId, type: "LIKE" },
      }),
      prismaService.prisma.reaction.count({
        where: { postId, type: "DISLIKE" },
      }),
    ]);

    return { likeCount: likes, dislikeCount: dislikes };
  }

  async getReactionCountsForComment(commentId: number) {
    const [likes, dislikes] = await Promise.all([
      prismaService.prisma.reaction.count({
        where: { commentId, type: "LIKE" },
      }),
      prismaService.prisma.reaction.count({
        where: { commentId, type: "DISLIKE" },
      }),
    ]);

    return { likeCount: likes, dislikeCount: dislikes };
  }

  async getReactionCountsForReply(replyId: number) {
    const [likes, dislikes] = await Promise.all([
      prismaService.prisma.reaction.count({
        where: { replyId, type: "LIKE" },
      }),
      prismaService.prisma.reaction.count({
        where: { replyId, type: "DISLIKE" },
      }),
    ]);

    return { likeCount: likes, dislikeCount: dislikes };
  }
}
