import type { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcryptjs";
import { sendToken, verifyToken2 } from "@/lib/server/auth";
import { isValid } from "@/lib/server/utils";
import { prisma } from "@/lib/server/prisma";
import { ChangePasswordSchema } from "@/lib/client/schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({});
  }

  if (!isValid(ChangePasswordSchema, req.body)) {
    return res.status(400).json({});
  }

  try {
    const userToken = await verifyToken2(req);

    const user = await prisma.user.update({
      where: { id: userToken?.id },
      data: {
        password: bcrypt.hashSync(req.body.password, 8),
      },
    });

    await sendToken(res, 200, user);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
