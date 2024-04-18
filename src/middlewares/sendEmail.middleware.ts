import nodemailer from "nodemailer";

async function sendEmail(userPash: string, validateCode: number) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.DEV_EMAIL as string,
      pass: process.env.DEV_EMAIL_PASSWORD as string,
    },
  });

  const emailOptions = {
    from: process.env.DEV_EMAIL as string,
    to: userPash,
    subject: "Código de validação da conta",
    text: `Seu código de validação é: ${validateCode}`,
  };
  const info = await transporter.sendMail(emailOptions);

  return info;
}

export { sendEmail };
