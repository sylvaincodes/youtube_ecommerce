import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: { globals: globals.node },
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  //ignore some folders
  {
    ignores: [
      ".next/*",
      "__tests__/*",
      "cypress/*",
      "node_modules/*",
      "components/ui/*",
      "hooks/*",
    ],
  },
];
