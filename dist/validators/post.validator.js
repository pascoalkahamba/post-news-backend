"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postError_1 = __importDefault(require("../errors/postError"));
const handleError_1 = require("../errors/handleError");
class PostValidator {
    validator(pathError, res) {
        if (pathError === "title") {
            return (0, handleError_1.handleError)(postError_1.default.invalidPostTitle(), res);
        }
        if (pathError === "content") {
            return (0, handleError_1.handleError)(postError_1.default.invalidPostContent(), res);
        }
        if (pathError === "categoryId") {
            return (0, handleError_1.handleError)(postError_1.default.categoryNotFound(), res);
        }
    }
}
exports.default = PostValidator;
