import * as React from "react";
import { useAuth } from "@/lib/client/useAuth";

import { Layout } from "@/components/layout/Layout";
import { AuthFormBox } from "@/components/layout/AuthFormBox";
import { Button } from "@mui/joy";
import { Table, TableContent, SearchInput } from "@/components/table";

import { UserWithoutPassword } from "@/lib/server/interfaces";

export default function ProtectedPage() {
  const { signout } = useAuth();

  return (
    <Layout>
      <AuthFormBox title="You're in">
        <Button
          loading={signout.isLoading}
          onClick={() => {
            signout.mutate();
          }}
        >
          Sign out
        </Button>
      </AuthFormBox>

      <Table<UserWithoutPassword>
        data={[
          { id: "127382", email: "email@fmail.com", role: "ADMIN" },
          { id: "227382", email: "email@2fmail.com", role: "USER" },
        ]}
        columns={[
          { accessorKey: "id", header: "ID" },
          { accessorKey: "email", header: "Email" },
          { accessorKey: "role", header: "Role" },
        ]}
      >
        <SearchInput />
        <TableContent />
      </Table>
    </Layout>
  );
}
