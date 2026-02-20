declare namespace Express {
  export interface Request {
    user: {
      id: number;
      username: string;
      email: string;
    };
    file?: Express.Multer.File;
    fileUrl?: string;
    fileName?: string;
  }
}
