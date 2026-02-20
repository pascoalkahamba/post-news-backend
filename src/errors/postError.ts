import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class PostError {
  static postNotFound() {
    return new BaseError("Publicação não encontrada.", StatusCodes.NOT_FOUND);
  }

  static invalidPostTitle() {
    return new BaseError(
      "Título da publicação inválido. Deve ter entre 2 e 255 caracteres.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static invalidPostContent() {
    return new BaseError(
      "Conteúdo da publicação inválido. Deve ter pelo menos 2 caracteres.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static postNotCreated() {
    return new BaseError(
      "Não foi possível criar a publicação.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static postNotUpdated() {
    return new BaseError(
      "Não foi possível atualizar a publicação.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static postNotDeleted() {
    return new BaseError(
      "Não foi possível excluir a publicação.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static categoryNotFound() {
    return new BaseError("Categoria não encontrada.", StatusCodes.NOT_FOUND);
  }

  static unauthorizedToUpdatePost() {
    return new BaseError(
      "Você não tem permissão para atualizar esta publicação.",
      StatusCodes.UNAUTHORIZED,
    );
  }

  static unauthorizedToDeletePost() {
    return new BaseError(
      "Você não tem permissão para excluir esta publicação.",
      StatusCodes.UNAUTHORIZED,
    );
  }
}
