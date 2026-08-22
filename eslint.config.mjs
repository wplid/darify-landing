import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

const eslintConfig = [
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"], // new JSX transform: no React import needed per file
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react/prop-types": "off", // plain JS project, no prop-types in use
    },
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        process: "readonly",
      },
    },
    settings: {
      react: { version: "19.2" },
    },
  },
  {
    // react-three-fiber renders Three.js objects (mesh, meshStandardMaterial,
    // etc.) as JSX, which aren't real DOM elements — no-unknown-property
    // doesn't know their prop vocabulary, so it's scoped off just here.
    files: ["components/Scene3D.js"],
    rules: {
      "react/no-unknown-property": "off",
    },
  },
  {
    ignores: [".next/**", "node_modules/**"],
  },
];

export default eslintConfig;
