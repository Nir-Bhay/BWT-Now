#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SHEETS = {
  "home.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-home-light.css",
    "assets/css/home-sections.css",
    "assets/css/home-bento.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/landing-header.css",
  ],
  "login.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-bento.css",
    "assets/css/landing-home-light.css",
    "assets/css/login-sections.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/landing-header.css",
  ],
  "register.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-bento.css",
    "assets/css/landing-home-light.css",
    "assets/css/register-sections.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/landing-header.css",
  ],
  "about-us.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-home-light.css",
    "assets/css/about-us-sections.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/landing-header.css",
  ],
  "customer-care.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-bento.css",
    "assets/css/landing-home-light.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/landing-header.css",
  ],
  "blogs.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-home-light.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/landing-header.css",
  ],
  "categories.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-home-light.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/landing-header.css",
  ],
  "privacy-policy.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-bento.css",
    "assets/css/landing-home-light.css",
    "assets/css/home-sections.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/landing-header.css",
  ],
  "terms-and-conditions.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-bento.css",
    "assets/css/landing-home-light.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/landing-header.css",
  ],
  "responsible-gaming.html": [
    "assets/css/bootstrap-icons/bootstrap-icons.css",
    "assets/css/common_style.css",
    "assets/css/landing.css",
    "assets/css/landing-footer.css",
    "assets/css/landing-bento.css",
    "assets/css/landing-home-light.css",
    "assets/css/bootstrap/css/bootstrap.min.css",
    "assets/css/auth-modal.css",
    "assets/css/landing-header.css",
  ],
};

const INTER = `  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    body, button, input, select, textarea {
      font-family: "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
    }
  </style>`;

for (const [file, sheets] of Object.entries(SHEETS)) {
  const fp = path.join(ROOT, file);
  const html = fs.readFileSync(fp, "utf8");
  const headEnd = html.indexOf("</head>");
  if (headEnd < 0) continue;

  const head = html.slice(0, headEnd);
  const rest = html.slice(headEnd);

  const preconnectIdx = head.indexOf('rel="preconnect"');
  const headStart = head.slice(0, head.indexOf(">", preconnectIdx) + 1);

  const tail = head.slice(head.indexOf(">", preconnectIdx) + 1);
  const pageStyles = [];
  const styleRegex = /<style>[\s\S]*?<\/style>/g;
  let m;
  while ((m = styleRegex.exec(tail)) !== null) {
    if (!m[0].includes("font-family: \"Inter\"")) pageStyles.push(m[0]);
  }

  const links = sheets.map((s) => `  <link href="${s}" rel="stylesheet" />`).join("\n");
  const newHead = `${headStart}\n${INTER}\n${links}\n${pageStyles.length ? `${pageStyles.join("\n")}\n` : ""}`;

  let out = newHead + rest;
  if (!out.includes("home-page--light")) {
    out = out.replace(/<body class="([^"]*)">/, (_, cls) => {
      const parts = new Set(cls.split(/\s+/).filter(Boolean));
      parts.add("home-page--light");
      return `<body class="${[...parts].join(" ")}">`;
    });
  }

  fs.writeFileSync(fp, out, "utf8");
  console.log(`fixed head: ${file}`);
}
