import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class VerificationCodeError {
  static invalidCode() {
    return new BaseError(
      "Código de verificação inválido ou expirado",
      StatusCodes.UNAUTHORIZED
    );
  }
  static invalidOperation() {
    return new BaseError(
      "Operação do usuário inválido",
      StatusCodes.BAD_REQUEST
    );
  }
  static emailNotFound() {
    return new BaseError(
      "Email do usuário não encontrado",
      StatusCodes.NOT_FOUND
    );
  }

  static invalidEmail() {
    return new BaseError("Email inválido", StatusCodes.BAD_REQUEST);
  }
}
