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
exports.VerificationCode = void 0;
const crypto_1 = __importDefault(require("crypto"));
const managerEmail_service_1 = require("./managerEmail.service");
const prisma_service_1 = require("./prisma.service");
const managerEmail = new managerEmail_service_1.ManagerEmail();
class VerificationCode {
    saveVerificationCode(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, operation }) {
            try {
                // Gera o código aleatório (6 caracteres hexadecimais)
                const verificationCode = crypto_1.default.randomBytes(3).toString("hex");
                const user = yield prisma_service_1.prismaService.prisma.user.findFirst({
                    where: { email },
                });
                if (!user)
                    return;
                if (!["resetPassword", "deleteAccount"].includes(operation)) {
                    return "invalidOperation";
                }
                // Define o tempo de expiração (ex: 5 minutos)
                const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
                // Salva o código de verificação no banco de dados
                yield prisma_service_1.prismaService.prisma.verificationCode.create({
                    data: {
                        email,
                        code: verificationCode,
                        operation,
                        expiresAt: expirationTime,
                    },
                });
                // Envia o código de verificação por email
                yield managerEmail.sendEmail({
                    userEmail: email,
                    validateCode: verificationCode,
                    operation,
                    subject: `${operation === "resetPassword"
                        ? "Verificação do email para redefinir a senha."
                        : "Código de verificação para eliminar conta."}`,
                });
                return verificationCode;
            }
            catch (error) {
                console.error("Erro ao salvar o código de verificação no banco", error);
                throw new Error("Erro ao gerar o código de verificação");
            }
        });
    }
    removeExpiredCodes(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma_service_1.prismaService.prisma.verificationCode.deleteMany({
                    where: {
                        email, // Opcional: remove apenas os códigos associados a este email
                        expiresAt: {
                            lt: new Date(), // Remove códigos onde expiresAt é menor que a data atual
                        },
                    },
                });
                console.log(`Códigos expirados removidos: ${result.count}`);
            }
            catch (error) {
                console.error("Erro ao remover códigos expirados", error);
            }
        });
    }
    validateVerificationCode(_a) {
        return __awaiter(this, arguments, void 0, function* ({ code, email, operation, }) {
            if (!["resetPassword", "deleteAccount"].includes(operation))
                return "invalidOperation";
            const savedCode = yield prisma_service_1.prismaService.prisma.verificationCode.findFirst({
                where: {
                    email,
                    code,
                    operation,
                    expiresAt: {
                        gte: new Date(), // Verifica se ainda está dentro do tempo de expiração
                    },
                },
            });
            if (!savedCode) {
                yield this.removeExpiredCodes(email);
                return false;
            }
            return true;
        });
    }
}
exports.VerificationCode = VerificationCode;
