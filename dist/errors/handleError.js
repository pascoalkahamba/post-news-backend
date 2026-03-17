"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
function handleError(error, res) {
    return res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
    });
}
