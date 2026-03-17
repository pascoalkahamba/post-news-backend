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
exports.ReactionController = void 0;
const reaction_validator_1 = __importDefault(require("../validators/reaction.validator"));
const handleError_1 = require("../errors/handleError");
const reaction_service_1 = require("../services/reaction.service");
const http_status_codes_1 = require("http-status-codes");
const reactionError_1 = __importDefault(require("../errors/reactionError"));
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const schemas_1 = require("../schemas");
const reactionService = new reaction_service_1.ReactionService();
const reactionValidator = new reaction_validator_1.default();
class ReactionController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, postId, commentId, replyId } = schemas_1.reactionCreateSchema.parse(req.body);
                const userId = req.user.id;
                const targets = [postId, commentId, replyId].filter(Boolean);
                if (targets.length === 0) {
                    throw reactionError_1.default.targetNotFound();
                }
                if (targets.length > 1) {
                    throw reactionError_1.default.multipleTargets();
                }
                const result = yield reactionService.create(userId, type, postId, commentId, replyId);
                if (result && "error" in result) {
                    if (result.error === "postNotFound") {
                        throw reactionError_1.default.targetNotFound();
                    }
                    if (result.error === "commentNotFound") {
                        throw reactionError_1.default.targetNotFound();
                    }
                    if (result.error === "replyNotFound") {
                        throw reactionError_1.default.targetNotFound();
                    }
                    if (result.error === "noTarget") {
                        throw reactionError_1.default.targetNotFound();
                    }
                }
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    reactionValidator.validator(pathError, res);
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
                const reactionId = req.params.id;
                const userId = req.user.id;
                const result = yield reactionService.delete(userId, reactionId);
                if (!result) {
                    throw reactionError_1.default.reactionNotFound();
                }
                if (result === "unauthorized") {
                    throw reactionError_1.default.unauthorizedToReact();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(result);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    reactionValidator.validator(pathError, res);
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
                const reactions = yield reactionService.getByPostId(postId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(reactions);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    reactionValidator.validator(pathError, res);
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
                const reactions = yield reactionService.getByCommentId(commentId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(reactions);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    reactionValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getByReplyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const replyId = req.params.replyId;
                const reactions = yield reactionService.getByReplyId(replyId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(reactions);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    reactionValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getCountsForPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = req.params.postId;
                const counts = yield reactionService.getReactionCountsForPost(+postId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(counts);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    reactionValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getCountsForComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = req.params.commentId;
                const counts = yield reactionService.getReactionCountsForComment(+commentId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(counts);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    reactionValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getCountsForReply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const replyId = req.params.replyId;
                const counts = yield reactionService.getReactionCountsForReply(+replyId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(counts);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    reactionValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
}
exports.ReactionController = ReactionController;
