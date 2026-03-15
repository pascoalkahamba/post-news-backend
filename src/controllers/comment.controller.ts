import { Response, Request } from "express";
import { TPathError } from "../@types";
import CommentValidator from "../validators/comment.validator";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { CommentService } from "../services/comment.service";
import { StatusCodes } from "http-status-codes";
import CommentError from "../errors/commentError";
import { fromError } from "zod-validation-error";
import { ZodError } from "zod";
import { commentCreateSchema, commentUpdateSchema } from "../schemas";

const commentService = new CommentService();
const commentValidator = new CommentValidator();

export class CommentController {
  async create(req: Request, res: Response) {
    try {
      const { content, postId } = commentCreateSchema.parse(req.body);

      const userId = req.user.id;

      const commentCreated = await commentService.create({
        content,
        postId: +postId,
        userId,
      });

      if (!commentCreated) {
        throw CommentError.commentNotCreated();
      }

      return res.status(StatusCodes.CREATED).json(commentCreated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        commentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const { content } = commentUpdateSchema.parse(req.body);

      const userId = req.user.id;

      const commentUpdated = await commentService.update(
        +id,
        { content },
        userId,
      );

      if (!commentUpdated) {
        throw CommentError.commentNotFound();
      }

      if (commentUpdated === "unauthorized") {
        throw CommentError.unauthorizedToUpdateComment();
      }

      return res.status(StatusCodes.ACCEPTED).json(commentUpdated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        commentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;

      const userId = req.user.id;

      const commentDeleted = await commentService.delete(+id, userId);

      if (!commentDeleted) {
        throw CommentError.commentNotFound();
      }

      if (commentDeleted === "unauthorized") {
        throw CommentError.unauthorizedToDeleteComment();
      }

      return res.status(StatusCodes.ACCEPTED).json(commentDeleted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        commentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const comments = await commentService.getAll();

      return res.status(StatusCodes.OK).json(comments);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        commentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const comment = await commentService.getById(+id);

      if (!comment) {
        throw CommentError.commentNotFound();
      }

      return res.status(StatusCodes.OK).json(comment);
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

  async getByPostId(req: Request, res: Response) {
    try {
      const postId = req.params.postId as unknown as number;
      const comments = await commentService.getByPostId(+postId);

      return res.status(StatusCodes.OK).json(comments);
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

  async getByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.userId as unknown as number;
      const comments = await commentService.getByUserId(+userId);

      return res.status(StatusCodes.OK).json(comments);
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
