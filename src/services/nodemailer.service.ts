import nodemailer from "nodemailer";
import "dotenv/config";

function sendEmail(userPash: string, validateCode: number) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailOptions = {
      from: process.env.DEV_EMAIL,
      to: `${userPash}`,
      subject: "Código de validação da conta",
      text: `Seu código de validação é: ${validateCode}`,
    };
    const info = transporter.sendMail(emailOptions);

    return {
      info,
      validateCode,
    };
  } catch (error) {
    console.log("erro ao enviar o email ", error);
  }
}

export { sendEmail };
