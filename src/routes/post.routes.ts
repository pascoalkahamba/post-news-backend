import express from "express";
import { PostController } from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";
import upload from "../config/multerConfig";

const postRoutes = express.Router();
const postController = new PostController();

postRoutes.get("/", postController.getAll);
postRoutes.get("/:id", postController.getById);

postRoutes.use(authMiddleware);
postRoutes.post(
  "/create",
  upload.single("file"),
  uploadFileMiddleware,
  postController.create,
);
postRoutes.put(
  "/update/:id",
  upload.single("file"),
  uploadFileMiddleware,
  postController.update,
);
postRoutes.delete("/delete/:id", postController.delete);
postRoutes.patch("/togglePublish/:id", postController.togglePublish);

export { postRoutes };
