import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

const transporter = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey:
      "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",
  })
);

export default transporter;
