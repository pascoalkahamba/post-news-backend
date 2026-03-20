import express from "express";
import { NotificationController } from "../controllers/notification.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const notificationRoutes = express.Router();
const notificationController = new NotificationController();

notificationRoutes.use(authMiddleware);

notificationRoutes.get("/", notificationController.getAll);
notificationRoutes.get("/unread", notificationController.getUnread);
notificationRoutes.get("/unreadCount", notificationController.getUnreadCount);
notificationRoutes.get("/:id", notificationController.getById);
notificationRoutes.patch("/markAsRead/:id", notificationController.markAsRead);
notificationRoutes.patch(
  "/markAllAsRead",
  notificationController.markAllAsRead,
);
notificationRoutes.delete("/delete/:id", notificationController.delete);

export { notificationRoutes };
