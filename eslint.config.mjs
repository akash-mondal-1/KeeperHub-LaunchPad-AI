import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Allow `any` type - needed for dynamic Web3/blockchain data
      "@typescript-eslint/no-explicit-any": "off",
      // Allow unused catch variables
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "caughtErrorsIgnorePattern": "^_|^e$" }],
      // Allow @ts-ignore (we use it for Radix/shadcn version mismatches)
      "@typescript-eslint/ban-ts-comment": "off",
      // Unescaped entities - allow quotes in JSX text for readability
      "react/no-unescaped-entities": "off",
      // Allow setState in effects (we use it for checking initial wallet state)
      "react-hooks/set-state-in-effect": "off",
    }
  }
]);

export default eslintConfig;
