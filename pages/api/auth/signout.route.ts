import type { NextApiRequest, NextApiResponse } from "next";
import { removeToken } from "@/lib/server/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({});
  }

  try {
    removeToken(res, 200);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
