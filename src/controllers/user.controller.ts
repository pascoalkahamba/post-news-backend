import { Response, Request } from "express";
import { UserModalT } from "../@types";
import { UserValidator } from "../validators/user.validator";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { UserService } from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import { UserError } from "../errors/userError";
import { sendEmail } from "../services/nodemailer.service";
import { NewPasswordI, VerifyEmailI } from "../interfaces";
import { dynamicCode } from "../utils";
import { createCookies, deleteCookies } from "../middlewares/manageCookies";

const userValidator = new UserValidator();
const userService = new UserService();
export class UserController {
  async create(req: Request, res: Response) {
    try {
      const user = req.body as UserModalT;
      userValidator.validator(user);
      const acceptEmail = req.cookies.availableEmail as string;
      console.log("acceptEmail", acceptEmail);

      if (!acceptEmail) {
        throw UserError.noAccpet();
      }

      const userCreated = await userService.create(user);

      if (!userCreated) {
        console.log("Email Existe");
        throw UserError.emailAlreadyExist();
      }

      console.log("Email nao existe");

      deleteCookies(res, "availableEmail");
      return res.status(StatusCodes.CREATED).json(userCreated);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { email, code } = req.body as VerifyEmailI;
      const expiredCode = req.cookies.code as string;
      userValidator.validator({
        email,
        password: code,
        name: "pascoalkahamba",
      });

      if (!expiredCode) {
        const validateCode = dynamicCode();
        sendEmail(email, validateCode, "Código de verificação de conta");
        createCookies(res, { key: "code", value: validateCode });
      }

      console.log("expiredCode ", expiredCode);

      // if (!sended) {
      //   throw UserError.sendEmailFailed();
      // }
      // const { validateCode: codeSent } = sended;

      if (expiredCode !== code) {
        console.log("operation no accept.");
        console.log("codeSent", expiredCode);
        throw UserError.emailNotAvailable();
      }
      createCookies(res, { key: "availableEmail", value: "accept" });
      deleteCookies(res, "code");
      return res.status(StatusCodes.OK).json({
        message: "email disponivel.",
      });
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

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email, verifyEmail, newPassword } = req.body as NewPasswordI;

      userValidator.passwordValidator({ email, verifyEmail, newPassword });

      const passwordChanged = await userService.updatePassword(
        email,
        newPassword,
        verifyEmail
      );

      if (!passwordChanged) {
        throw UserError.emailNotFound();
      }

      if (passwordChanged === "not-accept") {
        throw UserError.noAccpet();
      }

      return res.status(StatusCodes.OK).json(passwordChanged);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }
}
