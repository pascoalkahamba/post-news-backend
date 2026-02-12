import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class AuthError {
  static noTokenProvided() {
    return new BaseError("Token não fornecido.", StatusCodes.UNAUTHORIZED);
  }

  static invalidToken() {
    return new BaseError("Token invalido.", StatusCodes.UNAUTHORIZED);
  }

  static invalidTypeOfToken() {
    return new BaseError("Tipo de token incorreto.", StatusCodes.UNAUTHORIZED);
  }
}
