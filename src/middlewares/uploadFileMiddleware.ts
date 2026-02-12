import { Request, Response, NextFunction } from "express";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import { MulterError } from "multer";
import { StatusCodes } from "http-status-codes";

export const uploadFileMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    if (!file) {
      return next();
    }

    const storageRef = ref(
      storage,
      `uploads/${Date.now()}-${file.originalname}`
    );
    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const fileUrl = await getDownloadURL(snapshot.ref);

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
