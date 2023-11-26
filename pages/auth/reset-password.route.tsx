import * as React from "react";
import { useAuth } from "@/lib/client/useAuth";
import {
  ResetPasswordSchema,
  TResetPasswordSchema,
} from "@/pages/api/auth/_schemas";

import { Form } from "@/components/form/Form";
import { FieldWrapper } from "@/components/form/FieldWrapper";
import { Layout } from "@/components/layout/Layout";
import { AuthFormBox } from "@/components/layout/AuthFormBox";
import { Button, Stack, Input } from "@mui/joy";
import { ErrorAlert } from "@/components/Alerts";

const ResetPasswordForm = () => {
  const { resetPassword } = useAuth();

  return (
    <Layout>
      <AuthFormBox title="Reset password">
        <Form<TResetPasswordSchema>
          onSubmit={(values) => {
            resetPassword.mutate(values);
          }}
          schema={ResetPasswordSchema}
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

      <ErrorAlert open={resetPassword.isError} onClose={resetPassword.reset}>
        You need to set up your own email service provider and get your app
        verified.
      </ErrorAlert>
    </Layout>
  );
};

export default ResetPasswordForm;
