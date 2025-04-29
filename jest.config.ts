import type { Config } from "jest"

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/lib/supabase$": "<rootDir>/src/__mocks__/lib/supabase.ts",
    "^../lib/supabase$": "<rootDir>/src/__mocks__/lib/supabase.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
}

export default config
