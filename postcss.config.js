const PRODUCTION =
  /* process.env.HUGO_ENVIRONMENT === "production" && */ process.env.NODE_ENV === "production";

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return els.tags.concat(els.classes, els.ids);
  },
});

module.exports = {
  syntax: "postcss-scss",
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    PRODUCTION && require("autoprefixer"),
    ...(PRODUCTION ? [purgecss] : []),
    PRODUCTION &&
      require("cssnano")({
        preset: ["advanced", { discardComments: { removeAll: true } }],
      }),
  ],
};
