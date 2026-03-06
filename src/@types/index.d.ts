import { Category, User, Post } from "@prisma/client";

export type UserModalT = Pick<
  User,
  "username" | "password" | "email" | "cellPhone" | "role"
>;
export type UserModal = Pick<User, "username" | "password" | "email">;
export type CategoryModalT = Pick<Category, "name" | "description">;
export type PostModalT = Pick<
  Post,
  "title" | "content" | "categoryId" | "authorId"
>;
export type JsonWebTokenErrorT = "jwt malformed" | "jwt must be provided";
export type UserRoleT = "ADMIN" | "USER";
export type TOperation = "resetPassword" | "deleteAccount";
export type ReactionTypeT = "LIKE" | "DISLIKE" | "FAVORITE";

export type TPathError =
  | "email"
  | "password"
  | "codeForStudent"
  | "cellPhone"
  | "username"
  | "bio"
  | "token"
  | "newPassword"
  | "role"
  | "code"
  | "operation"
  | "emailNotFound"
  | "emailAlreadyExist"
  | "title"
  | "content"
  | "categoryId"
  | "type"
  | "postId"
  | "commentId"
  | "replyId"
  | "reactionId";
