#!/usr/bin/env node
/**
 * Replace footer + add landing-footer.css on all marketing HTML pages.
 * Run: node scripts/patch-landing-footers.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderLandingFooter } from "./landing-footer.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PAGES = [
  "home.html",
  "login.html",
  "register.html",
  "about-us.html",
  "customer-care.html",
  "blogs.html",
  "categories.html",
  "privacy-policy.html",
  "terms-and-conditions.html",
  "responsible-gaming.html",
];

const FOOTER_CSS = '  <link href="assets/css/landing-footer.css" rel="stylesheet" />\n';
const footer = renderLandingFooter();

for (const file of PAGES) {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) {
    console.warn("skip (missing):", file);
    continue;
  }
  let html = fs.readFileSync(fp, "utf8");

  if (!html.includes("landing-footer.css")) {
    html = html.replace(
      /(<link href="assets\/css\/landing-dark\.css" rel="stylesheet" \/>)/,
      `$1\n${FOOTER_CSS.trim()}`
    );
  }

  if (!html.includes('bootstrap-icons.css') && html.includes("landing-footer__heading")) {
    /* icons optional — pages without bi icons still work */
  }
  if (!html.includes("bootstrap-icons") && html.includes("landing-footer")) {
    html = html.replace(
      /(<link href="assets\/css\/common_style\.css" rel="stylesheet" \/>)/,
      `$1\n  <link href="assets/css/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />`
    );
  }

  const replaced = html.replace(
    /<footer class="landing-footer">[\s\S]*?<\/footer>/,
    footer.trim()
  );

  if (replaced === html) {
    console.warn("footer not replaced:", file);
    continue;
  }

  fs.writeFileSync(fp, replaced, "utf8");
  console.log("updated:", file);
}

console.log("Done.");
