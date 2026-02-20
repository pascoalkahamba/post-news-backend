import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class CategoryError {
  static categoryNotFound() {
    return new BaseError("Categoria não encontrada.", StatusCodes.NOT_FOUND);
  }

  static categoryAlreadyExist() {
    return new BaseError("Categoria já existe.", StatusCodes.CONFLICT);
  }

  static invalidCategoryName() {
    return new BaseError(
      "Nome da categoria inválido. Deve ter entre 2 e 100 caracteres.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static invalidCategoryDescription() {
    return new BaseError(
      "Descrição da categoria inválida. Deve ter entre 2 e 500 caracteres.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static categoryNotDeleted() {
    return new BaseError(
      "Não foi possível excluir a categoria.",
      StatusCodes.BAD_REQUEST,
    );
  }

  static categoryNotUpdated() {
    return new BaseError(
      "Não foi possível atualizar a categoria.",
      StatusCodes.BAD_REQUEST,
    );
  }
}
