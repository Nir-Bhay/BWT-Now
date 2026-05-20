#!/usr/bin/env node
/**
 * Normalize marketing page <head> stylesheet order to match home.html.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const PAGES = {
  "home.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-home-light.css",
    "assets/css/landing-header.css",
    "assets/css/home-sections.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/home-bento.css",
  ],
  "login.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-bento.css",
    "assets/css/landing-home-light.css",
    "assets/css/landing-header.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/login-sections.css",
  ],
  "register.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-bento.css",
    "assets/css/landing-home-light.css",
    "assets/css/landing-header.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/register-sections.css",
  ],
  "about-us.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-home-light.css",
    "assets/css/landing-header.css",
    "assets/css/about-us-sections.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
  ],
  "customer-care.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-bento.css",
    "assets/css/landing-home-light.css",
    "assets/css/landing-header.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
  ],
  "blogs.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-home-light.css",
    "assets/css/landing-header.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
  ],
  "categories.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-home-light.css",
    "assets/css/landing-header.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
  ],
  "privacy-policy.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-bento.css",
    "assets/css/landing-home-light.css",
    "assets/css/landing-header.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/home-sections.css",
  ],
  "terms-and-conditions.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-bento.css",
    "assets/css/landing-home-light.css",
    "assets/css/landing-header.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
  ],
  "responsible-gaming.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-bento.css",
    "assets/css/landing-home-light.css",
    "assets/css/landing-header.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
  ],
};

const INTER_BLOCK = `  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    body, button, input, select, textarea {
      font-family: "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
    }
  </style>`;

for (const [file, sheets] of Object.entries(PAGES)) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, "utf8");

  const sheetLinks = sheets.map((s) => `  <link href="${s}" rel="stylesheet" />`).join("\n");
  const assetBlock = `${INTER_BLOCK}\n${sheetLinks}\n`;

  html = html.replace(
    /<link href="https:\/\/fonts\.gstatic\.com" rel="preconnect" \/>\s*[\s\S]*?(?=<style>\s*:root|<\/head>)/,
    `<link href="https://fonts.gstatic.com" rel="preconnect" />\n${assetBlock}`
  );

  if (!html.includes("home-page--light")) {
    html = html.replace(/<body class="([^"]*)">/, (m, cls) => {
      const parts = new Set(cls.split(/\s+/).filter(Boolean));
      parts.add("home-page--light");
      return `<body class="${[...parts].join(" ")}">`;
    });
  }

  fs.writeFileSync(fp, html, "utf8");
  console.log(`head synced: ${file}`);
}
