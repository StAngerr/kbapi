import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

const transporter = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.emailServiceToken || "",
  })
);

export default transporter;
