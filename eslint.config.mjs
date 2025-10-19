import js from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";
import { defineConfig } from "eslint/config";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default defineConfig([
  {
    ignores: ["dist/**", "storybook-static/**", "*.config.js"],
  },
  {
    files: ["**/*.{js,cjs,mjs}"],
    languageOptions: {
      globals: globals.browser,
    },
    extends: [js.configs.recommended],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: ts.parser,
      sourceType: "module",
      globals: globals.browser,
    },
    extends: [...ts.configs.recommended],
  },
  {
    files: ["**/*.{jsx,tsx}"],
    extends: [
      reactPlugin.configs.flat.recommended,
      reactHooksPlugin.configs.flat["recommended-latest"],
    ],
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },
]);
