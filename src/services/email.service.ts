import transporter from "../utils/mailer";
import { EMAIL_DOMAIN } from "../constants/emails";
import { UI_APP_BASE_URL } from "../constants/common";

const CONFIRM_SIGNUP_URL = (token: string, userId: string) =>
  `http://localhost:3000/auth/confirm?token=${token}&userId=${userId}`;
const RESTORE_PASSWORD_URL = (token: string, userId: string) =>
  `${UI_APP_BASE_URL}/change-password?token=${token}&userId=${userId}`;

export const sendEmail = (to: string, html: string) => {
  return transporter.sendMail({
    to,
    from: EMAIL_DOMAIN,
    subject: "Welcome to knowledge block",
    html,
  });
};

export const confirmEmailTmpl = (verifyId: string, userId: string) =>
  "<div>" +
  "<h1>Welcome to knowledge block application!!!</h1>" +
  "<p><b>To verify your email click on  link bellow.</b></p>" +
  "<a target='_blank' href='" +
  CONFIRM_SIGNUP_URL(verifyId, userId) +
  "'>Confirm my email address</a>" +
  "</div>";

export const restorePasswordTmpl = (verifyId: string, userId: string) =>
  "<div>" +
  "<p><b>Navigate to following link to change the password.</b></p>" +
  "<a target='_blank' href='" +
  RESTORE_PASSWORD_URL(verifyId, userId) +
  "'>Restore passowd!</a>" +
  "</div>";
