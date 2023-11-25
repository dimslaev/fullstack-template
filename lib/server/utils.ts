import { User } from "@prisma/client";
import { z } from "zod";

export const getUserWithoutPassword = (user: User): Omit<User, "password"> => {
  // eslint-disable-next-line
  const { password, ...rest } = user;
  return rest;
};
export const isValid = (schema: z.Schema, values: unknown) => {
  const validate = schema.safeParse(values);
  return validate.success;
};
