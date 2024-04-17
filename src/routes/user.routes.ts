import express from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.use(authMiddleware);
userRoutes.post("/login", userController.login);

export { userRoutes };
