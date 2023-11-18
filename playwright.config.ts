import { defineConfig } from "@playwright/test";

export default defineConfig({
  projects: [
    // Setup project
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
      use: {
        baseURL: "http://localhost:3000",
        extraHTTPHeaders: {
          "Content-Type": "application/json",
        },
      },
    },
    {
      name: "default",
      use: {
        baseURL: "http://localhost:3000",
        extraHTTPHeaders: {
          "Content-Type": "application/json",
        },
        storageState: "tests/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});
