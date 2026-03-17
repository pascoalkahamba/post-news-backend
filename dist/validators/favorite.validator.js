"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const favoriteError_1 = __importDefault(require("../errors/favoriteError"));
const handleError_1 = require("../errors/handleError");
class FavoriteValidator {
    validator(pathError, res) {
        if (pathError === "postId") {
            return (0, handleError_1.handleError)(favoriteError_1.default.postNotFound(), res);
        }
        if (pathError === "favoriteId") {
            return (0, handleError_1.handleError)(favoriteError_1.default.invalidFavoriteId(), res);
        }
    }
}
exports.default = FavoriteValidator;
