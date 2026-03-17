"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionService = void 0;
const prisma_service_1 = require("./prisma.service");
class ReactionService {
    create(userId, type, postId, commentId, replyId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (postId) {
                const post = yield prisma_service_1.prismaService.prisma.post.findUnique({
                    where: { id: postId },
                });
                if (!post)
                    return { error: "postNotFound" };
            }
            else if (commentId) {
                const comment = yield prisma_service_1.prismaService.prisma.comment.findUnique({
                    where: { id: commentId },
                });
                if (!comment)
                    return { error: "commentNotFound" };
            }
            else if (replyId) {
                const reply = yield prisma_service_1.prismaService.prisma.reply.findUnique({
                    where: { id: replyId },
                });
                if (!reply)
                    return { error: "replyNotFound" };
            }
            else {
                return { error: "noTarget" };
            }
            const target = postId
                ? { postId }
                : commentId
                    ? { commentId }
                    : { replyId };
            const existingReaction = yield prisma_service_1.prismaService.prisma.reaction.findFirst({
                where: Object.assign({ userId }, target),
            });
            if (existingReaction && existingReaction.type === type) {
                yield this.delete(userId, existingReaction.id);
                return existingReaction;
            }
            if (existingReaction) {
                const updatedReaction = yield prisma_service_1.prismaService.prisma.reaction.update({
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
            const reaction = yield prisma_service_1.prismaService.prisma.reaction.create({
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
        });
    }
    delete(userId, reactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reaction = yield prisma_service_1.prismaService.prisma.reaction.findUnique({
                where: { id: reactionId },
            });
            if (!reaction)
                return null;
            if (reaction.userId !== userId) {
                return "unauthorized";
            }
            const deletedReaction = yield prisma_service_1.prismaService.prisma.reaction.delete({
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
        });
    }
    getByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reactions = yield prisma_service_1.prismaService.prisma.reaction.findMany({
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
        });
    }
    getByCommentId(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reactions = yield prisma_service_1.prismaService.prisma.reaction.findMany({
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
        });
    }
    getByReplyId(replyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reactions = yield prisma_service_1.prismaService.prisma.reaction.findMany({
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
        });
    }
    getUserReactionForPost(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reaction = yield prisma_service_1.prismaService.prisma.reaction.findFirst({
                where: {
                    userId,
                    postId,
                },
            });
            return reaction;
        });
    }
    getUserReactionForComment(userId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reaction = yield prisma_service_1.prismaService.prisma.reaction.findFirst({
                where: {
                    userId,
                    commentId,
                },
            });
            return reaction;
        });
    }
    getUserReactionForReply(userId, replyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reaction = yield prisma_service_1.prismaService.prisma.reaction.findFirst({
                where: {
                    userId,
                    replyId,
                },
            });
            return reaction;
        });
    }
    getReactionCountsForPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existPost = yield prisma_service_1.prismaService.prisma.post.findUnique({
                where: { id: postId },
            });
            if (!existPost) {
                return null;
            }
            const [likes, dislikes] = yield Promise.all([
                prisma_service_1.prismaService.prisma.reaction.count({
                    where: { postId, type: "LIKE" },
                }),
                prisma_service_1.prismaService.prisma.reaction.count({
                    where: { postId, type: "DISLIKE" },
                }),
            ]);
            return { likeCount: likes, dislikeCount: dislikes };
        });
    }
    getReactionCountsForComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existComment = yield prisma_service_1.prismaService.prisma.comment.findUnique({
                where: { id: commentId },
            });
            if (!existComment) {
                return null;
            }
            const [likes, dislikes] = yield Promise.all([
                prisma_service_1.prismaService.prisma.reaction.count({
                    where: { commentId, type: "LIKE" },
                }),
                prisma_service_1.prismaService.prisma.reaction.count({
                    where: { commentId, type: "DISLIKE" },
                }),
            ]);
            return { likeCount: likes, dislikeCount: dislikes };
        });
    }
    getReactionCountsForReply(replyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existReply = yield prisma_service_1.prismaService.prisma.reply.findUnique({
                where: { id: replyId },
            });
            if (!existReply) {
                return null;
            }
            const [likes, dislikes] = yield Promise.all([
                prisma_service_1.prismaService.prisma.reaction.count({
                    where: { replyId, type: "LIKE" },
                }),
                prisma_service_1.prismaService.prisma.reaction.count({
                    where: { replyId, type: "DISLIKE" },
                }),
            ]);
            return { likeCount: likes, dislikeCount: dislikes };
        });
    }
}
exports.ReactionService = ReactionService;
