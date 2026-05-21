#!/usr/bin/env node
/**
 * Apply SEO head tags to all marketing HTML pages from marketing-head.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MARKETING_PAGE_SEO, renderMarketingHeadMeta } from "./marketing-head.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

for (const [file, seo] of Object.entries(MARKETING_PAGE_SEO)) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, "utf8");

  const metaBlock = renderMarketingHeadMeta(seo);
  html = html.replace(
    /<meta charset="utf-8"\s*\/>\s*[\s\S]*?<link rel="icon" href="assets\/favicon\.ico"\s*\/>/,
    `<meta charset="utf-8" />\n  ${metaBlock.trim()}`
  );

  if (!html.includes("marketing-images.css")) {
    html = html.replace(
      /<link href="assets\/css\/landing-responsive\.css" rel="stylesheet"\s*\/>/,
      `<link href="assets/css/landing-responsive.css" rel="stylesheet" />\n<link href="assets/css/marketing-images.css" rel="stylesheet" />`
    );
  }

  const isLegalPage = ["privacy-policy.html", "terms-and-conditions.html", "responsible-gaming.html", "customer-care.html"].includes(file);
  if (isLegalPage && !html.includes("legal-cards.css")) {
    html = html.replace(
      /<link href="assets\/css\/auth-modal\.css" rel="stylesheet"\s*\/>/,
      `<link href="assets/css/auth-modal.css" rel="stylesheet" />\n  <link href="assets/css/legal-cards.css" rel="stylesheet" />`
    );
  }

  fs.writeFileSync(fp, html, "utf8");
  console.log(`SEO applied: ${file}`);
}
