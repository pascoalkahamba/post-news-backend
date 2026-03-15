import express from "express";
import { ReplyController } from "../controllers/reply.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const replyRoutes = express.Router();
const replyController = new ReplyController();

// Public routes
replyRoutes.get("/", replyController.getAll);
replyRoutes.get("/comment/:commentId", replyController.getByCommentId);
replyRoutes.get("/:id", replyController.getById);

// Protected routes
replyRoutes.use(authMiddleware);
replyRoutes.post("/create", replyController.create);
replyRoutes.put("/update/:id", replyController.update);
replyRoutes.delete("/delete/:id", replyController.delete);

export { replyRoutes };
