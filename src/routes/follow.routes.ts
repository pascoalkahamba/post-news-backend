import express from "express";
import { FollowController } from "../controllers/follow.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const followRoutes = express.Router();
const followController = new FollowController();

followRoutes.use(authMiddleware);

followRoutes.get("/followers", followController.getFollowers);
followRoutes.get("/following", followController.getFollowing);
followRoutes.get("/followersCount/:userId", followController.getFollowersCount);
followRoutes.get("/followingCount/:userId", followController.getFollowingCount);
followRoutes.post("/create", followController.create);
followRoutes.delete("/delete/:id", followController.delete);
followRoutes.patch("/updateStatus/:id", followController.updateStatus);
followRoutes.get("/pendingRequests", followController.getPendingRequests);
followRoutes.get("/status/:userId", followController.getFollowStatus);

export { followRoutes };
