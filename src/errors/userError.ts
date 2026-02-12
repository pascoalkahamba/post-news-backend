import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class UserError {
  static invalidName() {
    return new BaseError(
      "Nome do usuário deve ter mais de 5 carecteres.",
      StatusCodes.BAD_REQUEST
    );
  }

  static invalidEmail() {
    return new BaseError("Email invalido.", StatusCodes.BAD_REQUEST);
  }
  static invalidToken() {
    return new BaseError(
      "Seu link de redefinição é inválido ou expirou. Por favor, solicite um novo.",
      StatusCodes.UNAUTHORIZED
    );
  }

  static invalidInfo(message: string) {
    return new BaseError(message, StatusCodes.BAD_REQUEST);
  }

  static noAccpet() {
    return new BaseError(
      "Operação rejeitada confirme o seu email.",
      StatusCodes.BAD_REQUEST
    );
  }

  static emailNotAvailable() {
    return new BaseError(
      "Este email não esta a funcionar.",
      StatusCodes.BAD_REQUEST
    );
  }
  static emailOrCellPhoneAlreadyExist() {
    return new BaseError(
      "Email ou número de telefone já cadastrado.",
      StatusCodes.CONFLICT
    );
  }

  static emailNotFound() {
    return new BaseError("Email não encontrado.", StatusCodes.NOT_FOUND);
  }

  static accountNotFound() {
    return new BaseError("conta não encontrado.", StatusCodes.NOT_FOUND);
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
      "Dados do usuário não encontrados.",
      StatusCodes.NOT_FOUND
    );
  }

  static noAccept(message?: string) {
    return new BaseError(
      message || "Operação não aceita, verifique a role do usuário.",
      StatusCodes.BAD_REQUEST
    );
  }

  static emailOrPasswordWrong() {
    return new BaseError(
      "Senha ou email do usuário incorretos.",
      StatusCodes.NOT_FOUND
    );
  }
}
