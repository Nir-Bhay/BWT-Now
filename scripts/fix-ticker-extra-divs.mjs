import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const root = join(import.meta.dirname, "..");
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

const fixRe =
  /(<div class="winners-ticker-wrap" aria-hidden="true">[\s\S]*?<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>)(?:\s*<\/div>\s*)+(?=\s*<main)/g;

for (const file of pages) {
  const path = join(root, file);
  const html = readFileSync(path, "utf8");
  const next = html.replace(fixRe, "$1\n");
  if (next !== html) {
    writeFileSync(path, next);
    console.log(`fixed: ${file}`);
  }
}
