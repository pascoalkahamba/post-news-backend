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
exports.FavoriteService = void 0;
const prisma_service_1 = require("./prisma.service");
class FavoriteService {
    create(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield prisma_service_1.prismaService.prisma.post.findUnique({
                where: { id: postId },
            });
            if (!post)
                return { error: "postNotFound" };
            const existingFavorite = yield prisma_service_1.prismaService.prisma.favorite.findUnique({
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
                yield this.delete(userId, existingFavorite.id);
                return existingFavorite;
            }
            const favorite = yield prisma_service_1.prismaService.prisma.favorite.create({
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
        });
    }
    delete(userId, favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favorite = yield prisma_service_1.prismaService.prisma.favorite.findUnique({
                where: { id: favoriteId },
            });
            if (!favorite)
                return null;
            if (favorite.userId !== userId) {
                return "unauthorized";
            }
            const deletedFavorite = yield prisma_service_1.prismaService.prisma.favorite.delete({
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
        });
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favorites = yield prisma_service_1.prismaService.prisma.favorite.findMany({
                where: { userId },
                include: {
                    post: {
                        select: {
                            id: true,
                            title: true,
                            content: true,
                            createdAt: true,
                            picture: true,
                            category: true,
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
        });
    }
    getByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favorites = yield prisma_service_1.prismaService.prisma.favorite.findMany({
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
        });
    }
    getCountForPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield prisma_service_1.prismaService.prisma.favorite.count({
                where: { postId },
            });
            return { favoriteCount: count };
        });
    }
    isFavorited(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favorite = yield prisma_service_1.prismaService.prisma.favorite.findUnique({
                where: {
                    userId_postId: {
                        userId,
                        postId,
                    },
                },
            });
            return { isFavorited: !!favorite };
        });
    }
}
exports.FavoriteService = FavoriteService;
