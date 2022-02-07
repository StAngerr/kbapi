import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

const transporter = nodemailer.createTransport({
  // @ts-ignore
  service: "Gmail",
  auth: {
    user: process.env.emailUser,
    pass: process.env.emailPassword,
  },
});

export default transporter;
