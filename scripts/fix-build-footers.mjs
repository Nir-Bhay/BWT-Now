import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderLandingFooter } from "./landing-footer.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const landingPath = path.join(ROOT, "scripts/build-landing-pages.mjs");
let landing = fs.readFileSync(landingPath, "utf8");
landing = landing.replace(/function footerHtml\(\) \{[\s\S]*?\n\}\n\nfunction pageShell/, () => {
  return `function footerHtml() {\n  return renderLandingFooter();\n}\n\nfunction pageShell`;
});
landing = landing.replace(
  /const fh = footerHtml\(\)\.replace\([^)]+\);/,
  "const fh = footerHtml();"
);
if (!landing.includes("landing-footer.css")) {
  landing = landing.replace(
    '<link href="assets/css/landing-dark.css" rel="stylesheet" />',
    '<link href="assets/css/landing-dark.css" rel="stylesheet" />\n  <link href="assets/css/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />\n  <link href="assets/css/landing-footer.css" rel="stylesheet" />'
  );
}
fs.writeFileSync(landingPath, landing);

const bentoPath = path.join(ROOT, "scripts/build-bento-pages.mjs");
let bento = fs.readFileSync(bentoPath, "utf8");
bento = bento.replace(
  /import \{ renderLandingFooter \} from "\.\/landing-footer\.mjs";\nimport \{ renderLandingFooter \}/,
  'import { renderLandingFooter } from "./landing-footer.mjs";'
);
bento = bento.replace(
  /  <footer class="landing-footer">[\s\S]*?  <\/footer>\n  <script src="assets\/js\/landing-ui.js"/,
  `${renderLandingFooter()}\n  <script src="assets/js/landing-ui.js"`
);
fs.writeFileSync(bentoPath, bento);

console.log("Build scripts updated.");
