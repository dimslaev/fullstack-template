import React from "react";
import { useMutation, useQuery } from "react-query";
import { api } from "@/lib/client/api";

const SignupPage = () => {
  const signupMutation = useMutation(
    (values: { password: string; email: string }) => {
      return api
        .post(values, "/auth/signin")
        .res()
        .then((r) => {
          console.log(r);
        });
    }
  );

  const getUsers = () => {
    return api.get("/user").res((r) => {
      console.log(r);
    });
  };

  return (
    <div>
      {signupMutation.isLoading}
      {signupMutation.isError}
      <button
        onClick={() => {
          signupMutation.mutate({
            email: "fakeuser222333d@gmail.com",
            password: "123456",
          });
        }}
      >
        OK
      </button>
      <button onClick={getUsers}></button>
    </div>
  );
};

export default SignupPage;
