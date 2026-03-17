"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commentError_1 = __importDefault(require("../errors/commentError"));
const handleError_1 = require("../errors/handleError");
class CommentValidator {
    validator(pathError, res) {
        if (pathError === "content") {
            return (0, handleError_1.handleError)(commentError_1.default.invalidCommentContent(), res);
        }
        if (pathError === "postId") {
            return (0, handleError_1.handleError)(commentError_1.default.postNotFound(), res);
        }
    }
}
exports.default = CommentValidator;
