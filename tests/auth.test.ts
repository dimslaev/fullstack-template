import { prisma } from "../lib/server/prisma";
import { test, expect } from "@playwright/test";
import { User } from "@prisma/client";

export const fakeUser: User = {
  id: "123",
  email: "fake-user@mail.com",
  role: "USER",
  password: "123",
};

test.afterAll(async () => {
  try {
    await prisma.user.delete({ where: { email: fakeUser.email } });
  } catch (e) {
    // console.log(e);
  }
});

// Sunny
test("should create user and return token", async ({ request }) => {
  const res = await request.post("/api/auth/signup", {
    data: {
      email: fakeUser.email,
      password: fakeUser.password,
    },
  });

  expect(res.status()).toBe(201);
  expect(res.headers()["set-cookie"]).toBeDefined();
});

// // Rainy
test("should not create user if user exists", async ({ request }) => {
  const res = await request.post("/api/auth/signup", {
    data: {
      email: fakeUser.email,
      password: fakeUser.password,
    },
  });
  expect(res.status()).toBe(500);
  expect(res.headers()["set-cookie"]).toBeUndefined();
});

// Sunny
test("should login user and return token", async ({ request }) => {
  const res = await request.post("/api/auth/signin", {
    data: {
      email: fakeUser.email,
      password: fakeUser.password,
    },
  });
  expect(res.status()).toBe(200);
  expect(res.headers()["set-cookie"]).toBeTruthy();
});

// Rainy
test("should not login user with wrong credentials", async ({ request }) => {
  const res = await request.post("/api/auth/signin", {
    data: {
      email: fakeUser.email,
      password: "456",
    },
  });
  expect(res.status()).toBe(401);
  expect(res.headers()["set-cookie"]).toBeUndefined();
});
