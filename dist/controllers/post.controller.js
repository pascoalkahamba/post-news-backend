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
exports.PostController = void 0;
const post_validator_1 = __importDefault(require("../validators/post.validator"));
const handleError_1 = require("../errors/handleError");
const baseError_1 = require("../errors/baseError");
const post_service_1 = require("../services/post.service");
const http_status_codes_1 = require("http-status-codes");
const postError_1 = __importDefault(require("../errors/postError"));
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const schemas_1 = require("../schemas");
const postService = new post_service_1.PostService();
const postValidator = new post_validator_1.default();
class PostController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, categoryId } = schemas_1.postCreateSchema.parse(req.body);
                const userId = req.user.id;
                const postCreated = yield postService.create({
                    title,
                    content,
                    categoryId: +categoryId,
                    authorId: userId,
                    picture: { name: req.fileName || "", url: req.fileUrl || "" },
                });
                if (!postCreated) {
                    throw postError_1.default.postNotCreated();
                }
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(postCreated);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    postValidator.validator(pathError, res);
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
                const { title, content, categoryId } = schemas_1.postUpdateSchema.parse(req.body);
                const userId = req.user.id;
                const postUpdated = yield postService.update(+id, {
                    title,
                    content,
                    categoryId: Number(categoryId),
                    picture: { name: req.fileName || "", url: req.fileUrl || "" },
                }, userId);
                if (!postUpdated) {
                    throw postError_1.default.postNotFound();
                }
                if (postUpdated === "unauthorized") {
                    throw postError_1.default.unauthorizedToUpdatePost();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(postUpdated);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    postValidator.validator(pathError, res);
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
                const postDeleted = yield postService.delete(+id, userId);
                if (!postDeleted) {
                    throw postError_1.default.postNotFound();
                }
                if (postDeleted === "unauthorized") {
                    throw postError_1.default.unauthorizedToDeletePost();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(postDeleted);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    postValidator.validator(pathError, res);
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
                const { published, authorId, categoryId } = req.query;
                let posts;
                if (published !== undefined) {
                    posts = yield postService.getPublished();
                }
                else if (authorId) {
                    posts = yield postService.getByAuthorId(+authorId);
                }
                else if (categoryId) {
                    posts = yield postService.getByCategoryId(+categoryId);
                }
                else {
                    posts = yield postService.getAll();
                }
                return res.status(http_status_codes_1.StatusCodes.OK).json(posts);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    postValidator.validator(pathError, res);
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
                const post = yield postService.getById(+id);
                if (!post) {
                    throw postError_1.default.postNotFound();
                }
                return res.status(http_status_codes_1.StatusCodes.OK).json(post);
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
    togglePublish(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const userId = req.user.id;
                const post = yield postService.togglePublish(+id, userId);
                if (!post) {
                    throw postError_1.default.postNotFound();
                }
                if (post === "unauthorized") {
                    throw postError_1.default.unauthorizedToUpdatePost();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(post);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    postValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
}
exports.PostController = PostController;
