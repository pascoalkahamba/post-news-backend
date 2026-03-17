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
exports.FollowService = void 0;
const prisma_service_1 = require("./prisma.service");
class FollowService {
    create(followerId, followingId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if user to follow exists
            const userToFollow = yield prisma_service_1.prismaService.prisma.user.findUnique({
                where: { id: followingId },
            });
            if (!userToFollow) {
                return { error: "userNotFound" };
            }
            // Check if trying to follow yourself
            if (followerId === followingId) {
                return { error: "cannotFollowYourself" };
            }
            // Check if follow already exists
            const existingFollow = yield prisma_service_1.prismaService.prisma.follow.findUnique({
                where: {
                    followerId_followingId: {
                        followerId,
                        followingId,
                    },
                },
            });
            if (existingFollow) {
                // If already following, unfollow (delete)
                if (existingFollow.status === "ACCEPTED") {
                    yield this.delete(followerId, existingFollow.id);
                    return { message: "Unfollowed successfully", follow: null };
                }
                // If pending or rejected, just return the existing follow
                return { error: "followAlreadyExists", follow: existingFollow };
            }
            // Create new follow
            const follow = yield prisma_service_1.prismaService.prisma.follow.create({
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
        });
    }
    delete(followerId, followId) {
        return __awaiter(this, void 0, void 0, function* () {
            const follow = yield prisma_service_1.prismaService.prisma.follow.findUnique({
                where: { id: followId },
            });
            if (!follow) {
                return null;
            }
            if (follow.followerId !== followerId && follow.followingId !== followerId) {
                return "unauthorized";
            }
            const deletedFollow = yield prisma_service_1.prismaService.prisma.follow.delete({
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
        });
    }
    updateStatus(followId, userId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const follow = yield prisma_service_1.prismaService.prisma.follow.findUnique({
                where: { id: followId },
            });
            if (!follow) {
                return null;
            }
            // Only the person being followed can accept/reject
            if (follow.followingId !== userId) {
                return "unauthorized";
            }
            const updatedFollow = yield prisma_service_1.prismaService.prisma.follow.update({
                where: { id: followId },
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
        });
    }
    getFollowers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const followers = yield prisma_service_1.prismaService.prisma.follow.findMany({
                where: {
                    followingId: userId,
                    status: "ACCEPTED",
                },
                include: {
                    follower: {
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
                orderBy: {
                    createdAt: "desc",
                },
            });
            return followers;
        });
    }
    getFollowing(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const following = yield prisma_service_1.prismaService.prisma.follow.findMany({
                where: {
                    followerId: userId,
                    status: "ACCEPTED",
                },
                include: {
                    following: {
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
                orderBy: {
                    createdAt: "desc",
                },
            });
            return following;
        });
    }
    getPendingRequests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pending = yield prisma_service_1.prismaService.prisma.follow.findMany({
                where: {
                    followingId: userId,
                    status: "PENDING",
                },
                include: {
                    follower: {
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
                orderBy: {
                    createdAt: "desc",
                },
            });
            return pending;
        });
    }
    getFollowStatus(followerId, followingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const follow = yield prisma_service_1.prismaService.prisma.follow.findUnique({
                where: {
                    followerId_followingId: {
                        followerId,
                        followingId,
                    },
                },
                select: {
                    id: true,
                    status: true,
                },
            });
            return { isFollowing: !!follow, status: (follow === null || follow === void 0 ? void 0 : follow.status) || null };
        });
    }
    getFollowersCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield prisma_service_1.prismaService.prisma.follow.count({
                where: {
                    followingId: userId,
                    status: "ACCEPTED",
                },
            });
            return { followersCount: count };
        });
    }
    getFollowingCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield prisma_service_1.prismaService.prisma.follow.count({
                where: {
                    followerId: userId,
                    status: "ACCEPTED",
                },
            });
            return { followingCount: count };
        });
    }
}
exports.FollowService = FollowService;
