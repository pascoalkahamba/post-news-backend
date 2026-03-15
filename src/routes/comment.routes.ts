import express from "express";
import { CommentController } from "../controllers/comment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const commentRoutes = express.Router();
const commentController = new CommentController();

commentRoutes.get("/", commentController.getAll);
commentRoutes.get("/post/:postId", commentController.getByPostId);
commentRoutes.get("/user/:userId", commentController.getByUserId);
commentRoutes.get("/:id", commentController.getById);

commentRoutes.use(authMiddleware);
commentRoutes.post("/create", commentController.create);
commentRoutes.put("/update/:id", commentController.update);
commentRoutes.delete("/delete/:id", commentController.delete);

export { commentRoutes };
