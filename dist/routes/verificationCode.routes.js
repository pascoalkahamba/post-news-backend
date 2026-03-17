"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationCodeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const verificationEmail_controller_1 = __importDefault(require("../controllers/verificationEmail.controller"));
const validateEmailController = new verificationEmail_controller_1.default();
const verificationCodeRoutes = express_1.default.Router();
exports.verificationCodeRoutes = verificationCodeRoutes;
verificationCodeRoutes.post("/requestVerificationCode", validateEmailController.requestVerificationCode);
verificationCodeRoutes.post("/verifyCodeAndProceed", validateEmailController.verifyCodeAndProceed);
verificationCodeRoutes.use(auth_middleware_1.authMiddleware);
