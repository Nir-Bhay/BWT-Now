#!/usr/bin/env node
/**
 * Normalize asset and internal links in marketing HTML under pages/
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PAGE_ROUTES, BET_ROUTE, PAGES_DIR } from "./paths.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDir = path.join(ROOT, PAGES_DIR);

function fixMarketingHtml(html) {
  let out = html;

  out = out.replace(/(?<=href=")assets\//g, "/assets/");
  out = out.replace(/(?<=src=")assets\//g, "/assets/");
  out = out.replace(/(?<=href=")js\//g, "/js/");
  out = out.replace(/(?<=src=")js\//g, "/js/");

  for (const [file, route] of Object.entries(PAGE_ROUTES)) {
    const escaped = file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(new RegExp(`href="${escaped}(#[^"]*)?"`, "g"), (_m, hash) => {
      return `href="${route}${hash || ""}"`;
    });
  }

  out = out.replace(/href="index\.html"/g, `href="${BET_ROUTE}"`);

  return out;
}

const targets = [
  pagesDir,
  path.join(ROOT, "partials"),
];

for (const dir of targets) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".html")) continue;
    const rel = path.relative(ROOT, path.join(dir, file)).replace(/\\/g, "/");
    const fp = path.join(dir, file);
    const fixed = fixMarketingHtml(fs.readFileSync(fp, "utf8"));
    fs.writeFileSync(fp, fixed, "utf8");
    console.log("Fixed paths:", rel);
  }
}
