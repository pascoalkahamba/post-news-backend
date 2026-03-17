import { Response } from "express";
import { TPathError } from "../@types";
import FollowError from "../errors/followError";
import { handleError } from "../errors/handleError";

export default class FollowValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "followingId") {
      return handleError(FollowError.invalidFollowingId(), res);
    }
    if (pathError === "followerId") {
      return handleError(FollowError.invalidFollowId(), res);
    }
    if (pathError === "status") {
      return handleError(FollowError.invalidStatus(), res);
    }
  }
}
