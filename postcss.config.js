const PRODUCTION = process.env.HUGO_ENVIRONMENT === "production";

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    let els = JSON.parse(content).htmlElements;
    return els.tags.concat(els.classes, els.ids);
  },
});

module.exports = {
  syntax: "postcss-scss",
  plugins: [
    require("tailwindcss"),
    PRODUCTION && require("autoprefixer"),
    ...(PRODUCTION ? [purgecss] : []),
    // PRODUCTION && require("cssnano")(),
  ],
};
