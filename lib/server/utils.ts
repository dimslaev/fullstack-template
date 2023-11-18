import { User } from "@prisma/client";

export const getUserWithoutPassword = (user: User): Omit<User, "password"> => {
  // eslint-disable-next-line
  const { password, ...rest } = user;
  return rest;
};
