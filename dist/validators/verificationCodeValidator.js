"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleError_1 = require("../errors/handleError");
const verificationCodeError_1 = require("../errors/verificationCodeError");
class VerificationCodeValidator {
    validator(pathError, res) {
        if (pathError === "code") {
            return (0, handleError_1.handleError)(verificationCodeError_1.VerificationCodeError.invalidCode(), res);
        }
        if (pathError === "operation") {
            return (0, handleError_1.handleError)(verificationCodeError_1.VerificationCodeError.invalidOperation(), res);
        }
        if (pathError === "email") {
            return (0, handleError_1.handleError)(verificationCodeError_1.VerificationCodeError.invalidCode(), res);
        }
    }
}
exports.default = VerificationCodeValidator;
