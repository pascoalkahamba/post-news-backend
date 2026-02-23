import { Response, Request } from "express";
import { TPathError } from "../@types";
import PostValidator from "../validators/post.validator";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { PostService } from "../services/post.service";
import { StatusCodes } from "http-status-codes";
import PostError from "../errors/postError";
import { fromError } from "zod-validation-error";
import { ZodError } from "zod";
import { postCreateSchema, postUpdateSchema } from "../schemas";

const postService = new PostService();
const postValidator = new PostValidator();

export class PostController {
  async create(req: Request, res: Response) {
    try {
      const { title, content, categoryId } = postCreateSchema.parse(req.body);

      const userId = req.user.id;

      console.log("body", req.body);

      const postCreated = await postService.create({
        title,
        content,
        categoryId: +categoryId,
        authorId: userId,
        picture: { name: req.fileName || "", url: req.fileUrl || "" },
      });

      if (!postCreated) {
        throw PostError.postNotCreated();
      }

      return res.status(StatusCodes.CREATED).json(postCreated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        console.log("pathError", pathError);
        postValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const { title, content, categoryId } = postUpdateSchema.parse(req.body);

      const userId = req.user.id;

      const postUpdated = await postService.update(
        +id,
        {
          title,
          content,
          categoryId,
          picture: { name: req.fileName || "", url: req.fileUrl || "" },
        },
        userId,
      );

      if (!postUpdated) {
        throw PostError.postNotFound();
      }

      if (postUpdated === "unauthorized") {
        throw PostError.unauthorizedToUpdatePost();
      }

      return res.status(StatusCodes.ACCEPTED).json(postUpdated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        postValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;

      const userId = req.user.id;

      const postDeleted = await postService.delete(+id, userId);

      if (!postDeleted) {
        throw PostError.postNotFound();
      }

      if (postDeleted === "unauthorized") {
        throw PostError.unauthorizedToDeletePost();
      }

      return res.status(StatusCodes.ACCEPTED).json(postDeleted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        postValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { published, authorId, categoryId } = req.query;

      let posts;

      if (published !== undefined) {
        posts = await postService.getPublished();
      } else if (authorId) {
        posts = await postService.getByAuthorId(+authorId);
      } else if (categoryId) {
        posts = await postService.getByCategoryId(+categoryId);
      } else {
        posts = await postService.getAll();
      }

      return res.status(StatusCodes.OK).json(posts);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        postValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const post = await postService.getById(+id);

      if (!post) {
        throw PostError.postNotFound();
      }

      return res.status(StatusCodes.OK).json(post);
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

  async togglePublish(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;

      const userId = req.user.id;

      const post = await postService.togglePublish(+id, userId);

      if (!post) {
        throw PostError.postNotFound();
      }

      if (post === "unauthorized") {
        throw PostError.unauthorizedToUpdatePost();
      }

      return res.status(StatusCodes.ACCEPTED).json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        postValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
