const PRODUCTION = process.env.HUGO_ENVIRONMENT === "production";

module.exports = {
  syntax: "postcss-scss",
  plugins: [require("tailwindcss"), PRODUCTION && require("autoprefixer")],
};
