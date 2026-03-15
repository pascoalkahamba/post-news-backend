import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinaryConfig";
import { MulterError } from "multer";
import { StatusCodes } from "http-status-codes";
import { UploadApiResponse } from "cloudinary";

export const uploadFileMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const file = req.file;
    if (!file) {
      return next();
    }

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "uploads",
          resource_type: "auto",
          public_name: `${Date.now()}-${file.originalname}`,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result);
          } else {
            reject(new Error("Upload failed: No result returned"));
          }
        },
      );
      uploadStream.end(file.buffer);
    });

    const fileUrl = result.secure_url;

    req.fileUrl = fileUrl;
    req.fileName = file.originalname;

    next();
  } catch (error) {
    if (error instanceof MulterError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Erro ao fazer upload do arquivo", error });
    }

    return res.status(500).json({ message: "Erro no servidor", error });
  }
};
