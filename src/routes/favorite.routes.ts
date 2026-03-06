import express from "express";
import { FavoriteController } from "../controllers/favorite.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const favoriteRoutes = express.Router();
const favoriteController = new FavoriteController();

favoriteRoutes.get("/post/:postId", favoriteController.getByPostId);
favoriteRoutes.get("/counts/post/:postId", favoriteController.getCountForPost);

favoriteRoutes.use(authMiddleware);
favoriteRoutes.post("/create", favoriteController.create);
favoriteRoutes.delete("/:id", favoriteController.delete);
favoriteRoutes.get("/user/favorites", favoriteController.getUserFavorites);
favoriteRoutes.get("/user/check/:postId", favoriteController.isFavorited);

export { favoriteRoutes };
