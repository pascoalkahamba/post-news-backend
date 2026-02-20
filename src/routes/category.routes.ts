import express from "express";
import { CategoryController } from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const categoryRoutes = express.Router();
const categoryController = new CategoryController();

categoryRoutes.get("/", categoryController.getAll);
categoryRoutes.get("/:id", categoryController.getById);

categoryRoutes.use(authMiddleware);
categoryRoutes.post("/create", categoryController.create);
categoryRoutes.put("/update/:id", categoryController.update);
categoryRoutes.delete("/delete/:id", categoryController.delete);

export { categoryRoutes };
