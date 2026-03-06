import { Response, Request } from "express";
import { TPathError } from "../@types";
import FavoriteValidator from "../validators/favorite.validator";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { FavoriteService } from "../services/favorite.service";
import { StatusCodes } from "http-status-codes";
import FavoriteError from "../errors/favoriteError";
import { fromError } from "zod-validation-error";
import { ZodError } from "zod";
import { favoriteCreateSchema } from "../schemas";

const favoriteService = new FavoriteService();
const favoriteValidator = new FavoriteValidator();

export class FavoriteController {
  async create(req: Request, res: Response) {
    try {
      const { postId } = favoriteCreateSchema.parse(req.body);

      const userId = req.user.id;

      const result = await favoriteService.create(userId, postId);

      if (result && "error" in result) {
        if (result.error === "postNotFound") {
          throw FavoriteError.postNotFound();
        }
        if (result.error === "favoriteAlreadyExists") {
          throw FavoriteError.favoriteAlreadyExists();
        }
      }

      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        favoriteValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const favoriteId = parseInt(req.params.id, 10);
      if (isNaN(favoriteId)) {
        throw FavoriteError.invalidFavoriteId();
      }
      const userId = req.user.id;

      const result = await favoriteService.delete(userId, favoriteId);

      if (!result) {
        throw FavoriteError.favoriteNotFound();
      }

      if (result === "unauthorized") {
        throw FavoriteError.unauthorizedToFavorite();
      }

      return res.status(StatusCodes.ACCEPTED).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        favoriteValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getUserFavorites(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const favorites = await favoriteService.getByUserId(userId);
      return res.status(StatusCodes.OK).json(favorites);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        favoriteValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getByPostId(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.postId, 10);
      if (isNaN(postId)) {
        throw FavoriteError.postNotFound();
      }
      const favorites = await favoriteService.getByPostId(postId);
      return res.status(StatusCodes.OK).json(favorites);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        favoriteValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getCountForPost(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.postId, 10);
      if (isNaN(postId)) {
        throw FavoriteError.postNotFound();
      }
      const counts = await favoriteService.getCountForPost(postId);
      return res.status(StatusCodes.OK).json(counts);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        favoriteValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async isFavorited(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.postId, 10);
      if (isNaN(postId)) {
        throw FavoriteError.postNotFound();
      }
      const userId = req.user.id;
      const result = await favoriteService.isFavorited(userId, postId);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        favoriteValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
