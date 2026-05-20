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

const fragment = home.slice(heroStart, footerEnd).trim();

const indent = "                      ";
const indented = fragment
  .split("\n")
  .map((line) => (line.trim() ? indent + line : ""))
  .join("\n");

const wrapped =
  `${indent}<!-- RB_DASHBOARD_HOME_START -->\n` +
  `${indent}<div class="rb-dashboard-home-embed landing-page bento-page bento-page--home home-page home-page--light home-embed--light">\n` +
  indented +
  `\n${indent}</div>\n` +
  `${indent}<!-- RB_DASHBOARD_HOME_END -->`;

fs.mkdirSync(path.dirname(partialPath), { recursive: true });
fs.writeFileSync(partialPath, fragment, "utf8");

let index = fs.readFileSync(indexPath, "utf8");

const startTag = "<!-- RB_DASHBOARD_HOME_START -->";
const endTag = "<!-- RB_DASHBOARD_HOME_END -->";
const embedRe = new RegExp(
  `${startTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${endTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
);

if (index.includes(startTag)) {
  index = index.replace(embedRe, wrapped.trim());
  console.log("Updated existing dashboard home embed.");
} else {
  const markers = [
    'src="https://speedcdn.io/frontend_config/tiger/images/17627668338456002.webp" />\n' +
      "                        </div>\n" +
      "                      </div>\n" +
      "                      <!---->",
    'src="assets/images/casino-providers/17627668338456002.webp" />\n' +
      "                        </div>\n" +
      "                      </div>\n" +
      "                      <!---->",
  ];
  const marker = markers.find((m) => index.includes(m));
  if (!marker) {
    console.error("Casino provider end marker not found in index.html");
    process.exit(1);
  }
  index = index.replace(marker, marker + "\n" + wrapped);
  console.log("Inserted dashboard home embed after Casino Provider.");
}

/** Move embed out of casinoprovider-thumb-section if it was inserted inside. */
const relocate =
  /(<img[^>]*17627668338456002\.webp[^>]*\/>\s*<\/div>\s*)(<!-- RB_DASHBOARD_HOME_START -->[\s\S]*?<!-- RB_DASHBOARD_HOME_END -->)(\s*<!---->\s*\n\s*<\/div>)/;
if (relocate.test(index)) {
  index = index.replace(relocate, "$1$3\n$2");
  console.log("Relocated home embed below Casino Provider section.");
}

const cssLinks = [
  '<link href="assets/css/landing.css" rel="stylesheet" />',
  '<link href="assets/css/landing-footer.css" rel="stylesheet" />',
  '<link href="assets/css/landing-home-light.css" rel="stylesheet" />',
  '<link href="assets/css/home-sections.css" rel="stylesheet" />',
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

const titillium =
  '<link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap" rel="stylesheet" />';
if (!index.includes("Titillium+Web")) {
  index = index.replace("</head>", "  " + titillium + "\n</head>");
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
