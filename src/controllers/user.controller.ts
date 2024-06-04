import { Response, Request } from "express";
import { UserModal } from "../@types";
import { UserValidator } from "../validators/user.validator";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { UserService } from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import { UserError } from "../errors/userError";
import { sendEmail } from "../services/nodemailer.service";

const userValidator = new UserValidator();
const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const user = req.body as UserModal;
      userValidator.validator(user);
      const userCreated = await userService.create(user);

      if (!userCreated) {
        console.log("Email Existe");
        throw UserError.emailAlreadyExist();
      }

      console.log("Email nao existe");

      const validateCode = Math.floor(100000 + Math.random() * 900000);
      // const sended = sendEmail(user.email, validateCode);

      // if (!sended) {
      //   UserError.sendEmailFailed();
      //   return;
      // }
      // const { info, validateCode: code } = sended;
      // req.validateCode = code;
      // console.log(info);

      res.status(StatusCodes.CREATED).json(userCreated);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = req.body as UserModal;
      const logged = await userService.login(user.email, user.password);

      if (!logged) {
        throw UserError.emailOrPasswordWrong();
      }

      return res.status(StatusCodes.OK).json(logged);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }
}
