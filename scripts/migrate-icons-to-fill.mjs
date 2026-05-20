/**
 * Migrate Bootstrap Icons from outline to filled variants across landing pages.
 * Skips icons that already contain "-fill" in the name.
 */
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");

const FILES = [
  "login.html",
  "register.html",
  "about-us.html",
  "customer-care.html",
  "blogs.html",
  "categories.html",
  "privacy-policy.html",
  "terms-and-conditions.html",
  "responsible-gaming.html",
  "partials/dashboard-home-embed.html",
];

/** Outline icon → filled equivalent (aligned with home.html) */
const ICON_MAP = {
  "arrow-left-right": "layers-fill",
  "arrow-right": "arrow-right-circle-fill",
  "activity": "bar-chart-fill",
  "bank": "credit-card-fill",
  "box-arrow-in-right": "box-arrow-in-right", // no -fill in set; keep
  "broadcast-pin": "pin-map-fill",
  broadcast: "tv-fill",
  bullseye: "record-circle-fill",
  "calendar-event": "calendar-event-fill",
  "cash-stack": "wallet-fill",
  "chat-dots": "chat-dots-fill",
  circle: "circle-fill",
  "circle-square": "app-fill",
  clock: "clock-fill",
  compass: "compass-fill",
  controller: "cpu-fill",
  cookie: "cookie", // brand glyph; use patch-check-fill
  "credit-card": "credit-card-fill",
  dribbble: "flag-fill",
  "file-earmark-lock": "file-earmark-lock-fill",
  "file-text": "file-text-fill",
  gift: "gift-fill",
  globe: "geo-alt-fill",
  "geo-alt": "geo-alt-fill",
  "grid-3x3-gap": "grid-3x3-gap-fill",
  "hand-index": "hand-index-fill",
  headset: "telephone-fill",
  "heart-pulse": "heart-pulse-fill",
  "journal-text": "file-text-fill",
  kanban: "kanban-fill",
  "link-45deg": "patch-check-fill",
  "lightning-charge": "lightning-charge-fill",
  lock: "lock-fill",
  "person-badge": "person-badge-fill",
  "person-check": "person-check-fill",
  "person-lock": "lock-fill",
  "person-plus": "person-plus-fill",
  "phone-fill": "phone-fill",
  phone: "phone-fill",
  "piggy-bank": "piggy-bank-fill",
  "pencil-square": "pencil-fill",
  "shield-check": "shield-fill-check",
  "shield-lock": "shield-lock-fill",
  "shield-shaded": "shield-fill",
  "slash-circle": "slash-circle-fill",
  "speedometer2": "stopwatch-fill",
  "suit-club": "suit-club-fill",
  trophy: "trophy-fill",
  "ui-checks": "check-square-fill",
  wallet2: "wallet-fill",
  wifi: "hdd-network-fill",
};

// Icons without a native -fill variant
ICON_MAP.cookie = "patch-check-fill";
ICON_MAP["box-arrow-in-right"] = "key-fill";

function migrateContent(html) {
  return html.replace(/\bbi bi-([a-z0-9-]+)\b/g, (match, icon) => {
    if (icon.includes("-fill")) return match;
    const filled = ICON_MAP[icon];
    return filled ? `bi bi-${filled}` : match;
  });
}

let total = 0;
for (const rel of FILES) {
  const filePath = path.join(ROOT, rel);
  if (!fs.existsSync(filePath)) {
    console.warn("skip (missing):", rel);
    continue;
  }
  const before = fs.readFileSync(filePath, "utf8");
  const after = migrateContent(before);
  if (before !== after) {
    fs.writeFileSync(filePath, after, "utf8");
    const count = (before.match(/\bbi bi-[a-z0-9-]+\b/g) || []).filter((m) => {
      const icon = m.replace("bi bi-", "");
      return !icon.includes("-fill") && ICON_MAP[icon];
    }).length;
    console.log("updated:", rel);
    total++;
  } else {
    console.log("unchanged:", rel);
  }
}

console.log(`Done. ${total} file(s) updated.`);
