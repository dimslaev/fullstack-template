import { NextApiRequest, NextApiResponse } from "next";
import { type NextRequest } from "next/server";
import { serialize } from "cookie";
import { nanoid } from "nanoid";
import { SignJWT, jwtVerify } from "jose";
import { UserJwtPayload } from "./interfaces";
import { USER_TOKEN, USER_TOKEN_TIME, USER_TOKEN_SECONDS } from "./constants";
import { User } from "@prisma/client";

export const createToken = async (id: string, email: string) => {
  return await new SignJWT({ id, email })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(USER_TOKEN_TIME)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const verifyToken = async (req: NextRequest) => {
  const token = req.cookies.get(USER_TOKEN)?.value;

  if (!token) return;

  try {
    const verified = await jwtVerify<UserJwtPayload>(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verified.payload;
  } catch (err) {
    console.log(err);
  }
};

export const verifyToken2 = async (req: NextApiRequest) => {
  const token = req.headers.authorization;

  if (!token) return;

  try {
    const verified = await jwtVerify<UserJwtPayload>(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verified.payload;
  } catch (err) {
    console.log(err);
  }
};

export const sendToken = async (
  res: NextApiResponse,
  status: number,
  user: User
) => {
  const token = await createToken(user.id, user.email);
  const cookie = serialize(USER_TOKEN, token, {
    httpOnly: true,
    path: "/",
    maxAge: USER_TOKEN_SECONDS,
  });
  res.setHeader("Set-Cookie", cookie);
  res.status(status).json({ ...user, password: undefined });
};

export const removeToken = async (res: NextApiResponse, status: number) => {
  const cookie = serialize(USER_TOKEN, "deleted", {
    httpOnly: true,
    path: "/",
    expires: new Date("1970-01-01"),
  });
  res.setHeader("Set-Cookie", cookie);
  res.status(status).json({});
};
