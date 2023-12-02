import nodemailer from "nodemailer";
import { createToken } from "./auth";
import { User } from "@prisma/client";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.MAILER_USER,
    clientId: process.env.MAILER_CLIENT_ID,
    clientSecret: process.env.MAILER_CLIENT_SECRET,
    refreshToken: process.env.MAILER_REFRESH_TOKEN,
    accessToken: process.env.MAILER_ACCESS_TOKEN,
  },
});

// transporter.verify().then(console.log).catch(console.error);

export const sendEmail = ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) =>
  transporter.sendMail({
    from: `"Custom Next Auth" ${process.env.MAILER_FROM}`,
    to,
    subject,
    html,
  });

export const emailToken = async (user: User) => {
  const token = await createToken(user.id, user.email);
  try {
    sendEmail({
      to: user.email,
      subject: "Change password",
      html: `<a href="/auth/change-password?token=${token}" target="_blank">Change Password</a>`,
    });
  } catch (e) {
    console.log(e);
  }
};
