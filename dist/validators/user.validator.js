"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userError_1 = __importDefault(require("../errors/userError"));
const handleError_1 = require("../errors/handleError");
class UserValidator {
    validator(pathError, res) {
        if (pathError === "username") {
            return (0, handleError_1.handleError)(userError_1.default.invalidInfo("Nome do usuario invalido."), res);
        }
        if (pathError === "password") {
            return (0, handleError_1.handleError)(userError_1.default.invalidInfo("Senha do usuario invalido."), res);
        }
        if (pathError === "newPassword") {
            return (0, handleError_1.handleError)(userError_1.default.invalidInfo("Nova senha do usuario invalido."), res);
        }
        if (pathError === "token") {
            return (0, handleError_1.handleError)(userError_1.default.invalidToken(), res);
        }
        if (pathError === "role") {
            return (0, handleError_1.handleError)(userError_1.default.invalidInfo("A role do usuario deve ser ADMIN ou USER."), res);
        }
        if (pathError === "email") {
            return (0, handleError_1.handleError)(userError_1.default.invalidInfo("Email do usuario invalido."), res);
        }
        if (pathError === "cellPhone") {
            return (0, handleError_1.handleError)(userError_1.default.invalidInfo("Contacto do usuario invalido."), res);
        }
    }
}
exports.default = UserValidator;
