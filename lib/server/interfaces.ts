import { User } from "@prisma/client";

export interface UserJwtPayload {
  id: string;
  email: string;
  jti: string;
  iat: number;
}

export type UserWithoutPassword = Omit<User, "password">;
