"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const baseError_1 = require("./baseError");
class FollowError {
    static followNotFound() {
        return new baseError_1.BaseError("Seguidor não encontrado.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static userNotFound() {
        return new baseError_1.BaseError("Usuário não encontrado.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static followAlreadyExists() {
        return new baseError_1.BaseError("Você já está seguindo este usuário.", http_status_codes_1.StatusCodes.CONFLICT);
    }
    static cannotFollowYourself() {
        return new baseError_1.BaseError("Você não pode seguir a si mesmo.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static unauthorizedToUpdateFollow() {
        return new baseError_1.BaseError("Você não tem permissão para atualizar este follow.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    static unauthorizedToDeleteFollow() {
        return new baseError_1.BaseError("Você não tem permissão para excluir este follow.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    static invalidFollowId() {
        return new baseError_1.BaseError("ID de follow inválido.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static invalidFollowingId() {
        return new baseError_1.BaseError("ID de usuário a ser seguido inválido.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static invalidStatus() {
        return new baseError_1.BaseError("Status inválido.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.default = FollowError;
