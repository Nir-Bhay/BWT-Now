/**
 * Embeds home.html body (hero → footer, no header/nav) into index.html
 * after the Casino Provider section.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const homePath = path.join(root, "home.html");
const indexPath = path.join(root, "index.html");
const partialPath = path.join(root, "partials", "dashboard-home-embed.html");

const home = fs.readFileSync(homePath, "utf8");

const heroStart = home.indexOf('<section class="home-hero"');
const footerEnd = home.indexOf("</footer>") + "</footer>".length;
if (heroStart < 0 || footerEnd < 0) {
  console.error("Could not extract home fragment (hero/footer markers missing)");
  process.exit(1);
}

let fragment = home.slice(heroStart, footerEnd).trim();

const indent = "                      ";
const indented = fragment
  .split("\n")
  .map((line) => (line.trim() ? indent + line : ""))
  .join("\n");

const wrapped =
  `${indent}<!-- RB_DASHBOARD_HOME_START -->\n` +
  `${indent}<motion.div class="rb-dashboard-home-embed landing-page bento-page bento-page--home">\n`.replace(/motion\./g, "") +
  indented +
  `\n${indent}</div>\n` +
  `${indent}<!-- RB_DASHBOARD_HOME_END -->`;

fs.mkdirSync(path.dirname(partialPath), { recursive: true });
fs.writeFileSync(
  partialPath,
  fragment,
  "utf8"
);

let index = fs.readFileSync(indexPath, "utf8");

const startTag = "<!-- RB_DASHBOARD_HOME_START -->";
const endTag = "<!-- RB_DASHBOARD_HOME_END -->";

if (index.includes(startTag) && index.includes(endTag)) {
  const re = new RegExp(
    `${startTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
  );
  index = index.replace(re, wrapped.trim());
  console.log("Updated existing dashboard home embed.");
} else {
  const providerEnd =
    /class="casinoprovider-thumb-section">[\s\S]*?17627668338456002\.webp" \/>[\s\S]*?<\/motion.div>\s*<!---->\s*<\/motion.div>\s*<!---->/;
  if (!providerEnd.test(index)) {
    console.error("Casino provider end marker not found in index.html");
    process.exit(1);
  }
  index = index.replace(providerEnd, (match) => match + "\n" + wrapped);
  console.log("Inserted dashboard home embed after Casino Provider.");
}

const cssLinks = [
  '<link href="assets/css/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />',
  '<link href="assets/css/landing.css" rel="stylesheet" />',
  '<link href="assets/css/landing-dark.css" rel="stylesheet" />',
  '<link href="assets/css/landing-footer.css" rel="stylesheet" />',
  '<link href="assets/css/home-bento.css" rel="stylesheet" />',
  '<link href="assets/css/dashboard-home-embed.css" rel="stylesheet" />',
];

for (const link of cssLinks) {
  if (!index.includes(link)) {
    const anchor = '<link rel="stylesheet" href="assets/css/theme_master.css" />';
    if (index.includes(anchor)) {
      index = index.replace(anchor, anchor + "\n  " + link);
    } else {
      index = index.replace("</head>", "  " + link + "\n</head>");
    }
  }
}

const landingUi = '<script src="assets/js/landing-ui.js" defer></script>';
if (!index.includes("landing-ui.js")) {
  index = index.replace(
    '<script src="js/site-logic.js"></script>',
    landingUi + "\n  " + '<script src="js/site-logic.js"></script>'
  );
}

fs.writeFileSync(indexPath, index, "utf8");
console.log("Done. Partial saved to", partialPath);
