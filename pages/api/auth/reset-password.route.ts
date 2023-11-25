import type { NextApiRequest, NextApiResponse } from "next";
import { emailToken } from "@/lib/server/email";
import { isValid } from "@/lib/server/utils";
import { prisma } from "@/lib/server/prisma";
import { ResetPasswordSchema } from "@/lib/client/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({});
  }

  if (!isValid(ResetPasswordSchema, req.body)) {
    return res.status(400).json({});
  }

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: req.body.email as string },
    });

    await emailToken(user);

    res.status(200).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
