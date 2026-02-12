import { Response } from "express";
import { TPathError } from "../@types";
import { handleError } from "../errors/handleError";
import { VerificationCodeError } from "../errors/verificationCodeError";

export default class VerificationCodeValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "code") {
      return handleError(VerificationCodeError.invalidCode(), res);
    }
    if (pathError === "operation") {
      return handleError(VerificationCodeError.invalidOperation(), res);
    }
    if (pathError === "email") {
      return handleError(VerificationCodeError.invalidCode(), res);
    }
  }
}
