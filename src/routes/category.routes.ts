import express from "express";
import { CategoryController } from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const categoryRoutes = express.Router();
const categoryController = new CategoryController();

// Public routes - get all and get by id
categoryRoutes.get("/", categoryController.getAll);
categoryRoutes.get("/:id", categoryController.getById);

// Protected routes - create, update, delete
categoryRoutes.use(authMiddleware);
categoryRoutes.post("/create", categoryController.create);
categoryRoutes.put("/update/:id", categoryController.update);
categoryRoutes.delete("/delete/:id", categoryController.delete);

export { categoryRoutes };
