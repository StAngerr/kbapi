import nodemailer from "nodemailer";
import { google } from "googleapis";
import { EMAIL_DOMAIN } from "../constants/emails";

const OAuth2 = google.auth.OAuth2;

//TODO:  Move to process envs
const clientId = process.env.mailClientId;
const clientSecret = process.env.mailClientSecret;
const refreshToken = process.env.mailRefreshToken;

const oAuthClient = new OAuth2(clientId, clientSecret);

// oAuthClient.setCredentials({
//   refresh_token: refreshToken,
// });
//
// const accessToken = oAuthClient.getAccessToken();

const transporter = nodemailer.createTransport({
  // @ts-ignore
  service: "Gmail",
  auth: {
    type: "OAuth2",
    user: EMAIL_DOMAIN,
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
    accessToken: "",
  },
});

export default transporter;
