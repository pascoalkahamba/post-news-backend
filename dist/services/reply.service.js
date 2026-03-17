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
exports.ReplyService = void 0;
const prisma_service_1 = require("./prisma.service");
class ReplyService {
    create(replyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const reply = yield prisma_service_1.prismaService.prisma.reply.create({
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
        });
    }
    update(id, replyData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const replyExist = yield prisma_service_1.prismaService.prisma.reply.findUnique({
                where: { id },
                select: {
                    userId: true,
                },
            });
            if (!replyExist)
                return null;
            if (replyExist.userId !== userId) {
                const user = yield prisma_service_1.prismaService.prisma.user.findUnique({
                    where: { id: userId },
                });
                if ((user === null || user === void 0 ? void 0 : user.role) !== "ADMIN") {
                    return "unauthorized";
                }
            }
            const reply = yield prisma_service_1.prismaService.prisma.reply.update({
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
        });
    }
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const replyExist = yield prisma_service_1.prismaService.prisma.reply.findUnique({
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
            if (!replyExist)
                return null;
            // Check if user is the reply owner, comment owner (which is the post author via comment), or admin
            const isReplyOwner = replyExist.userId === userId;
            if (!isReplyOwner) {
                const user = yield prisma_service_1.prismaService.prisma.user.findUnique({
                    where: { id: userId },
                });
                if ((user === null || user === void 0 ? void 0 : user.role) !== "ADMIN") {
                    return "unauthorized";
                }
            }
            const reply = yield prisma_service_1.prismaService.prisma.reply.delete({
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
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const replies = yield prisma_service_1.prismaService.prisma.reply.findMany({
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
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reply = yield prisma_service_1.prismaService.prisma.reply.findUnique({
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
        });
    }
    getByCommentId(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const replies = yield prisma_service_1.prismaService.prisma.reply.findMany({
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
        });
    }
}
exports.ReplyService = ReplyService;
