#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderLandingFooter } from "./landing-footer.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fp = path.join(ROOT, "index.html");
let html = fs.readFileSync(fp, "utf8");

const footer = renderLandingFooter();

// Replace any landing-footer block(s) inside embedded home or page
html = html.replace(/<footer class="landing-footer">[\s\S]*?<\/footer>/g, footer.trim());

// Replace empty app-footer with full footer before closing app-layout if still empty
if (html.includes("<app-footer") && !html.includes("landing-footer__brand")) {
  html = html.replace(
    /<app-footer[^>]*><\/app-footer>/,
    footer.trim()
  );
}

// Ensure CSS
const cssLink = '  <link href="assets/css/landing-footer.css" rel="stylesheet" />\n';
if (!html.includes("landing-footer.css")) {
  html = html.replace(
    /(<link href="assets\/css\/landing-dark\.css" rel="stylesheet"[^>]*\/>)/i,
    `$1\n${cssLink.trim()}`
  );
  if (!html.includes("landing-footer.css")) {
    html = html.replace(
      /(<link href="assets\/css\/common_style\.css" rel="stylesheet"[^>]*\/>)/i,
      `$1\n${cssLink.trim()}`
    );
  }
}

if (!html.includes("bootstrap-icons") && html.includes("landing-footer__heading")) {
  const bi = '  <link href="assets/css/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />\n';
  if (!html.includes("bootstrap-icons/bootstrap-icons.css")) {
    html = html.replace(
      /(<link href="assets\/css\/common_style\.css" rel="stylesheet"[^>]*\/>)/i,
      `$1\n${bi.trim()}`
    );
  }
}

// Remove duplicate footer inside embedded dashboard — keep only the last one before </body>
const footers = [...html.matchAll(/<footer class="landing-footer">[\s\S]*?<\/footer>/g)];
if (footers.length > 1) {
  for (let i = 0; i < footers.length - 1; i++) {
    html = html.replace(footers[i][0], "");
  }
}

// If app-footer is still empty placeholder, inject footer before it
html = html.replace(
  /<app-footer[^>]*_nghost[^>]*><\/app-footer>/,
  footer.trim()
);

if (!html.includes("landing-dark.css")) {
  const dark = '  <link href="assets/css/landing-dark.css" rel="stylesheet" />\n';
  html = html.replace(
    /(<link href="assets\/css\/common_style\.css" rel="stylesheet"[^>]*\/>)/i,
    `$1\n${dark.trim()}`
  );
}

fs.writeFileSync(fp, html, "utf8");
const count = (html.match(/landing-footer__brand/g) || []).length;
console.log("index.html footer updated");
console.log("premium footer blocks:", count);
console.log("old grid:", html.includes("landing-footer-grid"));
console.log("css link:", html.includes("landing-footer.css"));
console.log("dark css:", html.includes("landing-dark.css"));
