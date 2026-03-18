"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUpdateSchema = exports.followCreateSchema = exports.replyUpdateSchema = exports.replyCreateSchema = exports.commentUpdateSchema = exports.commentCreateSchema = exports.reactionCreateSchema = exports.postUpdateSchema = exports.postCreateSchema = exports.categoryUpdateSchema = exports.categoryCreateSchema = exports.verifyCodeAndProceedSchema = exports.resetPasswordSchema = exports.requestVerificationCodeSchema = exports.requestPasswordResetSchema = exports.pictureSchema = exports.favoriteCreateSchema = exports.updateProfileSchema = exports.userCreateSchema = exports.envSchema = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    MONGODBCONNECTION: zod_1.z.string(),
    PORT: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string(),
    gsBucket: zod_1.z.string().min(6),
    apiKey: zod_1.z.string().min(5),
    authDomain: zod_1.z.string().min(5),
    projectId: zod_1.z.string().min(5),
    storageBucket: zod_1.z.string().min(5),
    messagingSenderId: zod_1.z.string().min(5),
    appId: zod_1.z.string().min(5),
    measurementId: zod_1.z.string().min(5),
    JWT_SECRET_KEY: zod_1.z.string(),
    CLOUDINARY_URL: zod_1.z.string().min(5),
    CLOUDINARY_CLOUD_NAME: zod_1.z.string().min(5),
    CLOUDINARY_API_KEY: zod_1.z.string().min(5),
    CLOUDINARY_API_SECRET: zod_1.z.string().min(5),
});
exports.envSchema = envSchema;
const userCreateSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(5).max(50),
    username: zod_1.z.string().min(2).max(50),
    password: zod_1.z.string().min(6).max(50),
    cellPhone: zod_1.z.string().min(9).max(9),
    role: zod_1.z.string().min(2).max(10),
    profession: zod_1.z.string().max(100).optional(),
});
exports.userCreateSchema = userCreateSchema;
const requestPasswordResetSchema = userCreateSchema.pick({
    email: true,
});
exports.requestPasswordResetSchema = requestPasswordResetSchema;
const resetPasswordSchema = zod_1.z.object({
    newPassword: zod_1.z.string().min(6).max(50),
    token: zod_1.z.string().min(10),
});
exports.resetPasswordSchema = resetPasswordSchema;
const requestVerificationCodeSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    operation: zod_1.z.string().min(5),
});
exports.requestVerificationCodeSchema = requestVerificationCodeSchema;
const verifyCodeAndProceedSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    code: zod_1.z.string().min(6),
    operation: zod_1.z.string().min(5),
});
exports.verifyCodeAndProceedSchema = verifyCodeAndProceedSchema;
const pictureSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(50),
    url: zod_1.z.string().url(),
});
exports.pictureSchema = pictureSchema;
const updateProfileSchema = zod_1.z.object({
    username: zod_1.z.string().min(2).max(50),
    password: zod_1.z.string().min(6).max(50).optional(),
    email: zod_1.z.string().email().min(5).max(50),
    cellPhone: zod_1.z.string().length(9),
    bio: zod_1.z.string().min(10).max(500),
    profession: zod_1.z.string().max(100).optional(),
});
exports.updateProfileSchema = updateProfileSchema;
const categoryCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    description: zod_1.z.string().min(2).max(500),
});
exports.categoryCreateSchema = categoryCreateSchema;
const categoryUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    description: zod_1.z.string().min(2).max(500),
});
exports.categoryUpdateSchema = categoryUpdateSchema;
const reactionCreateSchema = zod_1.z.object({
    type: zod_1.z.enum(["LIKE", "DISLIKE"]),
    postId: zod_1.z.number().optional(),
    commentId: zod_1.z.number().optional(),
    replyId: zod_1.z.number().optional(),
});
exports.reactionCreateSchema = reactionCreateSchema;
const favoriteCreateSchema = zod_1.z.object({
    postId: zod_1.z.number(),
});
exports.favoriteCreateSchema = favoriteCreateSchema;
const postCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(2).max(255),
    content: zod_1.z.string().min(2),
    categoryId: zod_1.z.string(),
});
exports.postCreateSchema = postCreateSchema;
const postUpdateSchema = zod_1.z.object({
    title: zod_1.z.string().min(2).max(255).optional(),
    content: zod_1.z.string().min(2).optional(),
    categoryId: zod_1.z.string().optional(),
    published: zod_1.z.boolean().optional(),
});
exports.postUpdateSchema = postUpdateSchema;
const commentCreateSchema = zod_1.z.object({
    content: zod_1.z.string().min(1),
    postId: zod_1.z.number(),
});
exports.commentCreateSchema = commentCreateSchema;
const commentUpdateSchema = zod_1.z.object({
    content: zod_1.z.string().min(1),
});
exports.commentUpdateSchema = commentUpdateSchema;
const replyCreateSchema = zod_1.z.object({
    content: zod_1.z.string().min(1),
    commentId: zod_1.z.number(),
});
exports.replyCreateSchema = replyCreateSchema;
const replyUpdateSchema = zod_1.z.object({
    content: zod_1.z.string().min(1),
});
exports.replyUpdateSchema = replyUpdateSchema;
const followCreateSchema = zod_1.z.object({
    followingId: zod_1.z.number(),
});
exports.followCreateSchema = followCreateSchema;
const followUpdateSchema = zod_1.z.object({
    status: zod_1.z.enum([
        "PENDING",
        "ACCEPTED",
        "REJECTED",
    ]),
});
exports.followUpdateSchema = followUpdateSchema;
