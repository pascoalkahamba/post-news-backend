"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteRoutes = void 0;
const express_1 = __importDefault(require("express"));
const favorite_controller_1 = require("../controllers/favorite.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const favoriteRoutes = express_1.default.Router();
exports.favoriteRoutes = favoriteRoutes;
const favoriteController = new favorite_controller_1.FavoriteController();
favoriteRoutes.get("/post/:postId", favoriteController.getByPostId);
favoriteRoutes.get("/counts/post/:postId", favoriteController.getCountForPost);
favoriteRoutes.use(auth_middleware_1.authMiddleware);
favoriteRoutes.post("/create", favoriteController.create);
favoriteRoutes.delete("/:id", favoriteController.delete);
favoriteRoutes.get("/user/favorites", favoriteController.getUserFavorites);
favoriteRoutes.get("/user/check/:postId", favoriteController.isFavorited);
