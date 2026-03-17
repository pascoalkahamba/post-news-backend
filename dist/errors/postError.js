"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const baseError_1 = require("./baseError");
class PostError {
    static postNotFound() {
        return new baseError_1.BaseError("Publicação não encontrada.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static invalidPostTitle() {
        return new baseError_1.BaseError("Título da publicação inválido. Deve ter entre 2 e 255 caracteres.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static invalidPostContent() {
        return new baseError_1.BaseError("Conteúdo da publicação inválido. Deve ter pelo menos 2 caracteres.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static postNotCreated() {
        return new baseError_1.BaseError("Não foi possível criar a publicação.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static postNotUpdated() {
        return new baseError_1.BaseError("Não foi possível atualizar a publicação.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static postNotDeleted() {
        return new baseError_1.BaseError("Não foi possível excluir a publicação.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static categoryNotFound() {
        return new baseError_1.BaseError("Categoria não encontrada.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static unauthorizedToUpdatePost() {
        return new baseError_1.BaseError("Você não tem permissão para atualizar esta publicação.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    static unauthorizedToDeletePost() {
        return new baseError_1.BaseError("Você não tem permissão para excluir esta publicação.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
exports.default = PostError;
