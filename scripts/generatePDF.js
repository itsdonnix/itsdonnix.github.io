#!/usr/bin/env node
// @ts-check
import { launch } from "puppeteer-core";
import { writeFileSync } from "fs";
import { Buffer } from "buffer";
import { PDFDocument } from "pdf-lib";
import { join, relative } from "path";
const cwd = process.cwd();

async function createPDF({ pathToHtmlFile, title, format }) {
  const browser = await launch({
    executablePath: "/opt/google/chrome/chrome",
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-3d-apis",
      "--disable-web-security",
      "--font-render-hinting=none",
    ],
  });
  const page = await browser.newPage();
  await page.goto("file://" + join(cwd, pathToHtmlFile), {
    waitUntil: "networkidle0",
  });
  let pdf = await page.pdf({
    format: format || null,
    landscape: false,
    margin: {
      top: "200px",
      bottom: "200px",
      left: "200px",
      right: "200px",
    },
  });

  browser.close();

  // Set the title
  const pdfdoc = await PDFDocument.load(pdf);
  pdfdoc.setTitle(title);

  pdf = await pdfdoc.save();
  return Buffer.from(pdf);
}

async function main() {
  const argv = process.argv.slice(2);
  const pathToHtmlFile = argv[0];
  const outputPath = argv[1];
  const title = argv.slice(2).join(" ");

  const relativePathToHtmlFile = relative(cwd, pathToHtmlFile);
  const relativeOutputPath = relative(cwd, outputPath);

  const pdf = await createPDF({
    pathToHtmlFile: relativePathToHtmlFile,
    format: "A4",
    title,
  });

  writeFileSync(relativeOutputPath, pdf);
}

main();
