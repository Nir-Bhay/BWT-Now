/**
 * Add auth modal + site-logic to all landing HTML pages.
 * Run: node scripts/patch-landing-auth.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  AUTH_MODAL_HTML,
  AUTH_HEAD_LINKS,
  AUTH_FOOT_SCRIPTS,
  headerAuthButtonsHtml,
} from "./auth-modal-snippet.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKIP = new Set(["index.html"]);

const files = fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith(".html") && !SKIP.has(f));

function patchHead(html) {
  if (html.includes("auth-modal.css")) return html;
  return html.replace(
    /<link href="assets\/css\/landing-dark\.css" rel="stylesheet" \/>/,
    `<link href="assets/css/landing-dark.css" rel="stylesheet" />${AUTH_HEAD_LINKS}`
  );
}

function patchHeaderButtons(html) {
  return html.replace(
    /<a href="register\.html" class="btn-login btn-accent">Signup<\/a>\s*<a href="login\.html" class="btn-login">Login<\/a>/gi,
    headerAuthButtonsHtml()
  );
}

function patchFooter(html) {
  if (html.includes("js/site-logic.js")) return html;
  if (html.includes("landing-ui.js")) {
    return html.replace(
      /<script src="assets\/js\/landing-ui\.js" defer><\/script>/,
      `<script src="assets/js/landing-ui.js" defer></script>${AUTH_FOOT_SCRIPTS}`
    );
  }
  return html.replace("</body>", `${AUTH_FOOT_SCRIPTS}\n</body>`);
}

function patchModal(html) {
  if (html.includes("login-popup")) return html;
  return html.replace("</body>", `${AUTH_MODAL_HTML}\n</body>`);
}

let count = 0;
for (const file of files) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, "utf8");
  const before = html;
  html = patchHead(html);
  html = patchHeaderButtons(html);
  html = patchModal(html);
  html = patchFooter(html);
  if (html !== before) {
    fs.writeFileSync(fp, html, "utf8");
    console.log("patched", file);
    count += 1;
  } else {
    console.log("skip (unchanged)", file);
  }
}
console.log("Done.", count, "files updated.");
