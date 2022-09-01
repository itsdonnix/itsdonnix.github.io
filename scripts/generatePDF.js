#!/usr/bin/env node
const puppeteer = require("puppeteer");
const fs = require("fs");
const { Buffer } = require("buffer");
const { PDFDocument } = require("pdf-lib");
const path = require("path");
const cwd = process.cwd();

async function createPDF({ pathToHtmlFile, title, format }) {
  const browser = await puppeteer.launch({
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
  await page.goto("file://" + path.join(cwd, pathToHtmlFile), {
    waitUntil: "networkidle0",
  });
  let pdf = await page.pdf({
    format: format || null,
    landscape: false,
    margin: {
      top: "20px",
      bottom: "20px",
      left: "20px",
      right: "20px",
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

  const relativePathToHtmlFile = path.relative(cwd, pathToHtmlFile);
  const relativeOutputPath = path.relative(cwd, outputPath);

  const pdf = await createPDF({
    pathToHtmlFile: relativePathToHtmlFile,
    format: "A3",
    title,
  });

  fs.writeFileSync(relativeOutputPath, pdf);
}

main();
