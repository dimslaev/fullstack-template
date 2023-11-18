export interface UserJwtPayload {
  id: string;
  email: string;
  jti: string;
  iat: number;
}
