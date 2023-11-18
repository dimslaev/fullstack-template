import type { NextApiRequest, NextApiResponse } from "next";
import * as userService from "@/pages/api/user/_service";
import * as bcrypt from "bcryptjs";
import { sendToken } from "@/lib/server/auth";

export const signin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({});
  }

  const user = await userService.find(email);
  const passwordsMatch = await bcrypt.compare(password, user?.password || "");

  if (!passwordsMatch) {
    return res.status(401).json({});
  }

  await sendToken(res, 200, user);
};

export const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  const user = await userService.create({
    email,
    password: bcrypt.hashSync(password, 8),
    role: "USER",
  });

  sendToken(res, 201, user);
};

export const changePassword = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, email, password } = req.body;

  if (!(id && email && password)) {
    return res.status(400).json({});
  }

  await userService.update(req.body);

  res.status(200).json({});
};
