"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const followError_1 = __importDefault(require("../errors/followError"));
const handleError_1 = require("../errors/handleError");
class FollowValidator {
    validator(pathError, res) {
        if (pathError === "followingId") {
            return (0, handleError_1.handleError)(followError_1.default.invalidFollowingId(), res);
        }
        if (pathError === "followerId") {
            return (0, handleError_1.handleError)(followError_1.default.invalidFollowId(), res);
        }
        if (pathError === "status") {
            return (0, handleError_1.handleError)(followError_1.default.invalidStatus(), res);
        }
    }
}
exports.default = FollowValidator;
