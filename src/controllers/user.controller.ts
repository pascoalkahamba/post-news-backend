import { Response, Request } from "express";
import { UserModal } from "../@types";
import { UserValidator } from "../validators/user.validator";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { UserService } from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import { UserError } from "../errors/userError";

const userValidator = new UserValidator();
const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const user = req.body as UserModal;
      userValidator.validator(user);
      UserError.emailAlreadyExist();
      const userCreated = await userService.create(user);

      res.status(StatusCodes.OK).json(userCreated);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = req.body as UserModal;
      userValidator.validator(user);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }
}
