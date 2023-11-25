export const USER_TOKEN = "user-token";
export const USER_TOKEN_SECONDS = 60 * 60 * 2;
export const USER_TOKEN_TIME = "2h";

export const AUTH_PATHS = [
  "signup",
  "signin",
  "signout",
  "change-password",
  "reset-password",
];

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://ds-fullstack.vercel.app";
