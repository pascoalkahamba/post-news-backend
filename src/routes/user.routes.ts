import express from "express";
import { UserController } from "../controllers/user.controller";

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.post("/login", userController.login);

export { userRoutes };
