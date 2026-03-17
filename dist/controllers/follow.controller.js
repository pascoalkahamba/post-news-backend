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
exports.FollowController = void 0;
const follow_validator_1 = __importDefault(require("../validators/follow.validator"));
const handleError_1 = require("../errors/handleError");
const follow_service_1 = require("../services/follow.service");
const http_status_codes_1 = require("http-status-codes");
const followError_1 = __importDefault(require("../errors/followError"));
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const schemas_1 = require("../schemas");
const followService = new follow_service_1.FollowService();
const followValidator = new follow_validator_1.default();
class FollowController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { followingId } = schemas_1.followCreateSchema.parse(req.body);
                const userId = req.user.id;
                const followCreated = yield followService.create(userId, followingId);
                if (followCreated && "error" in followCreated) {
                    if (followCreated.error === "userNotFound") {
                        throw followError_1.default.userNotFound();
                    }
                    if (followCreated.error === "cannotFollowYourself") {
                        throw followError_1.default.cannotFollowYourself();
                    }
                    if (followCreated.error === "followAlreadyExists") {
                        throw followError_1.default.followAlreadyExists();
                    }
                }
                if (followCreated && "message" in followCreated) {
                    return res.status(http_status_codes_1.StatusCodes.OK).json(followCreated);
                }
                return res.status(http_status_codes_1.StatusCodes.CREATED).json(followCreated);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    followValidator.validator(pathError, res);
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
                const followId = req.params.id;
                const userId = req.user.id;
                const followDeleted = yield followService.delete(userId, +followId);
                if (!followDeleted) {
                    throw followError_1.default.followNotFound();
                }
                if (followDeleted === "unauthorized") {
                    throw followError_1.default.unauthorizedToDeleteFollow();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(followDeleted);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    followValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followId = req.params.id;
                const { status } = schemas_1.followUpdateSchema.parse(req.body);
                const userId = req.user.id;
                const followUpdated = yield followService.updateStatus(+followId, userId, status);
                if (!followUpdated) {
                    throw followError_1.default.followNotFound();
                }
                if (followUpdated === "unauthorized") {
                    throw followError_1.default.unauthorizedToUpdateFollow();
                }
                return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(followUpdated);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    followValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getFollowers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const followers = yield followService.getFollowers(+userId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(followers);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    followValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getFollowing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const following = yield followService.getFollowing(+userId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(following);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    followValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getPendingRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const pending = yield followService.getPendingRequests(userId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(pending);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    followValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getFollowStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const followingId = req.params.userId;
                const userId = req.user.id;
                const followStatus = yield followService.getFollowStatus(userId, +followingId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(followStatus);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    followValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getFollowersCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const count = yield followService.getFollowersCount(+userId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(count);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    followValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
    getFollowingCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const count = yield followService.getFollowingCount(+userId);
                return res.status(http_status_codes_1.StatusCodes.OK).json(count);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    const validationError = (0, zod_validation_error_1.fromError)(error);
                    const { details } = validationError;
                    const pathError = details[0].path[0];
                    followValidator.validator(pathError, res);
                }
                else {
                    return (0, handleError_1.handleError)(error, res);
                }
            }
        });
    }
}
exports.FollowController = FollowController;
