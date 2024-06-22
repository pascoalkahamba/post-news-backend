import { User } from "@prisma/client";

export type UserModalT = Pick<User, "name" | "password" | "email">;
export type JsonWebTokenErrorT = "jwt malformed" | "jwt must be provided";
