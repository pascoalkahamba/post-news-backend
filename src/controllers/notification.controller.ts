import { Response, Request } from "express";
import { TPathError } from "../@types";
import NotificationValidator from "../validators/notification.validator";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { NotificationService } from "../services/notification.service";
import { StatusCodes } from "http-status-codes";
import NotificationError from "../errors/notificationError";
import { fromError } from "zod-validation-error";
import { ZodError } from "zod";

const notificationService = new NotificationService();
const notificationValidator = new NotificationValidator();

export class NotificationController {
  async getAll(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const notifications = await notificationService.getByUserId(userId);

      return res.status(StatusCodes.OK).json(notifications);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        notificationValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getUnread(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const notifications = await notificationService.getUnreadByUserId(userId);

      return res.status(StatusCodes.OK).json(notifications);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        notificationValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getUnreadCount(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const count = await notificationService.getUnreadCount(userId);

      return res.status(StatusCodes.OK).json(count);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        notificationValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const notification = await notificationService.getById(+id);

      if (!notification) {
        throw NotificationError.notificationNotFound();
      }

      return res.status(StatusCodes.OK).json(notification);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        notificationValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async markAsRead(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const userId = req.user.id;

      const notification = await notificationService.markAsRead(+id, userId);

      if (!notification) {
        throw NotificationError.notificationNotFound();
      }

      if (notification === "unauthorized") {
        throw NotificationError.unauthorizedToUpdateNotification();
      }

      return res.status(StatusCodes.ACCEPTED).json(notification);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        notificationValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async markAllAsRead(req: Request, res: Response) {
    try {
      const userId = req.user.id;

      const result = await notificationService.markAllAsRead(userId);

      return res.status(StatusCodes.ACCEPTED).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        notificationValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const userId = req.user.id;

      const notificationDeleted = await notificationService.delete(+id, userId);

      if (!notificationDeleted) {
        throw NotificationError.notificationNotFound();
      }

      if (notificationDeleted === "unauthorized") {
        throw NotificationError.unauthorizedToDeleteNotification();
      }

      return res.status(StatusCodes.ACCEPTED).json(notificationDeleted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        notificationValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
