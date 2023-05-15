module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "react-app",
    "airbnb",
    "airbnb-typescript",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: [".eslintrc.js"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    quotes: ["error", "double", { avoidEscape: true }],
    "@typescript-eslint/quotes": ["error", "double", { avoidEscape: true }],
    "react/react-in-jsx-scope": ["off"],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-key": "error",
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "react/no-array-index-key": "warn", // Temporarly
    "react/jsx-no-constructed-context-values": "warn", // Temporary
    "jsx-a11y/tabindex-no-positive": "warn", // Temporary
    "no-unsafe-finally": "warn", // Temporary
    "import/order": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "curly": ["error", "all"],
    "@typescript-eslint/no-unused-vars":
      process.env.NODE_ENV === "production" ? "error" : "warn",
  },
};
