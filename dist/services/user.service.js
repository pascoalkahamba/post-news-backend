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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.DEFAULT_SELECT = void 0;
const utils_1 = require("../utils");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("./prisma.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.DEFAULT_SELECT = {
    username: true,
    email: true,
    role: true,
    cellPhone: true,
};
class UserService {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield bcrypt_1.default.hash(user.password, 10);
            const emailExist = yield prisma_service_1.prismaService.prisma.user.findFirst({
                where: { email: user.email },
            });
            const userCellPhoneExist = yield prisma_service_1.prismaService.prisma.user.findFirst({
                where: { cellPhone: user.cellPhone },
            });
            if (user.role !== "ADMIN" && user.role !== "USER") {
                return "not-accept";
            }
            if (emailExist || userCellPhoneExist)
                return;
            const created = yield prisma_service_1.prismaService.prisma.user.create({
                data: {
                    email: user.email,
                    role: user.role,
                    username: user.username,
                    cellPhone: user.cellPhone,
                    password: hashPassword,
                    profile: {
                        create: {
                            bio: "Aqui pode ser a sua biografia",
                            picture: {
                                create: {
                                    url: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
                                    name: "Default_Name_Of_Photo",
                                },
                            },
                        },
                    },
                },
                select: {
                    username: true,
                    email: true,
                    cellPhone: true,
                    role: true,
                    id: true,
                },
            });
            return created;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield prisma_service_1.prismaService.prisma.user.findFirst({
                where: { email },
            });
            if (!userExist) {
                return;
            }
            const hashPassword = yield bcrypt_1.default.compare(password, userExist.password);
            if (!hashPassword) {
                return;
            }
            const { password: _ } = userExist, user = __rest(userExist, ["password"]);
            const userToken = jsonwebtoken_1.default.sign({ id: userExist.id }, process.env.JWT_SECRET_KEY, { expiresIn: "8h" });
            return {
                user,
                token: userToken,
            };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield prisma_service_1.prismaService.prisma.user.findFirst({
                where: { id },
            });
            const currentUser = yield prisma_service_1.prismaService.prisma.user.findFirst({
                where: { id },
                select: {
                    id: true,
                    role: true,
                },
            });
            if (!userExist) {
                return;
            }
            if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === "ADMIN") {
                return "not-accept";
            }
            const userDeleted = yield prisma_service_1.prismaService.prisma.user.delete({
                where: { id },
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            });
            return userDeleted;
        });
    }
    requestPasswordReset(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield prisma_service_1.prismaService.prisma.user.findFirst({
                where: { email },
            });
            if (!userExist)
                return;
            const token = (0, utils_1.generateResetToken)();
            const expiresAt = (0, date_fns_1.addMinutes)(new Date(), 15);
            yield prisma_service_1.prismaService.prisma.user.update({
                where: { email },
                data: { resetToken: token, resetExpiresAt: expiresAt },
                select: {
                    username: true,
                    email: true,
                },
            });
            const linkToReset = `http://localhost:3000/reset-password?token=${token}`;
            return linkToReset;
        });
    }
    resetPassword(newPassword, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userWithToken = yield prisma_service_1.prismaService.prisma.user.findFirst({
                where: { resetToken: token },
            });
            if (!userWithToken ||
                !userWithToken.resetExpiresAt ||
                (0, date_fns_1.isBefore)(userWithToken.resetExpiresAt, new Date()))
                return;
            const hashed = yield bcrypt_1.default.hash(newPassword, 10);
            const passwordUpdated = yield prisma_service_1.prismaService.prisma.user.update({
                where: { id: userWithToken.id },
                data: {
                    password: hashed,
                    resetExpiresAt: null,
                    resetToken: null,
                },
                select: {
                    email: true,
                    username: true,
                    id: true,
                },
            });
            return passwordUpdated;
        });
    }
    updateProfile(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const { email, username, password, cellPhone, bio, picture, id } = userInfo;
            const hashPassword = yield bcrypt_1.default.hash(password ? password : "", 10);
            const currentUser = yield prisma_service_1.prismaService.prisma.user.findFirst({
                where: { id },
                select: {
                    password: true,
                    profile: {
                        select: {
                            picture: {
                                select: {
                                    url: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!currentUser)
                return;
            const userUpdated = yield prisma_service_1.prismaService.prisma.user.update({
                where: { id },
                data: {
                    username,
                    password: password ? hashPassword : currentUser.password,
                    email,
                    cellPhone,
                    profile: {
                        update: {
                            bio,
                            picture: {
                                update: {
                                    url: picture.url
                                        ? picture.url
                                        : (_b = (_a = currentUser.profile) === null || _a === void 0 ? void 0 : _a.picture) === null || _b === void 0 ? void 0 : _b.url,
                                    name: picture.name
                                        ? picture.name
                                        : (_d = (_c = currentUser.profile) === null || _c === void 0 ? void 0 : _c.picture) === null || _d === void 0 ? void 0 : _d.name,
                                },
                            },
                        },
                    },
                },
                select: {
                    username: true,
                    email: true,
                },
            });
            return userUpdated;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_service_1.prismaService.prisma.user.findFirst({
                where: { id },
                select: {
                    id: true,
                    username: true,
                    favorites: true,
                    email: true,
                    cellPhone: true,
                    posts: {
                        select: {
                            id: true,
                            author: true,
                            comments: true,
                            createdAt: true,
                            category: true,
                            favorites: {
                                select: {
                                    id: true,
                                    userId: true,
                                    postId: true,
                                },
                            },
                            picture: true,
                            reactions: true,
                            _count: true,
                            title: true,
                            content: true,
                        },
                    },
                    reactions: true,
                    profile: {
                        select: {
                            bio: true,
                            userId: true,
                            id: true,
                            picture: true,
                        },
                    },
                },
            });
            if (!user) {
                return;
            }
            return user;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma_service_1.prismaService.prisma.user.findMany({
                select: {
                    id: true,
                    username: true,
                    email: true,
                    cellPhone: true,
                },
            });
            return users;
        });
    }
}
exports.UserService = UserService;
