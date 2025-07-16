import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import pluginJs from "@eslint/js";
import config from "eslint-config-prettier";
import plugin from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  config,
  plugin,
]);
