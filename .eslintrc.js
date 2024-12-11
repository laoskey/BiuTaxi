// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "off",
    "no-trailing-spaces": "off",
    // "prettier/prettier": "error",
  },
  ignorePatterns: ["/dist/*"],
};
