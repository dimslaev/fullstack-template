import type { NextApiRequest, NextApiResponse } from "next";
import * as authController from "@/pages/api/auth/_controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  try {
    switch (method) {
      case "POST":
        await authController.signup(req, res);
        break;
      default:
        res.status(405).json({});
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
