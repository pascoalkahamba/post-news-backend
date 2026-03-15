import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class ReplyError {
  static replyNotFound() {
    return new BaseError("Resposta não encontrada.", StatusCodes.NOT_FOUND);
  }

  static invalidReplyContent() {
    return new BaseError(
      "Conteúdo da resposta inválido. Deve ter pelo menos 1 caractere.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static replyNotCreated() {
    return new BaseError(
      "Não foi possível criar a resposta.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static replyNotUpdated() {
    return new BaseError(
      "Não foi possível atualizar a resposta.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static replyNotDeleted() {
    return new BaseError(
      "Não foi possível excluir a resposta.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static commentNotFound() {
    return new BaseError("Comentário não encontrado.", StatusCodes.NOT_FOUND);
  }

  static unauthorizedToUpdateReply() {
    return new BaseError(
      "Você não tem permissão para atualizar esta resposta.",
      StatusCodes.UNAUTHORIZED,
    );
  }

  static unauthorizedToDeleteReply() {
    return new BaseError(
      "Você não tem permissão para excluir esta resposta.",
      StatusCodes.UNAUTHORIZED,
    );
  }
}
