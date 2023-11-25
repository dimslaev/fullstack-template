import React from "react";
import { useAuth } from "@/lib/client/useAuth";
import { SignupSchema, TSignupSchema } from "@/pages/api/auth/_schemas";

import { Form } from "@/components/form/Form";
import { FieldWrapper } from "@/components/form/FieldWrapper";
import { Layout } from "@/components/layout/Layout";
import { AuthFormBox } from "@/components/layout/AuthFormBox";
import { Link } from "@/components/Link";
import { Button, Stack, Input, Typography } from "@mui/joy";

const SignupForm = () => {
  const { signup } = useAuth();

  return (
    <Layout>
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

              <Typography level="body-sm">
                <Link href="/auth/signin">Already registered? Sign in.</Link>
              </Typography>
            </Stack>
          )}
        </Form>
      </AuthFormBox>
    </Layout>
  );
};

export default SignupForm;
