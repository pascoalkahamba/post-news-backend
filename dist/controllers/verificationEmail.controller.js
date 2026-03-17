"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verificationEmail_service_1 = require("../services/verificationEmail.service");
const handleError_1 = require("../errors/handleError");
const verificationCodeError_1 = require("../errors/verificationCodeError");
const schemas_1 = require("../schemas");
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const verificationCodeValidator_1 = __importDefault(require("../validators/verificationCodeValidator"));
const http_status_codes_1 = require("http-status-codes");
const verificationCode = new verificationEmail_service_1.VerificationCode();
const verificationCodeValidator = new verificationCodeValidator_1.default();
class ValidateEmailController {
    requestVerificationCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parseBody = schemas_1.requestVerificationCodeSchema.parse(req.body);
                const code = yield verificationCode.saveVerificationCode(parseBody);
                if (!code)
                    throw verificationCodeError_1.VerificationCodeError.emailNotFound();
                if (code === "invalidOperation") {
                    throw verificationCodeError_1.VerificationCodeError.invalidOperation();
                }
                console.log("Código de verificação enviado:", code);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    message: `${parseBody.operation === "resetPassword"
                        ? "Siga as instruções enviadas no seu email."
                        : "Código de verificação enviado"}`,
                });
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    verificationCodeValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    verifyCodeAndProceed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parseBody = schemas_1.verifyCodeAndProceedSchema.parse(req.body);
                const isValid = yield verificationCode.validateVerificationCode(parseBody);
                if (!isValid)
                    throw verificationCodeError_1.VerificationCodeError.invalidCode();
                if (isValid === "invalidOperation") {
                    throw verificationCodeError_1.VerificationCodeError.invalidOperation();
                }
                // Se o código for válido, prossegue com a operação (ex: resetar senha ou deletar conta)
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    message: "Código validado com sucesso, pode prosseguir com a operação",
                    operation: "accepted",
                });
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    verificationCodeValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
}
exports.default = ValidateEmailController;
