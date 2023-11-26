import * as React from "react";
import { useAuth } from "@/lib/client/useAuth";
import {
  ChangePasswordSchema,
  TChangePasswordSchema,
} from "@/pages/api/auth/_schemas";
import { Form } from "@/components/form/Form";
import { FieldWrapper } from "@/components/form/FieldWrapper";
import { Layout } from "@/components/layout/Layout";
import { AuthFormBox } from "@/components/layout/AuthFormBox";
import { Button, Stack, Input } from "@mui/joy";
import { SuccessAlert } from "@/components/Alerts";

const ChangePasswordForm = () => {
  const { changePassword } = useAuth();

  return (
    <Layout>
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

      <SuccessAlert
        open={changePassword.isSuccess}
        onClose={changePassword.reset}
      >
        Password changed!
      </SuccessAlert>
    </Layout>
  );
};

export default ChangePasswordForm;
