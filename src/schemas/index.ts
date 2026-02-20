import { z as zod } from "zod";
import { TOperation, UserRoleT } from "../@types";

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

export {
  envSchema,
  userCreateSchema,
  updateProfileSchema,
  pictureSchema,
  requestPasswordResetSchema,
  requestVerificationCodeSchema,
  resetPasswordSchema,
  verifyCodeAndProceedSchema,
  categoryCreateSchema,
  categoryUpdateSchema,
};
