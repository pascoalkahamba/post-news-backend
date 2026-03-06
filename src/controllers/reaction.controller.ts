import { Response, Request } from "express";
import { TPathError } from "../@types";
import ReactionValidator from "../validators/reaction.validator";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { ReactionService } from "../services/reaction.service";
import { StatusCodes } from "http-status-codes";
import ReactionError from "../errors/reactionError";
import { fromError } from "zod-validation-error";
import { ZodError } from "zod";
import { reactionCreateSchema } from "../schemas";

const reactionService = new ReactionService();
const reactionValidator = new ReactionValidator();

export class ReactionController {
  async create(req: Request, res: Response) {
    try {
      const { type, postId, commentId, replyId } = reactionCreateSchema.parse(
        req.body,
      );

      // Get userId from the authenticated user
      const userId = req.user.id;

      // Validate that exactly one target is provided
      const targets = [postId, commentId, replyId].filter(Boolean);
      if (targets.length === 0) {
        throw ReactionError.targetNotFound();
      }
      if (targets.length > 1) {
        throw ReactionError.multipleTargets();
      }

      const result = await reactionService.create(
        userId,
        type,
        postId,
        commentId,
        replyId,
      );

      if (result === "postNotFound") {
        throw ReactionError.targetNotFound();
      }
      if (result === "commentNotFound") {
        throw ReactionError.targetNotFound();
      }
      if (result === "replyNotFound") {
        throw ReactionError.targetNotFound();
      }
      if (result === "noTarget") {
        throw ReactionError.targetNotFound();
      }

      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        reactionValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const reactionId = req.params.id as unknown as number;
      const userId = req.user.id;

      const result = await reactionService.delete(userId, reactionId);

      if (!result) {
        throw ReactionError.reactionNotFound();
      }

      if (result === "unauthorized") {
        throw ReactionError.unauthorizedToReact();
      }

      return res.status(StatusCodes.ACCEPTED).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        reactionValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getByPostId(req: Request, res: Response) {
    try {
      const postId = req.params.postId as unknown as number;
      const reactions = await reactionService.getByPostId(postId);
      return res.status(StatusCodes.OK).json(reactions);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        reactionValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getByCommentId(req: Request, res: Response) {
    try {
      const commentId = req.params.commentId as unknown as number;
      const reactions = await reactionService.getByCommentId(commentId);
      return res.status(StatusCodes.OK).json(reactions);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        reactionValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getByReplyId(req: Request, res: Response) {
    try {
      const replyId = req.params.replyId as unknown as number;
      const reactions = await reactionService.getByReplyId(replyId);
      return res.status(StatusCodes.OK).json(reactions);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        reactionValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getCountsForPost(req: Request, res: Response) {
    try {
      const postId = req.params.postId as unknown as number;
      const counts = await reactionService.getReactionCountsForPost(postId);
      return res.status(StatusCodes.OK).json(counts);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        reactionValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getCountsForComment(req: Request, res: Response) {
    try {
      const commentId = req.params.commentId as unknown as number;
      const counts =
        await reactionService.getReactionCountsForComment(commentId);
      return res.status(StatusCodes.OK).json(counts);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        reactionValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getCountsForReply(req: Request, res: Response) {
    try {
      const replyId = req.params.replyId as unknown as number;
      const counts = await reactionService.getReactionCountsForReply(replyId);
      return res.status(StatusCodes.OK).json(counts);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        reactionValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
