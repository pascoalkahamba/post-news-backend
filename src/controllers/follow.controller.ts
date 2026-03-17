import { Response, Request } from "express";
import { TPathError } from "../@types";
import FollowValidator from "../validators/follow.validator";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { FollowService } from "../services/follow.service";
import { StatusCodes } from "http-status-codes";
import FollowError from "../errors/followError";
import { fromError } from "zod-validation-error";
import { ZodError } from "zod";
import { followCreateSchema, followUpdateSchema } from "../schemas";

const followService = new FollowService();
const followValidator = new FollowValidator();

export class FollowController {
  async create(req: Request, res: Response) {
    try {
      const { followingId } = followCreateSchema.parse(req.body);

      const userId = req.user.id;

      const followCreated = await followService.create(userId, followingId);

      if (followCreated && "error" in followCreated) {
        if (followCreated.error === "userNotFound") {
          throw FollowError.userNotFound();
        }
        if (followCreated.error === "cannotFollowYourself") {
          throw FollowError.cannotFollowYourself();
        }
        if (followCreated.error === "followAlreadyExists") {
          throw FollowError.followAlreadyExists();
        }
      }

      if (followCreated && "message" in followCreated) {
        return res.status(StatusCodes.OK).json(followCreated);
      }

      return res.status(StatusCodes.CREATED).json(followCreated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        followValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const followId = req.params.id as unknown as number;

      const userId = req.user.id;

      const followDeleted = await followService.delete(userId, +followId);

      if (!followDeleted) {
        throw FollowError.followNotFound();
      }

      if (followDeleted === "unauthorized") {
        throw FollowError.unauthorizedToDeleteFollow();
      }

      return res.status(StatusCodes.ACCEPTED).json(followDeleted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        followValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const followId = req.params.id as unknown as number;
      const { status } = followUpdateSchema.parse(req.body);

      const userId = req.user.id;

      const followUpdated = await followService.updateStatus(
        +followId,
        userId,
        status,
      );

      if (!followUpdated) {
        throw FollowError.followNotFound();
      }

      if (followUpdated === "unauthorized") {
        throw FollowError.unauthorizedToUpdateFollow();
      }

      return res.status(StatusCodes.ACCEPTED).json(followUpdated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        followValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getFollowers(req: Request, res: Response) {
    try {
      const userId = req.params.userId as unknown as number;

      const followers = await followService.getFollowers(+userId);

      return res.status(StatusCodes.OK).json(followers);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        followValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getFollowing(req: Request, res: Response) {
    try {
      const userId = req.params.userId as unknown as number;

      const following = await followService.getFollowing(+userId);

      return res.status(StatusCodes.OK).json(following);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        followValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getPendingRequests(req: Request, res: Response) {
    try {
      const userId = req.user.id;

      const pending = await followService.getPendingRequests(userId);

      return res.status(StatusCodes.OK).json(pending);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        followValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getFollowStatus(req: Request, res: Response) {
    try {
      const followingId = req.params.userId as unknown as number;
      const userId = req.user.id;

      const followStatus = await followService.getFollowStatus(
        userId,
        +followingId,
      );

      return res.status(StatusCodes.OK).json(followStatus);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        followValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getFollowersCount(req: Request, res: Response) {
    try {
      const userId = req.params.userId as unknown as number;

      const count = await followService.getFollowersCount(+userId);

      return res.status(StatusCodes.OK).json(count);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        followValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getFollowingCount(req: Request, res: Response) {
    try {
      const userId = req.params.userId as unknown as number;

      const count = await followService.getFollowingCount(+userId);

      return res.status(StatusCodes.OK).json(count);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        followValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
