import purge from "@fullhuman/postcss-purgecss";
import postcssImport from "postcss-import";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import tailwindcss from "tailwindcss";

const PRODUCTION = process.env.HUGO_ENVIRONMENT === "production" || process.env.NODE_ENV === "production";

const purgecss = purge({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return els.tags.concat(els.classes, els.ids);
  },
});

export default {
  syntax: "postcss-scss",
  plugins: [
    postcssImport,
    tailwindcss,
    PRODUCTION && autoprefixer,
    ...(PRODUCTION ? [purgecss] : []),
    PRODUCTION &&
      cssnano({
        preset: ["advanced", { discardComments: { removeAll: true } }],
      }),
  ],
};
