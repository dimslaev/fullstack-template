import { prisma } from "../lib/server/prisma";
import { test, expect } from "@playwright/test";
import { User } from "@prisma/client";

export const fakeUser: User = {
  id: "234",
  email: "fake-user-2@mail.com",
  role: "USER",
  password: "123456",
};

test.afterAll(async () => {
  try {
    await prisma.user.delete({ where: { email: fakeUser.email } });
  } catch (e) {
    // console.log(e);
  }
});

test("should add user", async ({ request }) => {
  const res = await request.post("/api/user", {
    data: {
      ...fakeUser,
      id: undefined,
    },
  });
  const user = await res.json();
  fakeUser.id = user.id;

  expect(res.status()).toBe(201);
  expect(user).toHaveProperty("id");
  expect(user).toHaveProperty("email");
});

test("should return all user", async ({ request }) => {
  const res = await request.get("/api/user");
  expect(res.status()).toBe(200);
  expect(
    ((await res.json()) as User[]).some(({ id }) => id === fakeUser.id)
  ).toBe(true);
});

test("should return user", async ({ request }) => {
  const res = await request.get(`/api/user/${fakeUser.id}`);
  expect(res.status()).toBe(200);
  expect(await res.json()).toBeDefined();
});

test("should update user", async ({ request }) => {
  const res = await request.put(`/api/user/${fakeUser.id}`, {
    data: {
      ...fakeUser,
      role: "ADMIN",
    },
  });
  expect(res.status()).toBe(200);
  expect((await res.json()).role).toBe("ADMIN");
});

test("should delete user", async ({ request }) => {
  const res = await request.delete(`/api/user/${fakeUser.id}`);
  expect(res.status()).toBe(200);
});
