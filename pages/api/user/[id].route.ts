import type { NextApiRequest, NextApiResponse } from "next";
import * as userController from "@/pages/api/user/_controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  try {
    switch (method) {
      case "GET":
        await userController.get(req, res);
        break;
      case "PUT":
        await userController.update(req, res);
        break;
      case "DELETE":
        await userController.remove(req, res);
        break;
      default:
        res.status(405).json({});
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
