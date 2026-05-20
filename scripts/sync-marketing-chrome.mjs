#!/usr/bin/env node
/**
 * Sync disclaimer + header + subnav from home.html pattern onto all marketing pages.
 * Run: node scripts/sync-marketing-chrome.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderMarketingChrome } from "./marketing-chrome.mjs";

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

const CHROME_START = /<div class="landing-disclaimer">/;
const CHROME_END = /<nav class="landing-subnav"[\s\S]*?<\/nav>/;

for (const file of PAGES) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, "utf8");
  const chrome = renderMarketingChrome(file);
  const replaced = html.replace(
    new RegExp(`${CHROME_START.source}[\\s\\S]*?${CHROME_END.source}`),
    chrome
  );
  if (replaced === html) {
    console.warn(`skip (no match): ${file}`);
    continue;
  }
  fs.writeFileSync(fp, replaced, "utf8");
  console.log(`synced chrome: ${file}`);
}
