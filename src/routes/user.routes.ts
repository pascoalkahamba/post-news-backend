import express from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRoutes = express.Router();
const userController = new UserController();
// userRoutes.use(authMiddleware);

userRoutes.post("/", userController.create);
userRoutes.post("/login", userController.login);
userRoutes.post("/verifyEmail", userController.verifyEmail);

export { userRoutes };
