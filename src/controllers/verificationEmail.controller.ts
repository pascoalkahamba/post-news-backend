import { Request, Response } from "express";
import { VerificationCode } from "../services/verificationEmail.service";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { VerificationCodeError } from "../errors/verificationCodeError";
import {
  requestVerificationCodeSchema,
  verifyCodeAndProceedSchema,
} from "../schemas";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import VerificationCodeValidator from "../validators/verificationCodeValidator";
import { StatusCodes } from "http-status-codes";

const verificationCode = new VerificationCode();
const verificationCodeValidator = new VerificationCodeValidator();
export default class ValidateEmailController {
  async requestVerificationCode(req: Request, res: Response) {
    try {
      const parseBody = requestVerificationCodeSchema.parse(req.body);

      const code = await verificationCode.saveVerificationCode(parseBody);

      if (!code) throw VerificationCodeError.emailNotFound();

      if (code === "invalidOperation") {
        throw VerificationCodeError.invalidOperation();
      }

      console.log("Código de verificação enviado:", code);
      res.status(StatusCodes.OK).json({
        message: `${
          parseBody.operation === "resetPassword"
            ? "Siga as instruções enviadas no seu email."
            : "Código de verificação enviado"
        }`,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        verificationCodeValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async verifyCodeAndProceed(req: Request, res: Response) {
    try {
      const parseBody = verifyCodeAndProceedSchema.parse(req.body);

      const isValid = await verificationCode.validateVerificationCode(
        parseBody
      );

      if (!isValid) throw VerificationCodeError.invalidCode();

      if (isValid === "invalidOperation") {
        throw VerificationCodeError.invalidOperation();
      }

      // Se o código for válido, prossegue com a operação (ex: resetar senha ou deletar conta)
      res.status(StatusCodes.OK).json({
        message: "Código validado com sucesso, pode prosseguir com a operação",
        operation: "accepted",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        verificationCodeValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
