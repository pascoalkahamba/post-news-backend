import { Response } from "express";
import { TPathError } from "../@types";
import ReactionError from "../errors/reactionError";
import { handleError } from "../errors/handleError";

export default class ReactionValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "type") {
      return handleError(
        ReactionError.invalidReactionType(),
        res,
      );
    }
    if (pathError === "postId") {
      return handleError(
        ReactionError.targetNotFound(),
        res,
      );
    }
    if (pathError === "commentId") {
      return handleError(
        ReactionError.targetNotFound(),
        res,
      );
    }
    if (pathError === "replyId") {
      return handleError(
        ReactionError.targetNotFound(),
        res,
      );
    }
    if (pathError === "reactionId") {
      return handleError(
        ReactionError.invalidReactionId(),
        res,
      );
    }
  }
}
