import { Response } from "express";
import { TPathError } from "../@types";
import NotificationError from "../errors/notificationError";
import { handleError } from "../errors/handleError";

export default class NotificationValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "userId") {
      return handleError(NotificationError.userNotFound(), res);
    }
    if (pathError === "actorId") {
      return handleError(NotificationError.actorNotFound(), res);
    }
    if (pathError === "type") {
      return handleError(NotificationError.invalidNotificationType(), res);
    }
    if (pathError === "entityType") {
      return handleError(NotificationError.invalidEntityType(), res);
    }
  }
}
