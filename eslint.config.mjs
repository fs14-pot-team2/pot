import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import prettier from "eslint-config-prettier/flat";
import react from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import importPlugin from "eslint-plugin-import-x";

export default tseslint.config(
  { ignores: [".next/**", "out/**", "dist/**", "next-env.d.ts", "src/generated/**"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      "@eslint-react": react,
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@eslint-react/no-missing-component-display-name": "error",
      "@eslint-react/no-missing-key": "error",
      "@eslint-react/jsx-no-comment-textnodes": "error",
      "@eslint-react/jsx-no-children-prop": "error",
      "@eslint-react/dom-no-dangerously-set-innerhtml-with-children": "error",
      "@eslint-react/no-direct-mutation-state": "error",
      "@eslint-react/dom-no-find-dom-node": "error",
      "@eslint-react/dom-no-render-return-value": "error",
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "import/no-anonymous-default-export": "warn",
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
