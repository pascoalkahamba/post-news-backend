import express from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";
import upload from "../config/multerConfig";

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post("/create", userController.create);
userRoutes.post("/login", userController.login);
userRoutes.post("/resetPassword", userController.resetPassword);
userRoutes.post("/requestPasswordReset", userController.requestPasswordReset);

userRoutes.use(authMiddleware);
userRoutes.get("/:id", userController.getUserById);
userRoutes.get("/getAllUsers", userController.getAllUsers);
userRoutes.delete("/delete/:id", userController.delete);
userRoutes.post(
  "/updateProfile/:id",
  upload.single("file"),
  uploadFileMiddleware,
  userController.updateProfile
);

export { userRoutes };
