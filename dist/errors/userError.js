"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const baseError_1 = require("./baseError");
class UserError {
    static invalidName() {
        return new baseError_1.BaseError("Nome do usuário deve ter mais de 5 carecteres.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static invalidEmail() {
        return new baseError_1.BaseError("Email invalido.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static invalidToken() {
        return new baseError_1.BaseError("Seu link de redefinição é inválido ou expirou. Por favor, solicite um novo.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    static invalidInfo(message) {
        return new baseError_1.BaseError(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static noAccpet() {
        return new baseError_1.BaseError("Operação rejeitada confirme o seu email.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static emailNotAvailable() {
        return new baseError_1.BaseError("Este email não esta a funcionar.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static emailOrCellPhoneAlreadyExist() {
        return new baseError_1.BaseError("Email ou número de telefone já cadastrado.", http_status_codes_1.StatusCodes.CONFLICT);
    }
    static emailNotFound() {
        return new baseError_1.BaseError("Email não encontrado.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static accountNotFound() {
        return new baseError_1.BaseError("conta não encontrado.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static sendEmailFailed() {
        return new baseError_1.BaseError("Falha ao enviar o codigo por email.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static invalidPassword() {
        return new baseError_1.BaseError("Senha do usuário deve ter mais de 5 carecteres.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static userNotFound() {
        return new baseError_1.BaseError("Dados do usuário não encontrados.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static noAccept(message) {
        return new baseError_1.BaseError(message || "Operação não aceita, verifique a role do usuário.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    static emailOrPasswordWrong() {
        return new baseError_1.BaseError("Senha ou email do usuário incorretos.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
}
exports.default = UserError;
