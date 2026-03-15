import { Response } from "express";
import { TPathError } from "../@types";
import CommentError from "../errors/commentError";
import { handleError } from "../errors/handleError";

export default class CommentValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "content") {
      return handleError(CommentError.invalidCommentContent(), res);
    }

    if (pathError === "postId") {
      return handleError(CommentError.postNotFound(), res);
    }
  }
}
