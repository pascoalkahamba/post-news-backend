import nodemailer from "nodemailer";
import "dotenv/config";

function sendEmail(userPash: string, validateCode: number) {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE_EMAIL,
      auth: {
        user: process.env.DEV_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailOptions = {
      from: process.env.DEV_EMAIL,
      to: `${userPash}`,
      subject: "Código de verificação de conta",
      text: `Seu código de verificação é: ${validateCode}`,
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
