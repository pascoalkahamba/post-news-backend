import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class ReactionError {
  static reactionNotFound() {
    return new BaseError("Reação não encontrada.", StatusCodes.NOT_FOUND);
  }

  static invalidReactionType() {
    return new BaseError(
      "Tipo de reação inválido. Use LIKE ou DISLIKE.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static targetNotFound() {
    return new BaseError(
      "Alvo da reação não encontrado. Especifique postId, commentId ou replyId.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static multipleTargets() {
    return new BaseError(
      "Apenas um alvo pode ser especificado: postId, commentId ou replyId.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static reactionAlreadyExists() {
    return new BaseError(
      "Você já reactionou a este conteúdo.",
      StatusCodes.CONFLICT,
    );
  }

  static unauthorizedToReact() {
    return new BaseError(
      "Você não tem permissão para react a este conteúdo.",
      StatusCodes.UNAUTHORIZED,
    );
  }

  static invalidReactionId() {
    return new BaseError(
      "ID de reação inválido.",
      StatusCodes.BAD_REQUEST,
    );
  }
}
