import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", ".wrangler/**", "node_modules/**", "next-env.d.ts", "worker-configuration.d.ts"]),
  {
    rules: {
      // Toegankelijkheid strenger dan de standaardset van Next.js.
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/label-has-associated-control": ["error", { assert: "either", depth: 3 }],
      "jsx-a11y/no-autofocus": "error",
      "jsx-a11y/no-redundant-roles": "error",
    },
  },
]);
