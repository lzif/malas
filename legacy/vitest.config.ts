import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["./src/commands/test.ts", "./node_modules/**"],
  },
});
