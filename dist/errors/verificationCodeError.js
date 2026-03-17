"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationCodeError = void 0;
const http_status_codes_1 = require("http-status-codes");
const baseError_1 = require("./baseError");
class VerificationCodeError {
    static invalidCode() {
        return new baseError_1.BaseError("Código de verificação inválido ou expirado", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    static invalidOperation() {
        return new baseError_1.BaseError("Operação do usuário inválido", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static emailNotFound() {
        return new baseError_1.BaseError("Email do usuário não encontrado", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static invalidEmail() {
        return new baseError_1.BaseError("Email inválido", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.VerificationCodeError = VerificationCodeError;
