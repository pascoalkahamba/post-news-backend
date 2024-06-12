type UserModal = Pick<User, "name" | "password" | "email">;

declare namespace Express {
  export interface Request {
    user: Omit<UserModal, "password">;
    validateCode: number;
    userCreated: boolean;
  }
}
