import { User } from "@prisma/client";

export type UserModal = Pick<User, "name" | "password" | "email">;
