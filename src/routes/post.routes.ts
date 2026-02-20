import express from "express";
import { PostController } from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";
import upload from "../config/multerConfig";

const postRoutes = express.Router();
const postController = new PostController();

// Public routes - get all, get by id, get published
postRoutes.get("/", postController.getAll);
postRoutes.get("/:id", postController.getById);

// Protected routes - create, update, delete, toggle publish
postRoutes.use(authMiddleware);
postRoutes.post(
  "/create",
  upload.single("picture"),
  uploadFileMiddleware,
  postController.create,
);
postRoutes.put("/update/:id", postController.update);
postRoutes.delete("/delete/:id", postController.delete);
postRoutes.patch("/togglePublish/:id", postController.togglePublish);

export { postRoutes };
