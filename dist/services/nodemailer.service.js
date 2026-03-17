"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
function sendEmail(userPash, validateCode, subject) {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: process.env.SERVICE_EMAIL,
            auth: {
                user: process.env.DEV_EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const emailOptions = {
            from: process.env.DEV_EMAIL,
            to: `${userPash}`,
            subject: `${subject}`,
            text: `Seu código de verificação é: ${validateCode}`,
        };
        const info = transporter.sendMail(emailOptions);
        return {
            info,
            validateCode,
        };
    }
    catch (error) {
        console.log("erro ao enviar o email ", error);
    }
}
