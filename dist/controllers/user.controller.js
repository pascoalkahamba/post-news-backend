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
exports.UserController = void 0;
const user_validator_1 = __importDefault(require("../validators/user.validator"));
const handleError_1 = require("../errors/handleError");
const user_service_1 = require("../services/user.service");
const http_status_codes_1 = require("http-status-codes");
const userError_1 = __importDefault(require("../errors/userError"));
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const schemas_1 = require("../schemas");
const managerEmail_service_1 = require("../services/managerEmail.service");
const userValidator = new user_validator_1.default();
const userService = new user_service_1.UserService();
const managerEmail = new managerEmail_service_1.ManagerEmail();
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, username, cellPhone, role } = schemas_1.userCreateSchema.parse(req.body);
                const userCreated = yield userService.create({
                    email,
                    password,
                    username,
                    cellPhone,
                    role,
                });
                if (!userCreated) {
                    throw userError_1.default.emailOrCellPhoneAlreadyExist();
                }
                if (userCreated === "not-accept") {
                    throw userError_1.default.noAccept();
                }
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(userCreated);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    userValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const logged = yield userService.login(user.email, user.password);
                if (!logged) {
                    throw userError_1.default.emailOrPasswordWrong();
                }
                return res.status(http_status_codes_1.StatusCodes.OK).json(logged);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    userValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const userDeleted = yield userService.delete(+id);
                if (!userDeleted) {
                    throw userError_1.default.userNotFound();
                }
                if (userDeleted === "not-accept") {
                    throw userError_1.default.noAccept("Operação não aceita, role ADMIN não pode ser eliminada.");
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(userDeleted);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    userValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield userService.getUserById(+id);
                if (!user) {
                    throw userError_1.default.userNotFound();
                }
                return res.status(http_status_codes_1.StatusCodes.OK).json(user);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    userValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("getAllUsers");
                const users = yield userService.getAllUsers();
                console.log("users", users);
                return res.status(http_status_codes_1.StatusCodes.OK).json(users);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    userValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    requestPasswordReset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = schemas_1.requestPasswordResetSchema.parse(req.body);
                const requestPasswordReset = yield userService.requestPasswordReset(email);
                if (!requestPasswordReset) {
                    throw userError_1.default.emailNotFound();
                }
                yield managerEmail.sendEmail({
                    userEmail: email,
                    operation: "resetPassword",
                    linkToReset: requestPasswordReset,
                    subject: "Verificação do email para redefinir a senha.",
                });
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
                    message: "Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.",
                    accepted: "accepted",
                });
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    userValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newPassword, token } = schemas_1.resetPasswordSchema.parse(req.body);
                const resetPassword = yield userService.resetPassword(newPassword, token);
                if (!resetPassword) {
                    throw userError_1.default.invalidToken();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(resetPassword);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    userValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { username, password, email, cellPhone, bio } = schemas_1.updateProfileSchema.parse(req.body);
                const userUpdated = yield userService.updateProfile({
                    id: +id,
                    username,
                    password,
                    email,
                    cellPhone,
                    bio,
                    picture: {
                        url: req.fileUrl || "",
                        name: req.fileName || "",
                    },
                });
                if (!userUpdated) {
                    throw userError_1.default.userNotFound();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(userUpdated);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    userValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
}
exports.UserController = UserController;
