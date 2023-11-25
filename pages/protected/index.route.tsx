import React from "react";
import { useAuth } from "@/lib/client/useAuth";

import { Layout } from "@/components/layout/Layout";
import { AuthFormBox } from "@/components/layout/AuthFormBox";
import { Button } from "@mui/joy";

export default function ProtectedPage() {
  const { signout } = useAuth();

  return (
    <Layout>
      <AuthFormBox title="You're in" textAlign="center">
        <Button
          loading={signout.isLoading}
          onClick={() => {
            signout.mutate();
          }}
        >
          Sign out
        </Button>
      </AuthFormBox>
    </Layout>
  );
}
