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
exports.CommentService = void 0;
const prisma_service_1 = require("./prisma.service");
class CommentService {
    create(commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield prisma_service_1.prismaService.prisma.comment.create({
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
        });
    }
    update(id, commentData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentExist = yield prisma_service_1.prismaService.prisma.comment.findUnique({
                where: { id },
                select: {
                    userId: true,
                },
            });
            if (!commentExist)
                return null;
            if (commentExist.userId !== userId) {
                const user = yield prisma_service_1.prismaService.prisma.user.findUnique({
                    where: { id: userId },
                });
                if ((user === null || user === void 0 ? void 0 : user.role) !== "ADMIN") {
                    return "unauthorized";
                }
            }
            const comment = yield prisma_service_1.prismaService.prisma.comment.update({
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
        });
    }
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentExist = yield prisma_service_1.prismaService.prisma.comment.findUnique({
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
            if (!commentExist)
                return null;
            const isCommentOwner = commentExist.userId === userId;
            const isPostOwner = commentExist.post.authorId === userId;
            if (!isCommentOwner && !isPostOwner) {
                const user = yield prisma_service_1.prismaService.prisma.user.findUnique({
                    where: { id: userId },
                });
                if ((user === null || user === void 0 ? void 0 : user.role) !== "ADMIN") {
                    return "unauthorized";
                }
            }
            const comment = yield prisma_service_1.prismaService.prisma.comment.delete({
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
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield prisma_service_1.prismaService.prisma.comment.findMany({
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
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield prisma_service_1.prismaService.prisma.comment.findUnique({
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
        });
    }
    getByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield prisma_service_1.prismaService.prisma.comment.findMany({
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
        });
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield prisma_service_1.prismaService.prisma.comment.findMany({
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
        });
    }
}
exports.CommentService = CommentService;
