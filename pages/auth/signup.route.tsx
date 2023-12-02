import * as React from "react";
import { useAuth } from "@/lib/client/useAuth";
import { SignupSchema, TSignupSchema } from "@/pages/api/auth/_schemas";

import { Form } from "@/components/form/Form";
import { FieldWrapper } from "@/components/form/FieldWrapper";
import { Layout } from "@/components/layout/Layout";
import { AuthFormBox } from "@/components/layout/AuthFormBox";
import { Link } from "@/components/Link";
import { Button, Stack, Input, Typography } from "@mui/joy";
import { ErrorAlert } from "@/components/Alerts";

const SignupForm = () => {
  const { signup } = useAuth();
  console.log(signup.error, signup.error?.message);
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

      <ErrorAlert open={signup.isError} onClose={signup.reset}>
        {signup.error?.message === "exists"
          ? "You already have an account. Please sign in."
          : "There was an error."}
      </ErrorAlert>
    </Layout>
  );
};

export default SignupForm;
