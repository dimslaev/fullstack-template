import type { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcryptjs";
import { sendToken } from "@/lib/server/auth";
import { isValid } from "@/lib/server/utils";
import { prisma } from "@/lib/server/prisma";
import { SigninSchema } from "@/lib/client/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({});
  }

  if (!isValid(SigninSchema, req.body)) {
    return res.status(400).json({});
  }

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: req.body.email as string },
    });

    const passwordsMatch = await bcrypt.compare(
      req.body.password,
      user?.password || ""
    );

    if (!passwordsMatch) {
      return res.status(401).json({});
    }

    await sendToken(res, 200, user);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
