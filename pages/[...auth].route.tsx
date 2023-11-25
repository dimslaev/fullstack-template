import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/client/useAuth";
import { AUTH_PATHS } from "@/lib/server/constants";
import {
  SignupSchema,
  SigninSchema,
  ChangePasswordSchema,
  ResetPasswordSchema,
  TSignupSchema,
  TSigninSchema,
  TChangePasswordSchema,
  TResetPasswordSchema,
} from "@/lib/client/schemas";

import { Form } from "@/components/form/Form";
import { FieldWrapper } from "@/components/form/FieldWrapper";
import { Fullwidth } from "@/components/layout/Fullwidth";
import { AuthFormBox } from "@/components/layout/AuthFormBox";
import { Button, Stack, Input } from "@mui/joy";

const SignupForm = () => {
  const { signup } = useAuth();

  return (
    <AuthFormBox title="Signup">
      <Form<TSignupSchema>
        onSubmit={(values) => {
          signup.mutate(values);
        }}
        schema={SignupSchema}
      >
        {({ register, formState }) => (
          <Stack spacing={2}>
            <FieldWrapper
              required
              label="Email"
              error={formState.errors["email"]}
            >
              <Input type="text" {...register("email")} />
            </FieldWrapper>

            <FieldWrapper
              required
              label="Password"
              error={formState.errors["password"]}
            >
              <Input type="password" {...register("password")} />
            </FieldWrapper>

            <Button loading={signup.isLoading} type="submit">
              Sign up
            </Button>
          </Stack>
        )}
      </Form>
    </AuthFormBox>
  );
};

const SigninForm = () => {
  const { signin } = useAuth();

  return (
    <AuthFormBox title="Signin">
      <Form<TSigninSchema>
        onSubmit={(values) => {
          signin.mutate(values);
        }}
        schema={SigninSchema}
      >
        {({ register, formState }) => (
          <Stack spacing={2}>
            <FieldWrapper
              required
              label="Email"
              error={formState.errors["email"]}
            >
              <Input type="text" {...register("email")} />
            </FieldWrapper>

            <FieldWrapper
              required
              label="Password"
              error={formState.errors["password"]}
            >
              <Input type="password" {...register("password")} />
            </FieldWrapper>

            <Button loading={signin.isLoading} type="submit">
              Login
            </Button>
          </Stack>
        )}
      </Form>
    </AuthFormBox>
  );
};

const ChangePasswordForm = () => {
  const { changePassword } = useAuth();

  return (
    <AuthFormBox title="Change password">
      <Form<TChangePasswordSchema>
        onSubmit={(values) => {
          changePassword.mutate(values);
        }}
        schema={ChangePasswordSchema}
      >
        {({ register, formState }) => (
          <Stack spacing={2}>
            <FieldWrapper
              required
              label="Password"
              error={formState.errors["password"]}
            >
              <Input type="password" {...register("password")} />
            </FieldWrapper>

            <FieldWrapper
              required
              label="Confirm password"
              error={formState.errors["confirmPassword"]}
            >
              <Input type="password" {...register("confirmPassword")} />
            </FieldWrapper>

            <Button loading={changePassword.isLoading} type="submit">
              Change password
            </Button>
          </Stack>
        )}
      </Form>
    </AuthFormBox>
  );
};

const ResetPasswordForm = () => {
  const { resetPassword } = useAuth();

  return (
    <AuthFormBox title="Reset password">
      <Form<TResetPasswordSchema>
        onSubmit={(values) => {
          resetPassword.mutate(values);
        }}
        schema={ResetPasswordSchema}
        options={{
          defaultValues: { email: "dimslaev@gmail.com" },
        }}
      >
        {({ register, formState }) => (
          <Stack spacing={2}>
            <FieldWrapper
              required
              label="Email"
              error={formState.errors["email"]}
            >
              <Input type="text" {...register("email")} />
            </FieldWrapper>

            <Button loading={resetPassword.isLoading} type="submit">
              Reset password
            </Button>
          </Stack>
        )}
      </Form>
    </AuthFormBox>
  );
};

const AuthPages = () => {
  const { query } = useRouter();
  const path = query.auth?.at(1) as string;

  if (!AUTH_PATHS.includes(path)) {
    return null;
  }

  return (
    <Fullwidth>
      {path === "signup" && <SignupForm />}
      {path === "signin" && <SigninForm />}
      {path === "change-password" && <ChangePasswordForm />}
      {path === "reset-password" && <ResetPasswordForm />}
    </Fullwidth>
  );
};

export default AuthPages;
