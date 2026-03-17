"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const baseError_1 = require("./baseError");
class ReplyError {
    static replyNotFound() {
        return new baseError_1.BaseError("Resposta não encontrada.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static invalidReplyContent() {
        return new baseError_1.BaseError("Conteúdo da resposta inválido. Deve ter pelo menos 1 caractere.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static replyNotCreated() {
        return new baseError_1.BaseError("Não foi possível criar a resposta.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static replyNotUpdated() {
        return new baseError_1.BaseError("Não foi possível atualizar a resposta.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static replyNotDeleted() {
        return new baseError_1.BaseError("Não foi possível excluir a resposta.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static commentNotFound() {
        return new baseError_1.BaseError("Comentário não encontrado.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static unauthorizedToUpdateReply() {
        return new baseError_1.BaseError("Você não tem permissão para atualizar esta resposta.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    static unauthorizedToDeleteReply() {
        return new baseError_1.BaseError("Você não tem permissão para excluir esta resposta.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
exports.default = ReplyError;
