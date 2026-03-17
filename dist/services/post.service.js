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
exports.PostService = void 0;
const prisma_service_1 = require("./prisma.service");
class PostService {
    create(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const post = yield prisma_service_1.prismaService.prisma.post.create({
                data: {
                    title: postData.title,
                    content: postData.content,
                    categoryId: postData.categoryId,
                    authorId: postData.authorId,
                    picture: {
                        create: {
                            name: ((_a = postData.picture) === null || _a === void 0 ? void 0 : _a.name) || "",
                            url: ((_b = postData.picture) === null || _b === void 0 ? void 0 : _b.url) || "",
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
        });
    }
    update(id, postData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const postExist = yield prisma_service_1.prismaService.prisma.post.findUnique({
                where: { id },
                select: {
                    picture: true,
                    authorId: true,
                },
            });
            if (!postExist)
                return null;
            if (postExist.authorId !== userId) {
                const user = yield prisma_service_1.prismaService.prisma.user.findUnique({
                    where: { id: userId },
                });
                if ((user === null || user === void 0 ? void 0 : user.role) !== "ADMIN") {
                    return "unauthorized";
                }
                return "unauthorized";
            }
            const updateData = {};
            if (postData.title)
                updateData.title = postData.title;
            if (postData.content)
                updateData.content = postData.content;
            if (postData.categoryId)
                updateData.categoryId = postData.categoryId;
            if (postData.picture) {
                updateData.picture = {
                    update: {
                        name: !postData.picture.name
                            ? (_a = postExist.picture) === null || _a === void 0 ? void 0 : _a.name
                            : postData.picture.name,
                        url: !postData.picture.url
                            ? (_b = postExist.picture) === null || _b === void 0 ? void 0 : _b.url
                            : postData.picture.url,
                    },
                };
            }
            const post = yield prisma_service_1.prismaService.prisma.post.update({
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
        });
    }
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const postExist = yield prisma_service_1.prismaService.prisma.post.findUnique({
                where: { id },
            });
            if (!postExist)
                return null;
            if (postExist.authorId !== userId) {
                const user = yield prisma_service_1.prismaService.prisma.user.findUnique({
                    where: { id: userId },
                });
                if ((user === null || user === void 0 ? void 0 : user.role) !== "ADMIN") {
                    return "unauthorized";
                }
            }
            const post = yield prisma_service_1.prismaService.prisma.post.delete({
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
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield prisma_service_1.prismaService.prisma.post.findMany({
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
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield prisma_service_1.prismaService.prisma.post.findUnique({
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
                            reactions: {
                                select: {
                                    type: true,
                                    id: true,
                                    userId: true,
                                    postId: true,
                                },
                            },
                            replies: {
                                select: {
                                    id: true,
                                    reactions: {
                                        select: {
                                            type: true,
                                            id: true,
                                            userId: true,
                                            postId: true,
                                        },
                                    },
                                    userId: true,
                                    content: true,
                                    commentId: true,
                                    createdAt: true,
                                    user: {
                                        select: {
                                            id: true,
                                            username: true,
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
                            },
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                    profile: {
                                        select: {
                                            picture: true,
                                        },
                                    },
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
                            type: true,
                            id: true,
                            userId: true,
                            postId: true,
                        },
                    },
                    favorites: {
                        select: {
                            id: true,
                            postId: true,
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
        });
    }
    getByAuthorId(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield prisma_service_1.prismaService.prisma.post.findMany({
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
        });
    }
    getByCategoryId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield prisma_service_1.prismaService.prisma.post.findMany({
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
        });
    }
    getPublished() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield prisma_service_1.prismaService.prisma.post.findMany({
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
        });
    }
    togglePublish(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const postExist = yield prisma_service_1.prismaService.prisma.post.findUnique({
                where: { id },
            });
            if (!postExist)
                return null;
            if (postExist.authorId !== userId) {
                const user = yield prisma_service_1.prismaService.prisma.user.findUnique({
                    where: { id: userId },
                });
                if ((user === null || user === void 0 ? void 0 : user.role) !== "ADMIN") {
                    return "unauthorized";
                }
                return "unauthorized";
            }
            const post = yield prisma_service_1.prismaService.prisma.post.update({
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
        });
    }
}
exports.PostService = PostService;
