import { Response } from "express";
import { TPathError } from "../@types";
import ReplyError from "../errors/replyError";
import { handleError } from "../errors/handleError";

export default class ReplyValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "content") {
      return handleError(ReplyError.invalidReplyContent(), res);
    }

    if (pathError === "commentId") {
      return handleError(ReplyError.commentNotFound(), res);
    }
  }
}
