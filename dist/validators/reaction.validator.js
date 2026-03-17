"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reactionError_1 = __importDefault(require("../errors/reactionError"));
const handleError_1 = require("../errors/handleError");
class ReactionValidator {
    validator(pathError, res) {
        if (pathError === "type") {
            return (0, handleError_1.handleError)(reactionError_1.default.invalidReactionType(), res);
        }
        if (pathError === "postId") {
            return (0, handleError_1.handleError)(reactionError_1.default.targetNotFound(), res);
        }
        if (pathError === "commentId") {
            return (0, handleError_1.handleError)(reactionError_1.default.targetNotFound(), res);
        }
        if (pathError === "replyId") {
            return (0, handleError_1.handleError)(reactionError_1.default.targetNotFound(), res);
        }
        if (pathError === "reactionId") {
            return (0, handleError_1.handleError)(reactionError_1.default.invalidReactionId(), res);
        }
    }
}
exports.default = ReactionValidator;
