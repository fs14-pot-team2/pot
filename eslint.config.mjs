import tseslint from "typescript-eslint";
import globals from "globals";
import prettier from "eslint-config-prettier/flat";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default tseslint.config(
  { ignores: [".next/**", "out/**", "dist/**", "next-env.d.ts", "src/generated/**"] },
  ...nextVitals,
  ...nextTs,
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
  { languageOptions: { globals: globals.node } },
  { files: ["**/*.{jsx,tsx}"], rules: { "react/no-danger": "error" } },
  prettier,
);
