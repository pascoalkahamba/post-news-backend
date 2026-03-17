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
exports.CategoryController = void 0;
const handleError_1 = require("../errors/handleError");
const baseError_1 = require("../errors/baseError");
const category_service_1 = require("../services/category.service");
const http_status_codes_1 = require("http-status-codes");
const categoryError_1 = __importDefault(require("../errors/categoryError"));
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const schemas_1 = require("../schemas");
const categoryService = new category_service_1.CategoryService();
class CategoryController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description } = schemas_1.categoryCreateSchema.parse(req.body);
                const categoryCreated = yield categoryService.create({
                    name,
                    description,
                });
                if (!categoryCreated) {
                    throw categoryError_1.default.categoryAlreadyExist();
                }
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(categoryCreated);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    return (0, handleError_1.handleError)(new baseError_1.BaseError(pathError, http_status_codes_1.StatusCodes.BAD_REQUEST), res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { name, description } = schemas_1.categoryUpdateSchema.parse(req.body);
                const categoryUpdated = yield categoryService.update(+id, {
                    name,
                    description,
                });
                if (!categoryUpdated) {
                    throw categoryError_1.default.categoryAlreadyExist();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(categoryUpdated);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    return (0, handleError_1.handleError)(new baseError_1.BaseError(pathError, http_status_codes_1.StatusCodes.BAD_REQUEST), res);
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
                const categoryDeleted = yield categoryService.delete(+id);
                if (!categoryDeleted) {
                    throw categoryError_1.default.categoryNotFound();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(categoryDeleted);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    return (0, handleError_1.handleError)(new baseError_1.BaseError(pathError, http_status_codes_1.StatusCodes.BAD_REQUEST), res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield categoryService.getAll();
                return res.status(http_status_codes_1.StatusCodes.OK).json(categories);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    return (0, handleError_1.handleError)(new baseError_1.BaseError(pathError, http_status_codes_1.StatusCodes.BAD_REQUEST), res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const category = yield categoryService.getById(+id);
                if (!category) {
                    throw categoryError_1.default.categoryNotFound();
                }
                return res.status(http_status_codes_1.StatusCodes.OK).json(category);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    return (0, handleError_1.handleError)(new baseError_1.BaseError(pathError, http_status_codes_1.StatusCodes.BAD_REQUEST), res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
}
exports.CategoryController = CategoryController;
