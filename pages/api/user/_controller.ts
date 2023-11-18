import type { NextApiRequest, NextApiResponse } from "next";
import * as userService from "@/pages/api/user/_service";
import { User } from "@prisma/client";
import { getUserWithoutPassword } from "@/lib/server/utils";

export const getAll = async (_req: NextApiRequest, res: NextApiResponse) => {
  const result = await userService.getAll();
  res.json(result.map(getUserWithoutPassword));
};

export const get = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, "password">>
) => {
  const result = await userService.get(req.query.id as string);
  res.json(getUserWithoutPassword(result));
};

export const create = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, "password">>
) => {
  const result = await userService.create(req.body);
  res.status(201).json(getUserWithoutPassword(result));
};

export const update = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, "password">>
) => {
  const result = await userService.update(req.body);
  res.json(result);
};

export const remove = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, "password">>
) => {
  const result = await userService.remove(req.query.id as string);
  res.json(result);
};
