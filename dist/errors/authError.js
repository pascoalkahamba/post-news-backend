"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const http_status_codes_1 = require("http-status-codes");
const baseError_1 = require("./baseError");
class AuthError {
    static noTokenProvided() {
        return new baseError_1.BaseError("Token não fornecido.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    static invalidToken() {
        return new baseError_1.BaseError("Token invalido.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    static invalidTypeOfToken() {
        return new baseError_1.BaseError("Tipo de token incorreto.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}
exports.AuthError = AuthError;
