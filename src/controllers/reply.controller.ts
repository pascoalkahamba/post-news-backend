import { Response, Request } from "express";
import { TPathError } from "../@types";
import ReplyValidator from "../validators/reply.validator";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { ReplyService } from "../services/reply.service";
import { StatusCodes } from "http-status-codes";
import ReplyError from "../errors/replyError";
import { fromError } from "zod-validation-error";
import { ZodError } from "zod";
import { replyCreateSchema, replyUpdateSchema } from "../schemas";

const replyService = new ReplyService();
const replyValidator = new ReplyValidator();

export class ReplyController {
  async create(req: Request, res: Response) {
    try {
      const { content, commentId } = replyCreateSchema.parse(req.body);

      const userId = req.user.id;

      const replyCreated = await replyService.create({
        content,
        commentId: +commentId,
        userId,
      });

      if (!replyCreated) {
        throw ReplyError.replyNotCreated();
      }

      return res.status(StatusCodes.CREATED).json(replyCreated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        replyValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const { content } = replyUpdateSchema.parse(req.body);

      const userId = req.user.id;

      const replyUpdated = await replyService.update(+id, { content }, userId);

      if (!replyUpdated) {
        throw ReplyError.replyNotFound();
      }

      if (replyUpdated === "unauthorized") {
        throw ReplyError.unauthorizedToUpdateReply();
      }

      return res.status(StatusCodes.ACCEPTED).json(replyUpdated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        replyValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;

      const userId = req.user.id;

      const replyDeleted = await replyService.delete(+id, userId);

      if (!replyDeleted) {
        throw ReplyError.replyNotFound();
      }

      if (replyDeleted === "unauthorized") {
        throw ReplyError.unauthorizedToDeleteReply();
      }

      return res.status(StatusCodes.ACCEPTED).json(replyDeleted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        replyValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const replies = await replyService.getAll();

      return res.status(StatusCodes.OK).json(replies);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        replyValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const reply = await replyService.getById(+id);

      if (!reply) {
        throw ReplyError.replyNotFound();
      }

      return res.status(StatusCodes.OK).json(reply);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        return handleError(
          new BaseError(pathError, StatusCodes.BAD_REQUEST),
          res,
        );
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getByCommentId(req: Request, res: Response) {
    try {
      const commentId = req.params.commentId as unknown as number;
      const replies = await replyService.getByCommentId(+commentId);

      return res.status(StatusCodes.OK).json(replies);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        return handleError(
          new BaseError(pathError, StatusCodes.BAD_REQUEST),
          res,
        );
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
