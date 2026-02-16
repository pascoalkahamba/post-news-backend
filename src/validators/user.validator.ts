import { Response } from "express";
import { TPathError } from "../@types";
import UserError from "../errors/userError";
import { handleError } from "../errors/handleError";

export default class UserValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "username") {
      return handleError(
        UserError.invalidInfo("Nome do usuario invalido."),
        res,
      );
    }
    if (pathError === "password") {
      return handleError(
        UserError.invalidInfo("Senha do usuario invalido."),
        res,
      );
    }
    if (pathError === "newPassword") {
      return handleError(
        UserError.invalidInfo("Nova senha do usuario invalido."),
        res,
      );
    }
    if (pathError === "token") {
      return handleError(UserError.invalidToken(), res);
    }

    if (pathError === "role") {
      return handleError(
        UserError.invalidInfo("A role do usuario deve ser ADMIN ou USER."),
        res,
      );
    }
    if (pathError === "email") {
      return handleError(
        UserError.invalidInfo("Email do usuario invalido."),
        res,
      );
    }
    if (pathError === "cellPhone") {
      return handleError(
        UserError.invalidInfo("Contacto do usuario invalido."),
        res,
      );
    }
  }
}
