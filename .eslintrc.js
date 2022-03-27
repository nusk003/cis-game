module.exports = {
  plugins: ["import"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
    "import/ignore": ["react"],
  },
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: ["../*"],
      },
    ],
  },
};
