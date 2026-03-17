"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const baseError_1 = require("./baseError");
class ReactionError {
    static reactionNotFound() {
        return new baseError_1.BaseError("Reação não encontrada.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static invalidReactionType() {
        return new baseError_1.BaseError("Tipo de reação inválido. Use LIKE ou DISLIKE.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static targetNotFound() {
        return new baseError_1.BaseError("Alvo da reação não encontrado. Especifique postId, commentId ou replyId.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static multipleTargets() {
        return new baseError_1.BaseError("Apenas um alvo pode ser especificado: postId, commentId ou replyId.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static reactionAlreadyExists() {
        return new baseError_1.BaseError("Você já reactionou a este conteúdo.", http_status_codes_1.StatusCodes.CONFLICT);
    }
    static unauthorizedToReact() {
        return new baseError_1.BaseError("Você não tem permissão para react a este conteúdo.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    static invalidReactionId() {
        return new baseError_1.BaseError("ID de reação inválido.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.default = ReactionError;
