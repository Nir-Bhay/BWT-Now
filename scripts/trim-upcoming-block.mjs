#!/usr/bin/env node
/** Remove sport tables inside Upcoming Events card — keep title only */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.resolve(__dirname, "../index.html");
const lines = fs.readFileSync(indexPath, "utf8").split(/\r?\n/);

const titleIdx = lines.findIndex(
  (l) => l.includes("upcomingmatch") && l.includes("list-sport-title")
);
if (titleIdx < 0) {
  console.error("upcomingmatch title not found");
  process.exit(1);
}

let cardOpen = -1;
for (let i = titleIdx; i >= 0; i--) {
  if (lines[i].includes('class="card"') && lines[i].includes("_ngcontent-fmi-c78")) {
    cardOpen = i;
    break;
  }
}

let depth = 0;
let cardClose = -1;
for (let i = cardOpen; i < lines.length; i++) {
  const opens = (lines[i].match(/<div/g) || []).length;
  const closes = (lines[i].match(/<\/div>/g) || []).length;
  if (i === cardOpen) depth = 1;
  else depth += opens - closes;
  if (depth === 0 && i > cardOpen) {
    cardClose = i;
    break;
  }
}

// Title may span lines 15960-15962 — keep from cardOpen through title end
let titleEnd = titleIdx;
while (titleEnd < lines.length && !lines[titleEnd].includes("</span>")) titleEnd++;

const before = lines.slice(0, titleEnd + 1);
const after = lines.slice(cardClose);
const out = [...before, ...after].join("\n");

fs.writeFileSync(indexPath, out, "utf8");
console.log(
  `Trimmed Upcoming Events card: removed ${cardClose - titleEnd - 1} lines (kept title at ${cardOpen + 1}-${titleEnd + 1})`
);
