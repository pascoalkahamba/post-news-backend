import express from "express";
import { ReactionController } from "../controllers/reaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const reactionRoutes = express.Router();
const reactionController = new ReactionController();

// Public routes - get reactions
reactionRoutes.get("/post/:postId", reactionController.getByPostId);
reactionRoutes.get("/comment/:commentId", reactionController.getByCommentId);
reactionRoutes.get("/reply/:replyId", reactionController.getByReplyId);

// Public routes - get counts
reactionRoutes.get("/counts/post/:postId", reactionController.getCountsForPost);
reactionRoutes.get(
  "/counts/comment/:commentId",
  reactionController.getCountsForComment,
);
reactionRoutes.get(
  "/counts/reply/:replyId",
  reactionController.getCountsForReply,
);

// Protected routes - create, delete
reactionRoutes.use(authMiddleware);
reactionRoutes.post("/create", reactionController.create);
reactionRoutes.delete("/:id", reactionController.delete);

export { reactionRoutes };
