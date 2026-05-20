#!/usr/bin/env node
/**
 * Add landing-responsive.css to all marketing HTML pages (not index.html).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LINK = '  <link href="assets/css/landing-responsive.css" rel="stylesheet" />\n';

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

for (const file of PAGES) {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) {
    console.warn("skip:", file);
    continue;
  }
  let html = fs.readFileSync(fp, "utf8");
  if (html.includes("landing-responsive.css")) {
    console.log("already linked:", file);
    continue;
  }
  if (html.includes("landing-header.css")) {
    html = html.replace(
      /(<link href="assets\/css\/landing-header\.css" rel="stylesheet" \/>)/,
      `$1\n${LINK.trim()}`
    );
  } else if (html.includes("auth-modal.css")) {
    html = html.replace(
      /(<link href="assets\/css\/auth-modal\.css" rel="stylesheet" \/>)/,
      `$1\n${LINK.trim()}`
    );
  } else {
    html = html.replace("</head>", `${LINK}</head>`);
  }
  fs.writeFileSync(fp, html, "utf8");
  console.log("linked:", file);
}

console.log("Done.");
