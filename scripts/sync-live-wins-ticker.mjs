/**
 * Replace Live Wins ticker markup on all marketing pages with home.html pattern.
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { renderLiveWinsTicker } from "./marketing-chrome.mjs";

const root = join(import.meta.dirname, "..");
const ticker = renderLiveWinsTicker();
const tickerRe =
  /<div class="winners-ticker-wrap" aria-hidden="true">[\s\S]*?<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>/;

const pages = [
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

for (const file of pages) {
  const path = join(root, file);
  let html = readFileSync(path, "utf8");
  if (!tickerRe.test(html)) {
    console.warn(`skip (no ticker): ${file}`);
    continue;
  }
  html = html.replace(tickerRe, ticker.trim());
  writeFileSync(path, html);
  console.log(`updated: ${file}`);
}
