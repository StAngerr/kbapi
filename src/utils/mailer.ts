import nodemailer from "nodemailer";
import { google } from "googleapis";
import { EMAIL_DOMAIN } from "../constants/emails";

const OAuth2 = google.auth.OAuth2;

//TODO:  Move to process envs
const clientId =
  "950613768444-mgqp94sdj3sfebacqu0rldlrnf4pv2kr.apps.googleusercontent.com";
const clientSecret = "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";
const refreshToken =
  "1//04JY_w6x275SUCgYIARAAGAQSNgF-L9IrZdShuisC2rza5Zk7IzYoFDPDihjPJ5Dr7ZA2oVioI2iW1I2glIb_vsmXbo3ODKip9g";

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
