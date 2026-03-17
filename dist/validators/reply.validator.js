"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replyError_1 = __importDefault(require("../errors/replyError"));
const handleError_1 = require("../errors/handleError");
class ReplyValidator {
    validator(pathError, res) {
        if (pathError === "content") {
            return (0, handleError_1.handleError)(replyError_1.default.invalidReplyContent(), res);
        }
        if (pathError === "commentId") {
            return (0, handleError_1.handleError)(replyError_1.default.commentNotFound(), res);
        }
    }
}
exports.default = ReplyValidator;
