import { test as setup } from "@playwright/test";

const authFile = "tests/user.json";

setup("authenticate", async ({ request }) => {
  // Send authentication request. Replace with your own.
  // If test user doesn't exist, you need to create it first

  const user = {
    email: "test-admin@email.com",
    password: "123dj2)()!ks,kIIKL",
  };

  try {
    await request.post("/api/auth/signin", {
      data: user,
    });
  } catch (err) {
    await request.post("/api/auth/signup", {
      data: user,
    });
  }

  await request.storageState({ path: authFile });
});
