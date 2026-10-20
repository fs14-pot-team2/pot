import tseslint from "typescript-eslint";
import globals from "globals";
import prettier from "eslint-config-prettier/flat";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  { ignores: [".next/**", "out/**", "dist/**", "next-env.d.ts", "src/generated/**"] },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { "@eslint-react": react, "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@eslint-react/dom-no-dangerously-set-innerhtml": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variableLike",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
        },
        { selector: "parameter", format: ["camelCase"], leadingUnderscore: "allow" },
        { selector: "typeLike", format: ["PascalCase"] },
      ],
    },
  },
  prettier,
);
