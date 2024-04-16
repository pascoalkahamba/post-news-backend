import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class UserError {
  static invalidName() {
    throw new BaseError(
      "Nome do usuário deve ter mais de 5 carecteres.",
      StatusCodes.BAD_REQUEST
    );
  }

  static invalidEmail() {
    throw new BaseError("Email invalido.", StatusCodes.BAD_REQUEST);
  }

  static invalidPassword() {
    throw new BaseError(
      "Senha do usuário deve ter mais de 5 carecteres.",
      StatusCodes.BAD_REQUEST
    );
  }

  static userNotFound() {
    throw new BaseError(
      "Nome do usuário não encontrado.",
      StatusCodes.NOT_FOUND
    );
  }

  static passwordWrong() {
    throw new BaseError("Senha do usuário incorreto.", StatusCodes.NOT_FOUND);
  }
}