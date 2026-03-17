"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const baseError_1 = require("./baseError");
class FavoriteError {
    static favoriteNotFound() {
        return new baseError_1.BaseError("Favorito não encontrado.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static postNotFound() {
        return new baseError_1.BaseError("Post não encontrado.", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    static favoriteAlreadyExists() {
        return new baseError_1.BaseError("Você já favoritou este post.", http_status_codes_1.StatusCodes.CONFLICT);
    }
    static unauthorizedToFavorite() {
        return new baseError_1.BaseError("Você não tem permissão para favoritar este post.", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    static invalidFavoriteId() {
        return new baseError_1.BaseError("ID de favorito inválido.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.default = FavoriteError;
