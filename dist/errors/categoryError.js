"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const baseError_1 = require("./baseError");
class CategoryError {
    static categoryNotFound() {
        return new baseError_1.BaseError("Categoria não encontrada.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static categoryAlreadyExist() {
        return new baseError_1.BaseError("Categoria já existe.", http_status_codes_1.StatusCodes.CONFLICT);
    }
    static invalidCategoryName() {
        return new baseError_1.BaseError("Nome da categoria inválido. Deve ter entre 2 e 100 caracteres.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static invalidCategoryDescription() {
        return new baseError_1.BaseError("Descrição da categoria inválida. Deve ter entre 2 e 500 caracteres.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static categoryNotDeleted() {
        return new baseError_1.BaseError("Não foi possível excluir a categoria.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static categoryNotUpdated() {
        return new baseError_1.BaseError("Não foi possível atualizar a categoria.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.default = CategoryError;
