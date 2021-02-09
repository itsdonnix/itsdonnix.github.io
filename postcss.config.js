const PRODUCTION = process.env.HUGO_ENVIRONMENT === "production";

module.exports = {
  syntax: "postcss-scss",
  plugins: [
    require("tailwindcss"),
    PRODUCTION &&
      require("@fullhuman/postcss-purgecss")({
        content: ["./layouts/**/*.html", "./content/**/*.md", "./content/**/*.html"],
      }),
    PRODUCTION && require("autoprefixer"),
    // PRODUCTION && require("cssnano")(),
  ],
};
