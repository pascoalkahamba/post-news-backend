import { Response } from "express";
import { TPathError } from "../@types";
import FavoriteError from "../errors/favoriteError";
import { handleError } from "../errors/handleError";

export default class FavoriteValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "postId") {
      return handleError(
        FavoriteError.postNotFound(),
        res,
      );
    }
    if (pathError === "favoriteId") {
      return handleError(
        FavoriteError.invalidFavoriteId(),
        res,
      );
    }
  }
}
