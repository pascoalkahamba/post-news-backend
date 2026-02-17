import { Response, Request } from "express";
import { TPathError, UserModal } from "../@types";
import UserValidator from "../validators/user.validator";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { UserService } from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import UserError from "../errors/userError";
import { fromError } from "zod-validation-error";
import { ZodError } from "zod";
import {
  requestPasswordResetSchema,
  resetPasswordSchema,
  updateProfileSchema,
  userCreateSchema,
} from "../schemas";
import { ManagerEmail } from "../services/managerEmail.service";

const userValidator = new UserValidator();
const userService = new UserService();
const managerEmail = new ManagerEmail();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const { email, password, username, cellPhone, role } =
        userCreateSchema.parse(req.body);

      const userCreated = await userService.create({
        email,
        password,
        username,
        cellPhone,
        role,
      });

      if (!userCreated) {
        throw UserError.emailOrCellPhoneAlreadyExist();
      }

      if (userCreated === "not-accept") {
        throw UserError.noAccept();
      }

      return res.status(StatusCodes.CREATED).json(userCreated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        userValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
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
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        userValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const userDeleted = await userService.delete(+id);

      if (!userDeleted) {
        throw UserError.userNotFound();
      }

      if (userDeleted === "not-accept") {
        throw UserError.noAccept(
          "Operação não aceita, role ADMIN não pode ser eliminada.",
        );
      }

      return res.status(StatusCodes.ACCEPTED).json(userDeleted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        userValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const user = await userService.getUserById(+id);

      if (!user) {
        throw UserError.userNotFound();
      }

      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        userValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      console.log("getAllUsers");
      const users = await userService.getAllUsers();
      console.log("users", users);
      return res.status(StatusCodes.OK).json(users);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        userValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = requestPasswordResetSchema.parse(req.body);

      const requestPasswordReset =
        await userService.requestPasswordReset(email);

      if (!requestPasswordReset) {
        throw UserError.emailNotFound();
      }

      await managerEmail.sendEmail({
        userEmail: email,
        operation: "resetPassword",
        linkToReset: requestPasswordReset,
        subject: "Verificação do email para redefinir a senha.",
      });

      return res.status(StatusCodes.ACCEPTED).json({
        message:
          "Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.",
        accepted: "accepted",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        userValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
  async resetPassword(req: Request, res: Response) {
    try {
      const { newPassword, token } = resetPasswordSchema.parse(req.body);

      //Just test

      const resetPassword = await userService.resetPassword(newPassword, token);

      if (!resetPassword) {
        throw UserError.invalidToken();
      }

      return res.status(StatusCodes.ACCEPTED).json(resetPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        userValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const { username, password, email, cellPhone, bio } =
        updateProfileSchema.parse(req.body);

      const userUpdated = await userService.updateProfile({
        id: +id,
        username,
        password,
        email,
        cellPhone,
        bio,
        picture: {
          url: req.fileUrl || "",
          name: req.fileName || "",
        },
      });

      if (!userUpdated) {
        throw UserError.userNotFound();
      }

      return res.status(StatusCodes.ACCEPTED).json(userUpdated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        userValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
