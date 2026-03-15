import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class CommentError {
  static commentNotFound() {
    return new BaseError("Comentário não encontrado.", StatusCodes.NOT_FOUND);
  }

  static invalidCommentContent() {
    return new BaseError(
      "Conteúdo do comentário inválido. Deve ter pelo menos 1 caractere.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static commentNotCreated() {
    return new BaseError(
      "Não foi possível criar o comentário.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static commentNotUpdated() {
    return new BaseError(
      "Não foi possível atualizar o comentário.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static commentNotDeleted() {
    return new BaseError(
      "Não foi possível excluir o comentário.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static postNotFound() {
    return new BaseError("Publicação não encontrada.", StatusCodes.NOT_FOUND);
  }

  static unauthorizedToUpdateComment() {
    return new BaseError(
      "Você não tem permissão para atualizar este comentário.",
      StatusCodes.UNAUTHORIZED,
    );
  }

  static unauthorizedToDeleteComment() {
    return new BaseError(
      "Você não tem permissão para excluir este comentário.",
      StatusCodes.UNAUTHORIZED,
    );
  }
}
