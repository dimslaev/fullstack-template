import type { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcryptjs";
import { sendToken } from "@/lib/server/auth";
import { isValid } from "@/lib/server/utils";
import { prisma } from "@/lib/server/prisma";
import { SignupSchema } from "@/pages/api/auth/_schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({});
  }

  if (!isValid(SignupSchema, req.body)) {
    return res.status(400).json({});
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: "USER",
      },
    });

    sendToken(res, 201, user);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
