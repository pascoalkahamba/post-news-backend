import { User } from "@prisma/client";

export type UserModalT = Pick<
  User,
  "username" | "password" | "email" | "cellPhone" | "role"
>;
export type JsonWebTokenErrorT = "jwt malformed" | "jwt must be provided";
export type UserRoleT = "ADMIN" | "USER";
export type TOperation = "resetPassword" | "deleteAccount";

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
  | "emailAlreadyExist";
