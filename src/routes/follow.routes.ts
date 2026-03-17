import express from "express";
import { FollowController } from "../controllers/follow.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const followRoutes = express.Router();
const followController = new FollowController();

followRoutes.get("/followers/:userId", followController.getFollowers);
followRoutes.get("/following/:userId", followController.getFollowing);
followRoutes.get("/followersCount/:userId", followController.getFollowersCount);
followRoutes.get("/followingCount/:userId", followController.getFollowingCount);

followRoutes.use(authMiddleware);

followRoutes.post("/create", followController.create);
followRoutes.delete("/delete/:id", followController.delete);
followRoutes.patch("/updateStatus/:id", followController.updateStatus);
followRoutes.get("/pendingRequests", followController.getPendingRequests);
followRoutes.get("/status/:userId", followController.getFollowStatus);

export { followRoutes };
