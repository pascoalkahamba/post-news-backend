"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const authError_1 = require("../errors/authError");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const handleError_1 = require("../errors/handleError");
const prisma_service_1 = require("../services/prisma.service");
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                authError_1.AuthError.noTokenProvided();
                return;
            }
            const [type, token] = authorization.split(" ");
            if (type !== "Bearer") {
                (0, handleError_1.handleError)(authError_1.AuthError.invalidTypeOfToken(), res);
                return;
            }
            const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
            const user = yield prisma_service_1.prismaService.prisma.user.findFirst({
                where: { id },
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            });
            if (!user) {
                authError_1.AuthError.invalidToken();
                return;
            }
            req.user = user;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                const errorMessage = error.message;
                if (errorMessage === "jwt malformed") {
                    (0, handleError_1.handleError)(authError_1.AuthError.invalidToken(), res);
                    return;
                }
                if (errorMessage === "jwt must be provided") {
                    (0, handleError_1.handleError)(authError_1.AuthError.noTokenProvided(), res);
                    return;
                }
            }
        }
    });
}
