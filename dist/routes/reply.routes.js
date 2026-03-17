"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const reply_controller_1 = require("../controllers/reply.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const replyRoutes = express_1.default.Router();
exports.replyRoutes = replyRoutes;
const replyController = new reply_controller_1.ReplyController();
replyRoutes.get("/", replyController.getAll);
replyRoutes.get("/comment/:commentId", replyController.getByCommentId);
replyRoutes.get("/:id", replyController.getById);
replyRoutes.use(auth_middleware_1.authMiddleware);
replyRoutes.post("/create", replyController.create);
replyRoutes.put("/update/:id", replyController.update);
replyRoutes.delete("/delete/:id", replyController.delete);
