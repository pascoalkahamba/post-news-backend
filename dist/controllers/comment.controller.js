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
exports.CommentController = void 0;
const comment_validator_1 = __importDefault(require("../validators/comment.validator"));
const handleError_1 = require("../errors/handleError");
const baseError_1 = require("../errors/baseError");
const comment_service_1 = require("../services/comment.service");
const http_status_codes_1 = require("http-status-codes");
const commentError_1 = __importDefault(require("../errors/commentError"));
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const schemas_1 = require("../schemas");
const commentService = new comment_service_1.CommentService();
const commentValidator = new comment_validator_1.default();
class CommentController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { content, postId } = schemas_1.commentCreateSchema.parse(req.body);
                const userId = req.user.id;
                const commentCreated = yield commentService.create({
                    content,
                    postId: +postId,
                    userId,
                });
                if (!commentCreated) {
                    throw commentError_1.default.commentNotCreated();
                }
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(commentCreated);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    commentValidator.validator(pathError, res);
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
                const { content } = schemas_1.commentUpdateSchema.parse(req.body);
                const userId = req.user.id;
                const commentUpdated = yield commentService.update(+id, { content }, userId);
                if (!commentUpdated) {
                    throw commentError_1.default.commentNotFound();
                }
                if (commentUpdated === "unauthorized") {
                    throw commentError_1.default.unauthorizedToUpdateComment();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(commentUpdated);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    commentValidator.validator(pathError, res);
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
                const userId = req.user.id;
                const commentDeleted = yield commentService.delete(+id, userId);
                if (!commentDeleted) {
                    throw commentError_1.default.commentNotFound();
                }
                if (commentDeleted === "unauthorized") {
                    throw commentError_1.default.unauthorizedToDeleteComment();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(commentDeleted);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    commentValidator.validator(pathError, res);
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
                const comments = yield commentService.getAll();
                return res.status(http_status_codes_1.StatusCodes.OK).json(comments);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    commentValidator.validator(pathError, res);
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
                const comment = yield commentService.getById(+id);
                if (!comment) {
                    throw commentError_1.default.commentNotFound();
                }
                return res.status(http_status_codes_1.StatusCodes.OK).json(comment);
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
    getByPostId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.postId;
                const comments = yield commentService.getByPostId(+postId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(comments);
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
    getByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const comments = yield commentService.getByUserId(+userId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(comments);
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
exports.CommentController = CommentController;
