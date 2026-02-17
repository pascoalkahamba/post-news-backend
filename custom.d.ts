declare namespace Express {
  export interface Request {
    user: "username" | "email";
    file?: Express.Multer.File;
    fileUrl?: string;
    fileName?: string;
  }
}
