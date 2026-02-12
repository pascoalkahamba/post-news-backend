import { Response } from "express";
import { BaseError } from "./baseError";

export function handleError(error: BaseError, res: Response) {
  return res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
}
