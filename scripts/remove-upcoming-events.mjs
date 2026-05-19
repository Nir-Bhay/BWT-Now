#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fp = path.join(ROOT, "index.html");
let html = fs.readFileSync(fp, "utf8");

html = html.replace(/<app-upcoming[\s\S]*?<\/app-upcoming>\s*/g, "");

function removeBalancedBlock(html, start) {
  const slice = html.slice(start);
  const tagMatch = slice.match(/^<(motion\.motion div|motion\.motion\.div|motion\.div|motion\.motiondiv|motiondiv|div)\b/i);
  if (!tagMatch) return null;
  const rawTag = tagMatch[1];
  const closeTag = rawTag.replace(/\./g, ".");

  const openNeedle = `<${rawTag}`;
  const closeNeedle = `</${rawTag}>`;

  let depth = 0;
  let pos = start;

  while (pos < html.length) {
    const nextOpen = html.indexOf(openNeedle, pos);
    const nextClose = html.indexOf(closeNeedle, pos);
    if (nextClose === -1) return null;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = html.indexOf(">", nextOpen) + 1;
      continue;
    }

    depth--;
    const end = nextClose + closeNeedle.length;
    if (depth === 0) {
      return html.slice(0, start) + html.slice(end);
    }
    pos = end;
  }

  return null;
}

function removeUpcomingCard(html) {
  const marker = 'class="list-sport-title upcomingmatch"';
  const idx = html.indexOf(marker);
  if (idx === -1) return null;

  let open = html.lastIndexOf("<div", idx);
  const motionOpen = html.lastIndexOf("<motion.div", idx);
  if (motionOpen > open) open = motionOpen;

  return removeBalancedBlock(html, open);
}

const next = removeUpcomingCard(html);
if (!next) {
  console.error("Could not locate Upcoming Events card block.");
  process.exit(1);
}
html = next;

if (/Upcoming Events/i.test(html)) {
  console.warn("Warning: 'Upcoming Events' text may still exist in index.html");
}

fs.writeFileSync(fp, html);
console.log("Removed app-upcoming and Upcoming Events card from index.html");
