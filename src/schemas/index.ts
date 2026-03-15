import { z as zod } from "zod";
import { TOperation, UserRoleT, ReactionTypeT } from "../@types";

const envSchema = zod.object({
  MONGODBCONNECTION: zod.string(),
  PORT: zod.string(),
  DATABASE_URL: zod.string(),
  gsBucket: zod.string().min(6),
  apiKey: zod.string().min(5),
  authDomain: zod.string().min(5),
  projectId: zod.string().min(5),
  storageBucket: zod.string().min(5),
  messagingSenderId: zod.string().min(5),
  appId: zod.string().min(5),
  measurementId: zod.string().min(5),
  JWT_SECRET_KEY: zod.string(),
  CLOUDINARY_URL: zod.string().min(5),
  CLOUDINARY_CLOUD_NAME: zod.string().min(5),
  CLOUDINARY_API_KEY: zod.string().min(5),
  CLOUDINARY_API_SECRET: zod.string().min(5),
});

const userCreateSchema = zod.object({
  email: zod.string().email().min(5).max(50),
  username: zod.string().min(2).max(50),
  password: zod.string().min(6).max(50),
  cellPhone: zod.string().min(9).max(9),
  role: zod.string().min(2).max(10) as zod.ZodType<UserRoleT>,
});

const requestPasswordResetSchema = userCreateSchema.pick({
  email: true,
});

const resetPasswordSchema = zod.object({
  newPassword: zod.string().min(6).max(50),
  token: zod.string().min(10),
});

const requestVerificationCodeSchema = zod.object({
  email: zod.string().email(),
  operation: zod.string().min(5) as zod.ZodType<TOperation>,
});
const verifyCodeAndProceedSchema = zod.object({
  email: zod.string().email(),
  code: zod.string().min(6),
  operation: zod.string().min(5) as zod.ZodType<TOperation>,
});

const pictureSchema = zod.object({
  name: zod.string().min(2).max(50),
  url: zod.string().url(),
});

const updateProfileSchema = zod.object({
  username: zod.string().min(2).max(50),
  password: zod.string().min(6).max(50).optional(),
  email: zod.string().email().min(5).max(50),
  cellPhone: zod.string().length(9),
  bio: zod.string().min(10).max(500),
});

const categoryCreateSchema = zod.object({
  name: zod.string().min(2).max(100),
  description: zod.string().min(2).max(500),
});

const categoryUpdateSchema = zod.object({
  name: zod.string().min(2).max(100),
  description: zod.string().min(2).max(500),
});

const reactionCreateSchema = zod.object({
  type: zod.enum(["LIKE", "DISLIKE"]) as zod.ZodType<ReactionTypeT>,
  postId: zod.number().optional(),
  commentId: zod.number().optional(),
  replyId: zod.number().optional(),
});

const favoriteCreateSchema = zod.object({
  postId: zod.number(),
});

const postCreateSchema = zod.object({
  title: zod.string().min(2).max(255),
  content: zod.string().min(2),
  categoryId: zod.string(),
});

const postUpdateSchema = zod.object({
  title: zod.string().min(2).max(255).optional(),
  content: zod.string().min(2).optional(),
  categoryId: zod.string().optional(),
  published: zod.boolean().optional(),
});

const commentCreateSchema = zod.object({
  content: zod.string().min(1),
  postId: zod.string(),
});

const commentUpdateSchema = zod.object({
  content: zod.string().min(1),
});

const replyCreateSchema = zod.object({
  content: zod.string().min(1),
  commentId: zod.string(),
});

const replyUpdateSchema = zod.object({
  content: zod.string().min(1),
});

export {
  envSchema,
  userCreateSchema,
  updateProfileSchema,
  favoriteCreateSchema,
  pictureSchema,
  requestPasswordResetSchema,
  requestVerificationCodeSchema,
  resetPasswordSchema,
  verifyCodeAndProceedSchema,
  categoryCreateSchema,
  categoryUpdateSchema,
  postCreateSchema,
  postUpdateSchema,
  reactionCreateSchema,
  commentCreateSchema,
  commentUpdateSchema,
  replyCreateSchema,
  replyUpdateSchema,
};
