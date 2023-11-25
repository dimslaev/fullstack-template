import { z } from "zod";

// Signup
export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type TSignupSchema = z.infer<typeof SignupSchema>;

// Signin
export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type TSigninSchema = z.infer<typeof SigninSchema>;

// Change password
export const ChangePasswordSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});
export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;

// Reset password
export const ResetPasswordSchema = z.object({
  email: z.string().email(),
});
export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
