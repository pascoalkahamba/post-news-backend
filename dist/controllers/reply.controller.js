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
exports.ReplyController = void 0;
const reply_validator_1 = __importDefault(require("../validators/reply.validator"));
const handleError_1 = require("../errors/handleError");
const baseError_1 = require("../errors/baseError");
const reply_service_1 = require("../services/reply.service");
const http_status_codes_1 = require("http-status-codes");
const replyError_1 = __importDefault(require("../errors/replyError"));
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const schemas_1 = require("../schemas");
const replyService = new reply_service_1.ReplyService();
const replyValidator = new reply_validator_1.default();
class ReplyController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { content, commentId } = schemas_1.replyCreateSchema.parse(req.body);
                const userId = req.user.id;
                const replyCreated = yield replyService.create({
                    content,
                    commentId: +commentId,
                    userId,
                });
                if (!replyCreated) {
                    throw replyError_1.default.replyNotCreated();
                }
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(replyCreated);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    replyValidator.validator(pathError, res);
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
                const { content } = schemas_1.replyUpdateSchema.parse(req.body);
                const userId = req.user.id;
                const replyUpdated = yield replyService.update(+id, { content }, userId);
                if (!replyUpdated) {
                    throw replyError_1.default.replyNotFound();
                }
                if (replyUpdated === "unauthorized") {
                    throw replyError_1.default.unauthorizedToUpdateReply();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(replyUpdated);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    replyValidator.validator(pathError, res);
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
                const replyDeleted = yield replyService.delete(+id, userId);
                if (!replyDeleted) {
                    throw replyError_1.default.replyNotFound();
                }
                if (replyDeleted === "unauthorized") {
                    throw replyError_1.default.unauthorizedToDeleteReply();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(replyDeleted);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    replyValidator.validator(pathError, res);
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
                const replies = yield replyService.getAll();
                return res.status(http_status_codes_1.StatusCodes.OK).json(replies);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    replyValidator.validator(pathError, res);
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
                const reply = yield replyService.getById(+id);
                if (!reply) {
                    throw replyError_1.default.replyNotFound();
                }
                return res.status(http_status_codes_1.StatusCodes.OK).json(reply);
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
    getByCommentId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = req.params.commentId;
                const replies = yield replyService.getByCommentId(+commentId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(replies);
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
exports.ReplyController = ReplyController;
