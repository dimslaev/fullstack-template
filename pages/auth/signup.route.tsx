import React from "react";
import { useMutation } from "react-query";
import { api } from "@/lib/client/api";
import { SignupForm } from "@/features/auth/SignupForm";
import Box from "@mui/joy/Box";

const SignupPage = () => {
  const signupMutation = useMutation(
    (values: { password: string; email: string }) => {
      return api
        .post(values, "/api/auth/signup")
        .res()
        .then((r) => {
          console.log(r);
        });
    }
  );

  return (
    <Box sx={{ pt: [8, 8, 16] }}>
      <SignupForm
        onSubmit={(values) => {
          signupMutation.mutate(values);
        }}
        isSubmitting={signupMutation.isLoading}
      />
    </Box>
  );
};

export default SignupPage;
