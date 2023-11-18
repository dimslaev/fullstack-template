import { prisma } from "@/lib/server/prisma";
import { User } from "@prisma/client";

export const getAll = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const get = async (id: string): Promise<User> => {
  return await prisma.user.findUniqueOrThrow({ where: { id } });
};

export const find = async (email: string | undefined): Promise<User> => {
  return await prisma.user.findUniqueOrThrow({ where: { email } });
};

export const create = async (data: Omit<User, "id">): Promise<User> => {
  return await prisma.user.create({ data });
};

export const update = async ({ id, ...data }: User): Promise<User> => {
  return await prisma.user.update({ where: { id }, data });
};

export const remove = async (id: string): Promise<User> => {
  return await prisma.user.delete({ where: { id } });
};
