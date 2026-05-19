#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const indexPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../index.html");
let html = fs.readFileSync(indexPath, "utf8");

if (!html.includes("upcomingmatch")) {
  console.log("upcomingmatch already removed");
  process.exit(0);
}

// Remove the card block that contains upcomingmatch (title only or full)
const cardRe =
  /\s*<div _ngcontent-fmi-c78="" class="card">\s*<span _ngcontent-fmi-c78="" class="list-sport-title upcomingmatch">[\s\S]*?Upcoming Events<\/span>\s*<\/div>\s*/i;

const next = html.replace(cardRe, "\n");
if (next === html) {
  console.error("Could not match upcoming card pattern");
  process.exit(1);
}

// Fix accidental </motion.div> typos from prior edits
const fixed = next.replace(/<\/motion\.div>/g, "</motion.div>").replace(/<\/motion\.div>/g, "</div>");

fs.writeFileSync(indexPath, fixed.replace(/<\/motion\.motion.div>/g, "</motion.div>"), "utf8");
console.log("Removed Upcoming Events section");
