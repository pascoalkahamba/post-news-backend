import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class FollowError {
  static followNotFound() {
    return new BaseError("Seguidor não encontrado.", StatusCodes.NOT_FOUND);
  }

  static userNotFound() {
    return new BaseError("Usuário não encontrado.", StatusCodes.NOT_FOUND);
  }

  static followAlreadyExists() {
    return new BaseError(
      "Você já está seguindo este usuário.",
      StatusCodes.CONFLICT,
    );
  }

  static cannotFollowYourself() {
    return new BaseError(
      "Você não pode seguir a si mesmo.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static unauthorizedToUpdateFollow() {
    return new BaseError(
      "Você não tem permissão para atualizar este follow.",
      StatusCodes.UNAUTHORIZED,
    );
  }

  static unauthorizedToDeleteFollow() {
    return new BaseError(
      "Você não tem permissão para excluir este follow.",
      StatusCodes.UNAUTHORIZED,
    );
  }

  static invalidFollowId() {
    return new BaseError("ID de follow inválido.", StatusCodes.BAD_REQUEST);
  }

  static invalidFollowingId() {
    return new BaseError(
      "ID de usuário a ser seguido inválido.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static invalidStatus() {
    return new BaseError("Status inválido.", StatusCodes.BAD_REQUEST);
  }
}
