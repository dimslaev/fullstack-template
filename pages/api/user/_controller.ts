import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { getUserWithoutPassword } from "@/lib/server/utils";
import { prisma } from "@/lib/server/prisma";

export const getAll = async (_req: NextApiRequest, res: NextApiResponse) => {
  const result = await prisma.user.findMany();
  res.json(result.map(getUserWithoutPassword));
};

export const get = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, "password">>
) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: { id: req.query.id as string },
  });
  res.json(getUserWithoutPassword(result));
};

export const create = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, "password">>
) => {
  const result = await prisma.user.create({ data: req.body });
  res.status(201).json(getUserWithoutPassword(result));
};

export const update = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, "password">>
) => {
  const { id, ...data } = req.body;
  const result = await prisma.user.update({
    where: { id },
    data,
  });
  res.json(getUserWithoutPassword(result));
};

export const remove = async (
  req: NextApiRequest,
  res: NextApiResponse<Omit<User, "password">>
) => {
  const result = await prisma.user.delete({
    where: { id: req.query.id as string },
  });
  res.json(getUserWithoutPassword(result));
};
