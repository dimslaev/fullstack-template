import { useMutation } from "react-query";
import { UserWithoutPassword } from "@/lib/server/interfaces";
import { useLocalStorage } from "react-use";
import {
  TSignupSchema,
  TSigninSchema,
  TChangePasswordSchema,
  TResetPasswordSchema,
} from "@/lib/client/schemas";
import { api } from "@/lib/client/api";
import { useRouter } from "next/router";

export const useAuth = () => {
  const { query, push } = useRouter();

  const [user, setUser, removeUser] =
    useLocalStorage<UserWithoutPassword | null>("user", null);

  const signup = useMutation<UserWithoutPassword, unknown, TSignupSchema>(
    "/api/auth/signup",
    (values) => api.post(values, "/api/auth/signup").json(),
    {
      onSuccess: (user: UserWithoutPassword) => {
        setUser(user);
        push("/protected");
      },
    }
  );

  const signin = useMutation<UserWithoutPassword, unknown, TSigninSchema>(
    "/api/auth/signin",
    (values) => api.post(values, "/api/auth/signin").json(),
    {
      onSuccess: (user: UserWithoutPassword) => {
        setUser(user);
        push("/protected");
      },
    }
  );

  const changePassword = useMutation<
    UserWithoutPassword,
    unknown,
    TChangePasswordSchema
  >(
    "/api/auth/change-password",
    (values) =>
      api
        .headers({
          Authorization: query.token as string,
        })
        .post(values, "/api/auth/change-password")
        .json(),
    {
      onSuccess: (user: UserWithoutPassword) => {
        setUser(user);
        push("/protected");
      },
    }
  );

  const resetPassword = useMutation<
    UserWithoutPassword,
    unknown,
    TResetPasswordSchema
  >("/api/auth/reset-password", (values) =>
    api.post(values, "/api/auth/reset-password").json()
  );

  const signout = useMutation(
    "/api/auth/signout",
    () => api.post(null, "/api/auth/signout").json(),
    {
      onSuccess: () => {
        removeUser();
        push("/");
      },
    }
  );

  return {
    user,
    setUser,
    removeUser,
    signup,
    signin,
    signout,
    changePassword,
    resetPassword,
  };
};
