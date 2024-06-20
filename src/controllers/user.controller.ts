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
      const { validateCode: code } = sended;

      // Quando hospedar o site usar o parametro secure:true em res.cookie para acesso apenas de site https
      res.cookie("validateCode", code, {
        httpOnly: true,
        maxAge: 300000,
        secure: false,
      });

      res.cookie("newUser", user, {
        httpOnly: true,
        maxAge: 300000,
        secure: false,
      });

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
      const newUser = req.cookies.newUser as UserModal;

      if (cookieValidateCode != validateCode) {
        console.log("cookieValidateCode ", cookieValidateCode);
        console.log("validateCode ", validateCode);
        throw UserError.invalidEmail();
      }

      const userCreated = await userService.create(newUser, true);

      if (userCreated) {
        res.clearCookie("validateCode");
        res.clearCookie("newUser");
      }

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

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const userDeleted = await userService.delete(+id);

      if (!userDeleted) {
        console.log("user is not exist.");
        throw UserError.userNotFound();
      }
      console.log("current user", req.user);

      return res.status(StatusCodes.OK).json(userDeleted);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }
}
