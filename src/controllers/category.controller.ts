import { Response, Request } from "express";
import { TPathError } from "../@types";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { CategoryService } from "../services/category.service";
import { StatusCodes } from "http-status-codes";
import CategoryError from "../errors/categoryError";
import { fromError } from "zod-validation-error";
import { ZodError } from "zod";
import { categoryCreateSchema, categoryUpdateSchema } from "../schemas";

const categoryService = new CategoryService();

export class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const { name, description } = categoryCreateSchema.parse(req.body);

      const categoryCreated = await categoryService.create({
        name,
        description,
      });

      if (!categoryCreated) {
        throw CategoryError.categoryAlreadyExist();
      }

      return res.status(StatusCodes.CREATED).json(categoryCreated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        return handleError(
          new BaseError(pathError, StatusCodes.BAD_REQUEST),
          res,
        );
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const { name, description } = categoryUpdateSchema.parse(req.body);

      const categoryUpdated = await categoryService.update(+id, {
        name,
        description,
      });

      if (!categoryUpdated) {
        throw CategoryError.categoryAlreadyExist();
      }

      return res.status(StatusCodes.ACCEPTED).json(categoryUpdated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        return handleError(
          new BaseError(pathError, StatusCodes.BAD_REQUEST),
          res,
        );
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const categoryDeleted = await categoryService.delete(+id);

      if (!categoryDeleted) {
        throw CategoryError.categoryNotFound();
      }

      return res.status(StatusCodes.ACCEPTED).json(categoryDeleted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        return handleError(
          new BaseError(pathError, StatusCodes.BAD_REQUEST),
          res,
        );
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAll();
      return res.status(StatusCodes.OK).json(categories);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        return handleError(
          new BaseError(pathError, StatusCodes.BAD_REQUEST),
          res,
        );
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;
      const category = await categoryService.getById(+id);

      if (!category) {
        throw CategoryError.categoryNotFound();
      }

      return res.status(StatusCodes.OK).json(category);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        return handleError(
          new BaseError(pathError, StatusCodes.BAD_REQUEST),
          res,
        );
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
