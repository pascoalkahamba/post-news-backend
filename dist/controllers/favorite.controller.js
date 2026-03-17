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
exports.FavoriteController = void 0;
const favorite_validator_1 = __importDefault(require("../validators/favorite.validator"));
const handleError_1 = require("../errors/handleError");
const favorite_service_1 = require("../services/favorite.service");
const http_status_codes_1 = require("http-status-codes");
const favoriteError_1 = __importDefault(require("../errors/favoriteError"));
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const schemas_1 = require("../schemas");
const favoriteService = new favorite_service_1.FavoriteService();
const favoriteValidator = new favorite_validator_1.default();
class FavoriteController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = schemas_1.favoriteCreateSchema.parse(req.body);
                const userId = req.user.id;
                const result = yield favoriteService.create(userId, postId);
                if (result && "error" in result) {
                    if (result.error === "postNotFound") {
                        throw favoriteError_1.default.postNotFound();
                    }
                    if (result.error === "favoriteAlreadyExists") {
                        throw favoriteError_1.default.favoriteAlreadyExists();
                    }
                }
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    favoriteValidator.validator(pathError, res);
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
                const favoriteId = parseInt(req.params.id, 10);
                if (isNaN(favoriteId)) {
                    throw favoriteError_1.default.invalidFavoriteId();
                }
                const userId = req.user.id;
                const result = yield favoriteService.delete(userId, favoriteId);
                if (!result) {
                    throw favoriteError_1.default.favoriteNotFound();
                }
                if (result === "unauthorized") {
                    throw favoriteError_1.default.unauthorizedToFavorite();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(result);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    favoriteValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getUserFavorites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const favorites = yield favoriteService.getByUserId(userId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(favorites);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    favoriteValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getByPostId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = parseInt(req.params.postId, 10);
                if (isNaN(postId)) {
                    throw favoriteError_1.default.postNotFound();
                }
                const favorites = yield favoriteService.getByPostId(postId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(favorites);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    favoriteValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getCountForPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = parseInt(req.params.postId, 10);
                if (isNaN(postId)) {
                    throw favoriteError_1.default.postNotFound();
                }
                const counts = yield favoriteService.getCountForPost(postId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(counts);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    favoriteValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    isFavorited(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = parseInt(req.params.postId, 10);
                if (isNaN(postId)) {
                    throw favoriteError_1.default.postNotFound();
                }
                const userId = req.user.id;
                const result = yield favoriteService.isFavorited(userId, postId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    favoriteValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
}
exports.FavoriteController = FavoriteController;
