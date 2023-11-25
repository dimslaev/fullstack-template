import nodemailer from "nodemailer";
import { createToken } from "./auth";
import { User } from "@prisma/client";
import { BASE_URL } from "./constants";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

// transporter.verify().then(console.log).catch(console.error);

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  await transporter.sendMail({
    from: `"Custom Next Auth" ${process.env.MAILER_FROM}`,
    to,
    subject,
    html,
  });
};

export const emailToken = async (user: User) => {
  const token = await createToken(user.id, user.email);
  sendEmail({
    to: user.email,
    subject: "Your token",
    html: `<a href="${BASE_URL}/auth/change-password?token=${token}" target="_blank">Change Password</a>`,
  });
};
