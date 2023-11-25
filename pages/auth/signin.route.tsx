import React from "react";
import { useAuth } from "@/lib/client/useAuth";
import { SigninSchema, TSigninSchema } from "@/pages/api/auth/_schemas";

import { Form } from "@/components/form/Form";
import { FieldWrapper } from "@/components/form/FieldWrapper";
import { Layout } from "@/components/layout/Layout";
import { AuthFormBox } from "@/components/layout/AuthFormBox";
import { Link } from "@/components/Link";
import { Button, Stack, Input, Typography } from "@mui/joy";

const SigninForm = () => {
  const { signin } = useAuth();

  return (
    <Layout>
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

              <Typography level="body-sm">
                <Link href="/auth/signup">New user? Register here.</Link>
              </Typography>
              <Typography level="body-sm">
                <Link href="/auth/reset-password">Forgot password?</Link>
              </Typography>
            </Stack>
          )}
        </Form>
      </AuthFormBox>
    </Layout>
  );
};

export default SigninForm;
