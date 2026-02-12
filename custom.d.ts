type UserModal = Pick<User, "username" | "password" | "email">;

declare namespace Express {
  export interface Request {
    user: Omit<UserModal, "password">;
    file?: Express.Multer.File;
    fileUrl?: string;
    fileName?: string;
  }
}
