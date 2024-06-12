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
let newUser: UserModal = { email: "", name: "", password: "" };
export class UserController {
  async create(req: Request, res: Response) {
    try {
      const user = req.body as UserModal;
      userValidator.validator(user);
      const userCreated = await userService.create(user, false);

      if (!userCreated) {
        console.log("Email Existe");
        throw UserError.emailAlreadyExist();
      }

      console.log("Email nao existe");

      const validateCode = Math.floor(100000 + Math.random() * 900000);
      const sended = sendEmail(user.email, validateCode);

      if (!sended) {
        throw UserError.sendEmailFailed();
      }
      const { info, validateCode: code } = sended;
      res.cookie("validateCode", code, { httpOnly: true, maxAge: 30000 });
      newUser = user;
      console.log(info);
      console.log(newUser);
      return res.status(StatusCodes.OK).json({
        message: "Dados enviados com sucesso.",
      });
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { validateCode } = req.body as { validateCode: number };
      const cookieValidateCode = req.cookies.validateCode as number;

      if (cookieValidateCode !== validateCode) {
        console.log("validateCode", cookieValidateCode);
        console.log("validateCode request ", req.validateCode);
        console.log("user data ", req.user);
        throw UserError.invalidEmail();
      }

      const userCreated = await userService.create(newUser, true);

      if (userCreated) newUser = { email: "", name: "", password: "" };

      return res.status(StatusCodes.CREATED).json(userCreated);
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
