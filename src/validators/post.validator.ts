import { Response } from "express";
import { TPathError } from "../@types";
import PostError from "../errors/postError";
import { handleError } from "../errors/handleError";

export default class PostValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "title") {
      return handleError(PostError.invalidPostTitle(), res);
    }

    if (pathError === "content") {
      return handleError(PostError.invalidPostContent(), res);
    }

    if (pathError === "categoryId") {
      return handleError(PostError.categoryNotFound(), res);
    }
  }
}
