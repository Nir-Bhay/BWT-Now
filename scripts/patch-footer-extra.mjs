#!/usr/bin/env node
import fs from "fs";
import { renderLandingFooter } from "./landing-footer.mjs";

const footer = renderLandingFooter().trim();
const files = ["partials/dashboard-home-embed.html", "index.html"];

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  const next = html.replace(/<footer class="landing-footer">[\s\S]*?<\/footer>/, footer);
  if (next === html) {
    console.warn("footer not replaced:", file);
    continue;
  }
  fs.writeFileSync(file, next);
  console.log("updated:", file);
}
