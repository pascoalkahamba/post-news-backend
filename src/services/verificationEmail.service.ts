import crypto from "crypto";
import { ManagerEmail } from "./managerEmail.service";
import { prismaService } from "./prisma.service";
import {
  ISaveVerificationCode,
  IValidateVerificationCode,
} from "../interfaces";

const managerEmail = new ManagerEmail();

export class VerificationCode {
  async saveVerificationCode({ email, operation }: ISaveVerificationCode) {
    try {
      // Gera o código aleatório (6 caracteres hexadecimais)
      const verificationCode = crypto.randomBytes(3).toString("hex");
      const user = await prismaService.prisma.user.findFirst({
        where: { email },
      });

      if (!user) return;

      if (!["resetPassword", "deleteAccount"].includes(operation)) {
        return "invalidOperation";
      }

      // Define o tempo de expiração (ex: 5 minutos)
      const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
      // Salva o código de verificação no banco de dados
      await prismaService.prisma.verificationCode.create({
        data: {
          email,
          code: verificationCode,
          operation,
          expiresAt: expirationTime,
        },
      });

      // Envia o código de verificação por email
      await managerEmail.sendEmail({
        userEmail: email,
        validateCode: verificationCode,
        operation,
        subject: `${
          operation === "resetPassword"
            ? "Verificação do email para redefinir a senha."
            : "Código de verificação para eliminar conta."
        }`,
      });

      return verificationCode;
    } catch (error) {
      console.error("Erro ao salvar o código de verificação no banco", error);
      throw new Error("Erro ao gerar o código de verificação");
    }
  }

  async removeExpiredCodes(email: string) {
    try {
      const result = await prismaService.prisma.verificationCode.deleteMany({
        where: {
          email, // Opcional: remove apenas os códigos associados a este email
          expiresAt: {
            lt: new Date(), // Remove códigos onde expiresAt é menor que a data atual
          },
        },
      });

      console.log(`Códigos expirados removidos: ${result.count}`);
    } catch (error) {
      console.error("Erro ao remover códigos expirados", error);
    }
  }

  async validateVerificationCode({
    code,
    email,
    operation,
  }: IValidateVerificationCode) {
    if (!["resetPassword", "deleteAccount"].includes(operation))
      return "invalidOperation";

    const savedCode = await prismaService.prisma.verificationCode.findFirst({
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
      await this.removeExpiredCodes(email);
      return false;
    }

    return true;
  }
}
