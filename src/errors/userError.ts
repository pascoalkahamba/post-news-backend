import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class UserError {
  static invalidName() {
    return new BaseError(
      "Nome do usuário deve ter mais de 5 carecteres.",
      StatusCodes.BAD_REQUEST
    );
  }

  static invalidEmail() {
    return new BaseError("Email invalido.", StatusCodes.BAD_REQUEST);
  }

  static emailAlreadyExist() {
    return new BaseError("Email já cadastrado.", StatusCodes.CONFLICT);
  }

  static sendEmailFailed() {
    return new BaseError(
      "Falha ao enviar o codigo por email.",
      StatusCodes.BAD_REQUEST
    );
  }

  static invalidPassword() {
    return new BaseError(
      "Senha do usuário deve ter mais de 5 carecteres.",
      StatusCodes.BAD_REQUEST
    );
  }

  static userNotFound() {
    return new BaseError(
      "Nome do usuário não encontrado.",
      StatusCodes.NOT_FOUND
    );
  }

  static emailOrPasswordWrong() {
    return new BaseError(
      "Senha ou email do usuário incorretos.",
      StatusCodes.NOT_FOUND
    );
  }
}
