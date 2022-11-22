module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    kakao: false,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
    "prettier/prettier": [
      "error",
      {
        bracketSameLine: true,
        singleQuote: false,
        semi: true,
        tabWidth: 2,
        trailingComma: "all",
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: "always",
        endOfLine: "auto",
        useTabs: false,
      },
    ],
  },
};
