"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const categoryRoutes = express_1.default.Router();
exports.categoryRoutes = categoryRoutes;
const categoryController = new category_controller_1.CategoryController();
categoryRoutes.get("/", categoryController.getAll);
categoryRoutes.get("/:id", categoryController.getById);
categoryRoutes.use(auth_middleware_1.authMiddleware);
categoryRoutes.post("/create", categoryController.create);
categoryRoutes.put("/update/:id", categoryController.update);
categoryRoutes.delete("/delete/:id", categoryController.delete);
