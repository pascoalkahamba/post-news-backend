"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const baseError_1 = require("./baseError");
class CommentError {
    static commentNotFound() {
        return new baseError_1.BaseError("Comentário não encontrado.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static invalidCommentContent() {
        return new baseError_1.BaseError("Conteúdo do comentário inválido. Deve ter pelo menos 1 caractere.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static commentNotCreated() {
        return new baseError_1.BaseError("Não foi possível criar o comentário.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static commentNotUpdated() {
        return new baseError_1.BaseError("Não foi possível atualizar o comentário.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static commentNotDeleted() {
        return new baseError_1.BaseError("Não foi possível excluir o comentário.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static postNotFound() {
        return new baseError_1.BaseError("Publicação não encontrada.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static unauthorizedToUpdateComment() {
        return new baseError_1.BaseError("Você não tem permissão para atualizar este comentário.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    static unauthorizedToDeleteComment() {
        return new baseError_1.BaseError("Você não tem permissão para excluir este comentário.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
exports.default = CommentError;
