import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderLandingFooter } from "./landing-footer.mjs";
import { renderLandingFooter } from "./landing-footer.mjs";
import {
  AUTH_MODAL_HTML,
  AUTH_HEAD_LINKS,
  AUTH_FOOT_SCRIPTS,
  headerAuthButtonsHtml,
} from "./auth-modal-snippet.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MD_PATH = path.join(ROOT, "ReddyBook.md");
const IMG_BASE = "assets/images/pages";

/** Fix accidental <motion> placeholder tags in generated HTML */
function fixHtml(html) {
  return html.replace(/<motion\b/g, "<div").replace(/<\/motion>/g, "</div>");
}

const NAV = [
  { href: "home.html", label: "Home" },
  { href: "login.html", label: "Login" },
  { href: "register.html", label: "Register" },
  { href: "about-us.html", label: "About" },
  { href: "customer-care.html", label: "Support" },
  { href: "blogs.html", label: "Blogs" },
  { href: "categories.html", label: "Categories" },
];

const FOOTER_LINKS = [
  { href: "privacy-policy.html", label: "Privacy Policy" },
  { href: "terms-and-conditions.html", label: "Terms & Conditions" },
  { href: "responsible-gaming.html", label: "Responsible Gaming" },
  { href: "about-us.html", label: "About Us" },
  { href: "customer-care.html", label: "Customer Care" },
];

const PAGE_CONFIG = [
  {
    section: "Homepage",
    file: "home.html",
    active: "home.html",
    type: "design",
    imageDir: "home",
    hero: "Homepage Banner.webp",
    title: "ReddyBook | India's Most Trusted Online Cricket Betting Id Provider",
    metaDesc:
      "Searching for Online Betting Id? Get your Reddy Book Club cricket ID, login guide, sports betting, casino games, and 24/7 support.",
    slug: "/",
    h1: "What is ReddyBook? Complete Guide to Betting, Login & Registration",
  },
  {
    section: "Login",
    file: "login.html",
    active: "login.html",
    type: "design",
    imageDir: "login",
    hero: "Login Page Banner.webp",
    title: "Reddy Book Login | Access Your Reddy Book Club Cricket ID Safely",
    metaDesc:
      "Reddy Book login guide for existing users: access your Reddy Book Club account, cricket ID steps, mobile use, and safety tips.",
    slug: "/login",
    h1: "Reddy Book Login: Access Your Reddy Book Club Cricket ID Safely",
  },
  {
    section: "Register",
    file: "register.html",
    active: "register.html",
    type: "design",
    imageDir: "register",
    hero: "Register Page banner.webp",
    title: "Reddy Book Registration | Get Your Reddy Book Club Cricket ID",
    metaDesc:
      "Register on Reddy Book Club and get your cricket ID. Step-by-step registration, mobile access, and account safety tips.",
    slug: "/register",
    h1: "Reddy Book Registration: Get Your Reddy Book Club Cricket ID",
  },
  {
    section: "Privacy Policy",
    file: "privacy-policy.html",
    active: "privacy-policy.html",
    type: "legal",
    imageDir: "privacy-policy",
    hero: "Privacy Policy Main Banner - 1.webp",
    title: "Reddy Book Privacy Policy | Reddy Book Club",
    metaDesc: "How Reddy Book Club handles your information, data use, cookies, and user privacy.",
    slug: "/privacy-policy",
    h1: "Reddy Book Privacy Policy: How Reddy Book Club Handles Your Information",
  },
  {
    section: "Terms and Conditions",
    file: "terms-and-conditions.html",
    active: "terms-and-conditions.html",
    type: "legal",
    imageDir: "terms",
    hero: "T&C Main Banner - 1.webp",
    title: "Terms and Conditions | Reddy Book Club",
    metaDesc: "Reddy Book Club terms and conditions for account use, betting, payments, and platform rules.",
    slug: "/terms-and-conditions",
    h1: "Reddy Book Terms and Conditions for Reddy Book Club Users",
  },
  {
    section: "About Us",
    file: "about-us.html",
    active: "about-us.html",
    type: "basic",
    imageDir: "about-us",
    hero: "About Us Main Banner - 1.webp",
    title: "About Reddy Book Club | Your Cricket ID Platform",
    metaDesc:
      "Learn about Reddy Book Club, cricket ID access, sports and casino features, login support, and safer gaming.",
    slug: "/about-us",
    h1: "About Reddy Book Club: Your Reddy Book Cricket ID Platform",
  },
  {
    section: "Customer Care",
    file: "customer-care.html",
    active: "customer-care.html",
    type: "basic",
    imageDir: "customer-care",
    hero: "Customer Care Main Banner - 1.webp",
    title: "Customer Care | Reddy Book Club Support",
    metaDesc: "Contact Reddy Book Club customer care for login, registration, payments, and account help.",
    slug: "/customer-care",
    h1: "Reddy Book Customer Care: Support for Your Cricket ID Account",
  },
  {
    section: "Responsible Gaming",
    file: "responsible-gaming.html",
    active: "responsible-gaming.html",
    type: "basic",
    imageDir: "responsible-gaming",
    hero: "Responsible Gaming Main Banner - 1.webp",
    title: "Responsible Gaming | Reddy Book Club",
    metaDesc: "Reddy Book responsible gaming guidance for safer play, limits, warning signs, and support.",
    slug: "/responsible-gaming",
    h1: "Reddy Book Responsible Gaming: Play Safely with Reddy Book Club",
  },
];

const TOP_SECTIONS = PAGE_CONFIG.map((p) => p.section);

function splitMarkdownSections(md) {
  const map = {};
  const pattern = new RegExp(
    `^# (${TOP_SECTIONS.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\s*\\r?\\n`,
    "gm"
  );
  const indices = [];
  let m;
  while ((m = pattern.exec(md)) !== null) {
    indices.push({ name: m[1], start: m.index, bodyStart: m.index + m[0].length });
  }
  for (let i = 0; i < indices.length; i++) {
    const end = i + 1 < indices.length ? indices[i + 1].start : md.length;
    map[indices[i].name] = md.slice(indices[i].bodyStart, end).trim();
  }
  return map;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripMetaBlocks(text) {
  const lines = text.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^#\s*\*\*H1 Title\*\*/i.test(line)) continue;
    if (/^##\s*\*\*Meta Description\*\*/i.test(line)) {
      while (i + 1 < lines.length && !/^##?\s/.test(lines[i + 1])) i++;
      continue;
    }
    if (/^##\s*\*\*URL Slug\*\*/i.test(line)) {
      while (i + 1 < lines.length && !/^##?\s/.test(lines[i + 1]) && lines[i + 1] !== "---") i++;
      continue;
    }
    if (line.trim() === "---") continue;
    if (/^!\[/.test(line)) continue;
    // Skip duplicate page H1 block (single # line with title + intro on same line)
    if (/^#\s+\*\*/.test(line) && !/^##/.test(line)) continue;
    out.push(line);
  }
  return out.join("\n").trim();
}

function mdInline(s) {
  let t = escapeHtml(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  t = t.replace(/<strong><strong>/g, "<strong>").replace(/<\/strong><\/strong>/g, "</strong>");
  return t;
}

function markdownToHtml(md, options = {}) {
  const text = stripMetaBlocks(md);
  const lines = text.split("\n");
  let html = "";
  let inUl = false;
  let inOl = false;
  let faqMode = false;
  const faqItems = [];

  const closeLists = () => {
    if (inUl) {
      html += "</ul>\n";
      inUl = false;
    }
    if (inOl) {
      html += "</ol>\n";
      inOl = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (!line.trim()) {
      closeLists();
      continue;
    }

    if (/^#\s+/.test(line) && !/^##/.test(line)) {
      closeLists();
      const h1 = line.replace(/^#\s+/, "").replace(/\*\*/g, "");
      if (options.skipFirstH1 && html === "") continue;
      html += `<h2 class="page-title-alt">${mdInline(h1)}</h2>\n`;
      continue;
    }

    if (/^##\s+/.test(line)) {
      closeLists();
      const h2 = line.replace(/^##\s+/, "").replace(/\*\*/g, "");
      if (/^FAQ$/i.test(h2.trim()) || /^Faq$/i.test(h2.trim())) {
        faqMode = true;
        continue;
      }
      faqMode = false;
      html += `<h2>${mdInline(h2)}</h2>\n`;
      continue;
    }

    if (/^###\s+/.test(line)) {
      closeLists();
      const h3 = line.replace(/^###\s+/, "").replace(/\*\*/g, "");
      if (faqMode && /^\d+\./.test(h3) === false && h3.includes("?")) {
        const q = h3;
        let ans = "";
        i++;
        while (i < lines.length && lines[i].trim() && !/^#{1,3}\s/.test(lines[i])) {
          ans += (ans ? " " : "") + lines[i].trim();
          i++;
        }
        i--;
        faqItems.push({ q, a: ans });
        continue;
      }
      html += `<h3>${mdInline(h3)}</h3>\n`;
      continue;
    }

    if (/^####\s+/.test(line)) {
      closeLists();
      html += `<h4>${mdInline(line.replace(/^####\s+/, "").replace(/\*\*/g, ""))}</h4>\n`;
      continue;
    }

    if (/^\*\s+/.test(line) || /^-\s+/.test(line)) {
      if (!inUl) {
        closeLists();
        html += "<ul>\n";
        inUl = true;
      }
      html += `<li>${mdInline(line.replace(/^[\*\-]\s+/, ""))}</li>\n`;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      if (!inOl) {
        closeLists();
        html += "<ol>\n";
        inOl = true;
      }
      html += `<li>${mdInline(line.replace(/^\d+\.\s+/, ""))}</li>\n`;
      continue;
    }

    if (/^\*\*[^*]+\*\*:?\s*$/.test(line.trim())) {
      closeLists();
      html += `<p><strong>${mdInline(line.trim().replace(/\*\*/g, ""))}</strong></p>\n`;
      continue;
    }

    const stepMatch = line.match(/^\*\*Step (\d+):?\s*([^*]+)\*\*\s*$/i);
    if (stepMatch) {
      closeLists();
      html += `<h4>Step ${stepMatch[1]}: ${mdInline(stepMatch[2])}</h4>\n`;
      continue;
    }

    closeLists();
    html += `<p>${mdInline(line)}</p>\n`;
  }
  closeLists();

  if (faqItems.length) {
    html += '<motion class="landing-faq">\n';
    for (const { q, a } of faqItems) {
      html += `<details><summary>${mdInline(q)}</summary><motion class="faq-body"><p>${mdInline(a)}</p></motion></details>\n`;
    }
    html += "</motion>\n".replace(/<motion/g, "<motion").replace(/motion/g, "div");
  }

  html = html.replace(/<motion/g, "<div").replace(/<\/motion>/g, "</motion>");
  html = html.replace(/<div class="landing-faq">/g, '<motion class="landing-faq">'.replace("motion", "motion"));
  // fix faq wrapper
  html = html.replace(/<motion class="landing-faq">/g, '<motion class="landing-faq">');
  html = html.replace(/<motion/g, "<div").replace(/<\/motion>/g, "</div>");

  // FAQ numbered format **1\. Question**
  if (!faqItems.length && /Faq|FAQ/i.test(text)) {
    const faqHtml = buildFaqFromMd(text);
    if (faqHtml) html += faqHtml;
  }

  return html;
}

function buildFaqFromMd(text) {
  const re = /\*\*(\d+\\?\.[^*]+)\*\*\s*\n+([^*#][\s\S]*?)(?=\n\*\*\d+\\?\.|\n#|\n##|$)/g;
  let m;
  const items = [];
  const block = text.slice(text.search(/Faq|FAQ/i));
  const alt = block.match(/\*\*(\d+\\?\.[^*]+)\*\*/g);
  if (!alt) return "";
  const parts = block.split(/\*\*(\d+\\?\.[^*]+)\*\*/).filter(Boolean);
  for (let i = 1; i < parts.length; i += 2) {
    const q = parts[i].replace(/\\/g, "");
    const a = (parts[i + 1] || "").trim().split("\n")[0];
    if (q && a) items.push({ q, a });
  }
  if (!items.length) return "";
  let h = '<div class="landing-faq">\n';
  for (const { q, a } of items) {
    h += `<details><summary>${mdInline(q)}</summary><motion class="faq-body"><p>${mdInline(a)}</p></motion></details>\n`;
  }
  h += "</div>\n";
  return h.replace(/<motion/g, "<motion").replace(/motion/g, "motion").replace(/<motion/g, "<div").replace(/<\/motion>/g, "</motion>").replace(/<\/motion>/g, "</motion>");
}

function listImages(dir) {
  const full = path.join(ROOT, IMG_BASE, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => /\.(webp|png|jpg|jpeg)$/i.test(f));
}

function normalizeKey(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ");
}

function pickImageForHeading(heading, images, used) {
  const h = normalizeKey(heading);
  let best = null;
  let bestScore = 0;
  for (const img of images) {
    if (used.has(img)) continue;
    const k = normalizeKey(img.replace(/\.[^.]+$/, ""));
    const words = h.split(" ").filter((w) => w.length > 3);
    let score = 0;
    for (const w of words) {
      if (k.includes(w)) score += 2;
    }
    if (k.includes(h.slice(0, 20))) score += 3;
    if (score > bestScore) {
      bestScore = score;
      best = img;
    }
  }
  if (best && bestScore >= 2) {
    used.add(best);
    return best;
  }
  return null;
}

function buildDesignSections(md, imageDir, heroFile) {
  const images = listImages(imageDir).filter((f) => f !== heroFile);
  const used = new Set();
  const text = stripMetaBlocks(md);
  const chunks = [];
  const rawParts = text.split(/^##\s+/m);
  let preamble = rawParts[0] ? rawParts[0].trim() : "";
  preamble = preamble.replace(/^#\s+\*\*[^*]+\*\*\s*/m, "").trim();
  const sections = rawParts.slice(1);

  if (preamble.length > 40) {
    const introImg =
      pickImageForHeading("What is ReddyBook Complete Guide", images, used) ||
      pickImageForHeading("Introduction", images, used);
    chunks.push({ title: "Overview", body: preamble, image: introImg, isSection: true });
  }

  for (const sec of sections) {
    const nl = sec.indexOf("\n");
    let title = sec.slice(0, nl).replace(/\*\*/g, "").trim();
    if (/^Meta Description|^URL Slug|^H1 Title$/i.test(title)) continue;
    const body = sec.slice(nl + 1).trim();
    if (!body && title.length < 3) continue;
    const img = pickImageForHeading(title, images, used);
    chunks.push({ title, body: body || title, image: img, isSection: true });
  }

  // attach remaining images to chunks without images
  const unused = images.filter((i) => !used.has(i) && i !== heroFile);
  let ui = 0;
  for (const c of chunks) {
    if (!c.image && unused[ui]) {
      c.image = unused[ui++];
      used.add(c.image);
    }
  }

  let html = "";
  let flip = false;
  for (const chunk of chunks.slice(0, 14)) {
    const inner = chunk.isSection
      ? `<h2>${mdInline(chunk.title)}</h2>\n${markdownToHtml(chunk.body, { skipFirstH1: true })}`
      : markdownToHtml(chunk.body, { skipFirstH1: true });
    if (chunk.image) {
      const src = `${IMG_BASE}/${imageDir}/${encodeURIComponent(chunk.image)}`;
      html += `<section class="landing-section-card${flip ? " is-reverse" : ""}">
        <div class="landing-section-grid">
          <figure class="landing-section-media"><img src="${src}" alt="${escapeHtml(chunk.title)}" loading="lazy" width="480" height="520" /></figure>
          <div class="landing-section-body landing-prose">${inner}</div>
        </div>
      </section>\n`;
      flip = !flip;
    } else {
      html += `<section class="landing-content-card">${inner}</section>\n`;
    }
  }

  const rest = chunks.slice(12);
  if (rest.length) {
    html += '<section class="landing-content-card">';
    for (const c of rest) {
      html += markdownToHtml(c.body, { skipFirstH1: true });
    }
    html += "</section>";
  }

  return html;
}

function headerHtml(activeFile) {
  const navItems = NAV.map(
    (n) =>
      `<li><a href="${n.href}"${n.href === activeFile ? ' class="active"' : ""}>${n.label}</a></li>`
  ).join("\n        ");

  const subItems = [
    ...NAV,
    { href: "privacy-policy.html", label: "Privacy" },
    { href: "terms-and-conditions.html", label: "Terms" },
    { href: "responsible-gaming.html", label: "Responsible Gaming" },
  ]
    .map(
      (n) =>
        `<li><a href="${n.href}"${n.href === activeFile ? ' class="active"' : ""}>${n.label}</a></li>`
    )
    .join("\n      ");

  return `  <header class="landing-header">
    <motion class="container">
      <a href="home.html" class="logo"><img src="https://speedcdn.io/assets/logos/reddybook.live.png" alt="Reddy Book Club" /></a>
      <nav>
        <ul class="landing-nav">
        ${navItems}
        </ul>
      </nav>
      <div class="landing-header-actions">
        <a href="index.html" class="rules-btn">Bet Now</a>
        ${headerAuthButtonsHtml()}
      </div>
    </motion>
  </header>
  <nav class="landing-subnav" aria-label="Page sections">
    <motion class="container"><ul>
      ${subItems}
    </ul></motion>
  </nav>`.replace(/<motion/g, "<div").replace(/<\/motion>/g, "</div>");
}

function footerHtml() {
  const links = FOOTER_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("\n          ");
  const quick = NAV.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("\n          ");
  return `  <footer class="landing-footer">
    <motion class="container">
      <div class="landing-footer-grid">
        <motion>
          <h4>Reddy Book Club</h4>
          <p style="font-size:14px;margin:0;color:#aaa;">India's trusted cricket betting ID platform. Sports, casino, and live markets in one account.</p>
        </motion>
        <motion>
          <h4>Quick Links</h4>
          <ul>${quick}</ul>
        </motion>
        <motion>
          <h4>Legal</h4>
          <ul>${links}</ul>
        </motion>
        <motion>
          <h4>Account</h4>
          <ul>
            <li><a href="login.html">Login</a></li>
            <li><a href="register.html">Register</a></li>
            <li><a href="index.html">Betting Dashboard</a></li>
          </ul>
        </motion>
      </div>
      <div class="landing-footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Reddy Book Club. Play responsibly. 18+ only where legally permitted.</p>
      </motion>
    </motion>
  </footer>`.replace(/<motion/g, "<motion").replace(/motion/g, "motion").replace(/<motion/g, "<motion");
}

function pageShell({ title, metaDesc, active, heroSrc, h1, lead, bodyHtml, extraClass = "" }) {
  const fh = footerHtml().replace(/<motion/g, "<div").replace(/<\/motion>/g, "</div>");
  const hd = headerHtml(active).replace(/<motion/g, "<motion");

  const raw = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(metaDesc)}" />
  <link rel="shortcut icon" type="image/jpg" href="assets/favicon.ico" />
  <link href="https://fonts.gstatic.com" rel="preconnect" />
  <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap" rel="stylesheet" />
  <link href="assets/css/common_style.css" rel="stylesheet" />
  <link href="assets/css/landing.css" rel="stylesheet" />
  <link href="assets/css/landing-dark.css" rel="stylesheet" />${AUTH_HEAD_LINKS}
</head>
<body class="landing-page ${extraClass}">
  <div class="landing-disclaimer">18+ | Play Responsibly | This site is for entertainment where legally permitted</motion>
  ${headerHtml(active)}
  <section class="landing-hero">
    <img src="${heroSrc}" alt="${escapeHtml(h1)}" />
    <div class="landing-hero-overlay">
      <div class="container">
        <h1>${escapeHtml(h1)}</h1>
        ${lead ? `<p class="hero-lead">${escapeHtml(lead)}</p>` : ""}
        <motion class="landing-hero-cta">
          <a href="register.html" class="btn-cta btn-cta-primary">Get Cricket ID</a>
          <a href="login.html" class="btn-cta btn-cta-secondary">Login</a>
          <a href="index.html" class="btn-cta btn-cta-secondary">Go to Dashboard</a>
        </motion>
      </div>
    </div>
  </section>
  <div class="winners-ticker-wrap" aria-hidden="true">
    <div class="winners-ticker-row">
      <span class="winners-ticker-label">Live Wins</span>
      <div class="winners-ticker-viewport">
        <motion class="winners-ticker">
          <span><strong>Rahul M.</strong> won ₹42,500 on IPL</span>
          <span><strong>Priya S.</strong> won ₹18,200 on Live Casino</span>
          <span><strong>Amit K.</strong> won ₹95,000 on Cricket</span>
          <span><strong>Vikram D.</strong> won ₹31,400 on Football</span>
        </motion>
      </div>
    </div>
  </div>
  <main class="landing-main">
    ${bodyHtml}
    <section class="landing-cta-band">
      <h2>Ready to get started?</h2>
      <p>Register for your Reddy Book Club cricket ID or log in to access sports, casino, and live betting.</p>
      <div class="landing-hero-cta" style="justify-content:center;">
        <a href="register.html" class="btn-cta btn-cta-secondary">Register Now</a>
        <a href="customer-care.html" class="btn-cta btn-cta-secondary">Contact Support</a>
      </div>
    </section>
  </main>
  ${footerHtml()}
  <script src="assets/js/landing-ui.js" defer></script>${AUTH_FOOT_SCRIPTS}
${AUTH_MODAL_HTML}
</body>
</html>`;
  return fixHtml(raw);
}

function extractLead(md) {
  const raw = md.split("\n").find((l) => /^#\s+\*\*/.test(l)) || "";
  const inlineH1 = raw.match(/^#\s+\*\*([^*]+)\*\*\s+(.+)/);
  if (inlineH1 && inlineH1[2].length > 40) {
    return inlineH1[2].replace(/\*\*/g, "").trim().slice(0, 300);
  }
  const afterH1 = md.match(/^#\s+\*\*[^*]+\*\*\s+(.+?)(?:\n\n|\n##)/ms);
  if (afterH1) {
    return afterH1[1].replace(/\*\*/g, "").trim().slice(0, 300);
  }
  const t = stripMetaBlocks(md);
  const paras = t.split(/\n\n+/).filter((p) => p.trim() && !/^#/.test(p));
  for (const p of paras) {
    if (p.startsWith("##")) continue;
    const clean = p.replace(/\*\*/g, "").replace(/^#+\s*/, "").trim();
    if (clean.length > 80) return clean.slice(0, 300) + (clean.length > 300 ? "…" : "");
  }
  return "";
}

function buildFaqSection(md) {
  const faqMatch = md.match(/\*\*(\d+\\?\.[^*]+)\*\*/g);
  if (!faqMatch) {
    const sec = md.match(/##\s*\*?\*?FAQ\*?\*?[\s\S]*$/i);
    if (!sec) return "";
  }
  let html = '<section class="landing-content-card"><h2>Frequently Asked Questions</h2><div class="landing-faq">';
  const re = /\*\*(\d+\\?\.[^*?]+\??)\*\*\s*\n+([\s\S]*?)(?=\n\*\*\d+\\?\.|\n!|\s*$)/g;
  let m;
  while ((m = re.exec(md)) !== null) {
    const q = m[1].replace(/\\/g, "");
    const a = m[2].trim().split("\n").filter(Boolean).join(" ");
    if (a) html += `<details><summary>${mdInline(q)}</summary><motion class="faq-body"><p>${mdInline(a)}</p></motion></details>`;
  }
  html += "</div></section>";
  return html.replace(/<motion/g, "<motion").replace(/motion/g, "motion").replace(/<motion/g, "<div").replace(/<\/motion>/g, "</motion>").replace(/<\/motion>/g, "</div>");
}

// Main
const mdAll = fs.readFileSync(MD_PATH, "utf8");
const sections = splitMarkdownSections(mdAll);

for (const cfg of PAGE_CONFIG) {
  const CUSTOM_BENTO = new Set([
    "home.html",
    "about-us.html",
    "login.html",
    "register.html",
    "customer-care.html",
    "privacy-policy.html",
    "terms-and-conditions.html",
    "responsible-gaming.html",
  ]);
  if (CUSTOM_BENTO.has(cfg.file)) {
    console.log(`Skip ${cfg.file} (custom bento layout)`);
    continue;
  }
  const md = sections[cfg.section];
  if (!md) {
    console.warn("Missing section:", cfg.section);
    continue;
  }

  const heroSrc = `${IMG_BASE}/${cfg.imageDir}/${encodeURIComponent(cfg.hero)}`;
  const lead = extractLead(md);

  let bodyHtml = "";
  if (cfg.type === "design") {
    bodyHtml = `<div class="landing-features">
      <div class="landing-feature-box"><h3>Cricket ID</h3><p>Fast agent-based account access</p></div>
      <motion class="landing-feature-box"><h3>Live Betting</h3><p>Sports &amp; in-play markets</p></motion>
      <div class="landing-feature-box"><h3>24/7 Support</h3><p>Customer care when you need help</p></div>
      <div class="landing-feature-box"><h3>Secure Login</h3><p>Private cricket ID access</p></motion>
    </div>`.replace(/<motion/g, "<motion");
    bodyHtml = bodyHtml.replace(/<motion/g, "<div").replace(/<\/motion>/g, "</div>");
    bodyHtml += buildDesignSections(md, cfg.imageDir, cfg.hero);
    bodyHtml += buildFaqSection(md);
  } else {
    const secondary = listImages(cfg.imageDir).find((f) => f.includes("Banner - 2") || f.includes("Banner- 2"));
    bodyHtml = `<section class="landing-content-card landing-legal">${markdownToHtml(md, { skipFirstH1: true })}</section>`;
    if (secondary) {
      const src = `${IMG_BASE}/${cfg.imageDir}/${encodeURIComponent(secondary)}`;
      bodyHtml =
        `<section class="landing-split"><div class="landing-section-media"><img src="${src}" alt="" loading="lazy" /></div><div class="landing-section-body landing-prose">${markdownToHtml(md.split("\n").slice(0, 40).join("\n"), { skipFirstH1: true })}</div></section>` +
        `<section class="landing-content-card landing-legal">${markdownToHtml(md.split("\n").slice(40).join("\n"), { skipFirstH1: true })}</section>`;
    }
    bodyHtml += buildFaqSection(md);
  }

  const extraClass = cfg.type === "legal" ? "landing-legal-page" : "";
  const html = pageShell({
    title: cfg.title,
    metaDesc: cfg.metaDesc,
    active: cfg.active,
    heroSrc,
    h1: cfg.h1,
    lead,
    bodyHtml,
    extraClass,
  });

  const outPath = path.join(ROOT, cfg.file);
  fs.writeFileSync(outPath, html, "utf8");
  console.log("Wrote", cfg.file);
}

// Blogs & Categories
function simpleGridPage({ file, active, title, h1, metaDesc, items }) {
  const cards = items
    .map(
      (it) => `<article class="landing-grid-card">
      <div class="card-img">${escapeHtml(it.tag)}</motion>
      <div class="card-body"><h3>${escapeHtml(it.title)}</h3><p>${escapeHtml(it.desc)}</p><a href="${it.href}">Read more →</a></div>
    </article>`
    )
    .join("\n");

  const body = `<section class="landing-content-card">
    <p>${escapeHtml(metaDesc)}</p>
    <div class="landing-grid-cards">${cards.replace(/<\/motion>/g, "</motion>")}</div>
  </section>`;

  const hero = `${IMG_BASE}/home/Homepage Banner.webp`;
  const html = pageShell({ title, metaDesc, active, heroSrc: hero, h1, lead: metaDesc, bodyHtml: body });
  fs.writeFileSync(path.join(ROOT, file), html.replace(/<motion/g, "<motion").replace(/motion/g, "motion").replace(/<motion/g, "<div").replace(/<\/motion>/g, "</div>"), "utf8");
  console.log("Wrote", file);
}

simpleGridPage({
  file: "blogs.html",
  active: "blogs.html",
  title: "Reddy Book Blog | Tips, Guides & Updates",
  h1: "Reddy Book Club Blog",
  metaDesc: "Read guides on cricket IDs, login, registration, sports betting tips, and platform updates.",
  items: [
    { tag: "Guide", title: "How to Get a ReddyBook Cricket ID", desc: "Step-by-step agent registration and account setup.", href: "register.html" },
    { tag: "Login", title: "Reddy Book Login Troubleshooting", desc: "Fix common login issues safely.", href: "login.html" },
    { tag: "Payments", title: "Deposits & Withdrawals Explained", desc: "UPI, bank transfer, and agent-assisted payments.", href: "home.html" },
    { tag: "Safety", title: "Responsible Gaming Basics", desc: "Set limits and play within your budget.", href: "responsible-gaming.html" },
  ],
});

simpleGridPage({
  file: "categories.html",
  active: "categories.html",
  title: "Categories | Reddy Book Club",
  h1: "Browse Categories",
  metaDesc: "Explore cricket, football, casino, live betting, and account categories on Reddy Book Club.",
  items: [
    { tag: "Cricket", title: "Cricket Betting & IPL Markets", desc: "Cricket ID access and live match betting.", href: "index.html" },
    { tag: "Football", title: "Football & Global Leagues", desc: "Pre-match and live football markets.", href: "index.html" },
    { tag: "Casino", title: "Casino & Live Games", desc: "Slots, cards, and live casino sections.", href: "index.html" },
    { tag: "Account", title: "Login & Registration", desc: "Manage your cricket ID and account.", href: "login.html" },
  ],
});

console.log("Done.");
