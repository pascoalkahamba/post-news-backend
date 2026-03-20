import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class NotificationError {
  static notificationNotFound() {
    return new BaseError("Notificação não encontrada.", StatusCodes.NOT_FOUND);
  }

  static unauthorizedToUpdateNotification() {
    return new BaseError(
      "Você não tem autorização para atualizar esta notificação.",
      StatusCodes.UNAUTHORIZED,
    );
  }

  static unauthorizedToDeleteNotification() {
    return new BaseError(
      "Você não tem autorização para excluir esta notificação.",
      StatusCodes.UNAUTHORIZED,
    );
  }

  static invalidNotificationType() {
    return new BaseError(
      "Tipo de notificação inválido.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static invalidEntityType() {
    return new BaseError("Tipo de entidade inválido.", StatusCodes.BAD_REQUEST);
  }

  static userNotFound() {
    return new BaseError("Usuário não encontrado.", StatusCodes.NOT_FOUND);
  }

  static actorNotFound() {
    return new BaseError("Ator não encontrado.", StatusCodes.NOT_FOUND);
  }
}
