import multer, { FileFilterCallback } from "multer";

const storage = multer.memoryStorage(); // Armazena o arquivo na memória

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limite de 10MB
  },
  fileFilter: (req, file, cb: FileFilterCallback) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type! Please upload an image or a document (PDF, DOC, DOCX)."
        )
      );
    }
  },
});

export default upload;
