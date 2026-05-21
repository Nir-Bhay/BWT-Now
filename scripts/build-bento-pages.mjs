#!/usr/bin/env node
/**
 * Generates bento-layout landing pages (login, register, support, legal).
 * Run: node scripts/build-bento-pages.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderLandingFooter } from "./landing-footer.mjs";
import { renderMarketingChrome } from "./marketing-chrome.mjs";
import { renderMarketingHeadMeta } from "./marketing-head.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const NAV = [
  { href: "home.html", label: "Home" },
  { href: "login.html", label: "Login" },
  { href: "register.html", label: "Register" },
  { href: "about-us.html", label: "About" },
  { href: "customer-care.html", label: "Support" },
  { href: "blogs.html", label: "Blogs" },
  { href: "categories.html", label: "Categories" },
];

const SUBNAV_EXTRA = [
  { href: "privacy-policy.html", label: "Privacy" },
  { href: "terms-and-conditions.html", label: "Terms" },
  { href: "responsible-gaming.html", label: "Responsible Gaming" },
];

function navLink(href, active) {
  return href === active ? ` class="active"` : "";
}

function renderShell(page) {
  const {
    file,
    active,
    title,
    description,
    theme,
    eyebrow,
    h1,
    lead,
    chips,
    actions,
    bento,
    cta,
    extraHead = "",
    bodyClass = "",
    fontUrl = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
    extraBody = "",
  } = page;

  const bClass = bodyClass || `landing-page bento-page bento-page--${theme} home-page--light`;
  const chrome = renderMarketingChrome(active);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  ${renderMarketingHeadMeta({ title, description })}
  <link href="https://fonts.gstatic.com" rel="preconnect" />
  <link href="${fontUrl}" rel="stylesheet" />
  <style>
    body, button, input, select, textarea {
      font-family: "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
    }
  </style>
  <link href="assets/css/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
  <link href="assets/css/common_style.css" rel="stylesheet" />
  <link href="assets/css/landing.css" rel="stylesheet" />
  <link href="assets/css/landing-footer.css" rel="stylesheet" />
  <link href="assets/css/landing-bento.css" rel="stylesheet" />
  <link href="assets/css/landing-home-light.css" rel="stylesheet" />
  <link href="assets/css/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
  <link href="assets/css/auth-modal.css" rel="stylesheet" />
  <link href="assets/css/landing-header.css" rel="stylesheet" />
  <link href="assets/css/landing-responsive.css" rel="stylesheet" />
  <link href="assets/css/marketing-images.css" rel="stylesheet" />
  ${extraHead}
  <link href="assets/css/marketing-mobile.css" rel="stylesheet" />
</head>
<body class="${bClass}">
${chrome}

  <section class="page-hero" aria-labelledby="page-hero-title">
    <div class="page-hero__bg" role="img" aria-label="${title}"></div>
    <div class="page-hero__glow" aria-hidden="true"></div>
    <div class="page-hero__inner">
      <p class="page-hero__eyebrow"><span class="pulse" aria-hidden="true"></span> ${eyebrow}</p>
      <h1 id="page-hero-title">${h1}</h1>
      <p class="page-hero__lead">${lead}</p>
      ${chips}
      <div class="page-hero__actions">${actions}</div>
    </div>
  </section>

  <div class="winners-ticker-wrap" aria-hidden="true">
    <div class="winners-ticker-row">
      <span class="winners-ticker-label">Live Wins</span>
      <div class="winners-ticker-viewport">
        <div class="winners-ticker">
          <span><strong>Rahul M.</strong> won ₹42,500 on IPL</span>
          <span><strong>Priya S.</strong> won ₹18,200 on Live Casino</span>
          <span><strong>Amit K.</strong> won ₹95,000 on Cricket</span>
          <span><strong>Vikram D.</strong> won ₹31,400 on Football</span>
        </div>
      </div>
    </div>
  </div>

  <main class="landing-main">
    <div class="bento-wrap">
      <div class="bento-grid">
${bento}
      </div>
    </div>

    <section class="landing-cta-band">
      <h2>${cta.title}</h2>
      <p>${cta.text}</p>
      <div class="landing-hero-cta" style="justify-content:center;">
        ${cta.buttons}
      </div>
    </section>
  </main>

  <footer class="landing-footer">
    <div class="landing-footer__glow" aria-hidden="true"></div>
    <div class="container">
      <div class="landing-footer__main">
        <div class="landing-footer__brand">
          <a href="home.html" class="landing-footer__logo">
            <img src="https://speedcdn.io/assets/logos/reddybook.live.png" alt="Reddy Book Club" width="168" height="42" loading="lazy" />
          </a>
          <p class="landing-footer__tagline">Cricket IDs, live sports markets, and casino play — onboarded through verified agents with fast login and round-the-clock support.</p>
          <div class="landing-footer__badges">
            <span class="landing-footer__badge"><i class="bi bi-shield-check" aria-hidden="true"></i> Verified agents</span>
            <span class="landing-footer__badge landing-footer__badge--accent">18+</span>
            <span class="landing-footer__badge"><i class="bi bi-lightning-charge" aria-hidden="true"></i> Live markets</span>
            <span class="landing-footer__badge"><i class="bi bi-headset" aria-hidden="true"></i> 24/7 care</span>
          </div>
          <div class="landing-footer__actions">
            <a href="register.html" class="btn-cta btn-cta-primary">Get Cricket ID</a>
            <a href="index.html" class="btn-ghost">Open dashboard →</a>
          </div>
        </div>
        <div class="landing-footer__nav">
          <div class="landing-footer__col">
            <h4 class="landing-footer__heading"><i class="bi bi-compass" aria-hidden="true"></i> Explore</h4>
            <ul>
              <li><a href="home.html">Home</a></li>
              <li><a href="login.html">Login</a></li>
              <li><a href="register.html">Register</a></li>
              <li><a href="about-us.html">About</a></li>
              <li><a href="customer-care.html">Support</a></li>
              <li><a href="blogs.html">Blogs</a></li>
              <li><a href="categories.html">Categories</a></li>
            </ul>
          </div>
          <div class="landing-footer__col">
            <h4 class="landing-footer__heading"><i class="bi bi-journal-text" aria-hidden="true"></i> Legal</h4>
            <ul>
              <li><a href="privacy-policy.html">Privacy Policy</a></li>
              <li><a href="terms-and-conditions.html">Terms & Conditions</a></li>
              <li><a href="responsible-gaming.html">Responsible Gaming</a></li>
              <li><a href="about-us.html">About Us</a></li>
              <li><a href="customer-care.html">Customer Care</a></li>
            </ul>
          </div>
          <div class="landing-footer__col">
            <h4 class="landing-footer__heading"><i class="bi bi-person-badge" aria-hidden="true"></i> Account</h4>
            <ul>
              <li><a href="login.html">Login</a></li>
              <li><a href="register.html">Register</a></li>
              <li><a href="index.html">Betting Dashboard</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="landing-footer-bottom">
        <p class="landing-footer__copy">&copy; 2026 Reddy Book Club. All rights reserved.</p>
        <nav class="landing-footer__legal-nav" aria-label="Footer legal">
          <a href="privacy-policy.html">Privacy</a>
          <a href="terms-and-conditions.html">Terms</a>
          <a href="responsible-gaming.html">Responsible gaming</a>
        </nav>
        <p class="landing-footer__disclaimer">Play responsibly · Entertainment only where legally permitted</p>
      </div>
    </div>
  </footer>
  <script src="assets/js/landing-ui.js" defer></script>
  ${extraBody}
</body>
</html>
`.replace(/<motion\.div/g, "<div").replace(/<\/motion\.motion.div>/g, "</div>").replace(/<motion\.div/g, "<div").replace(/<\/motion\.motion.div>/g, "</div>");
}

// Fix accidental motion tags in template
function fixMotion(html) {
  return html.replace(/<\/?motion\.div/g, (m) => m.replace("motion.", ""));
}

function chipsHtml(items) {
  return `<div class="page-hero__chips">
        ${items
      .map(
        (c) =>
          `<div class="page-hero__chip"><i class="bi bi-${c.icon}" aria-hidden="true"></i> <strong>${c.strong}</strong> ${c.text}</div>`
      )
      .join("\n        ")}
      </div>`;
}

const PAGES = [
  {
    file: "login.html",
    active: "login.html",
    theme: "login",
    title: "Reddy Book Login | Access Your Reddy Book Club Cricket ID Safely",
    description:
      "Reddy Book login guide for existing users: access your Reddy Book Club account, cricket ID steps, mobile use, and safety tips.",
    eyebrow: "Account access",
    h1: 'Log in to your <em>Cricket ID</em> safely',
    lead: "For existing Reddy Book Club users with a valid cricket ID. Use the official link, enter agent-provided credentials, and keep your account secure.",
    chips: chipsHtml([
      { icon: "shield-check", strong: "Official", text: "login route only" },
      { icon: "phone", strong: "Mobile", text: "&amp; browser access" },
      { icon: "headset", strong: "Support", text: "if login fails" },
    ]),
    actions: `<a href="index.html" class="btn-cta btn-cta-primary">Go to Dashboard</a>
        <a href="register.html" class="btn-cta btn-cta-neon">Get Cricket ID</a>
        <a href="customer-care.html" class="btn-ghost">Login help →</a>`,
    bento: `
        <article class="bento-card bento-intro bento-span-8">
          <p class="bento-card__tag">Overview</p>
          <h2>What is the Reddy Book login page?</h2>
          <p class="lead">The login page lets existing users reach their dashboard with a username or cricket ID and password — for sports, cricket markets, casino, and live betting where permitted.</p>
          <p>Before signing in: use the official route, enter details exactly as given, and use a private device on a secure connection. Never enter banking passwords, OTP, or UPI PIN on a login page.</p>
        </article>
        <article class="bento-card bento-highlight bento-span-4">
          <p class="bento-card__tag">Quick check</p>
          <h3>Before you log in</h3>
          <ul>
            <li>Official Reddy Book Club URL from your agent</li>
            <li>Correct username / cricket ID</li>
            <li>Private device &amp; secure network</li>
          </ul>
        </article>
        <article class="bento-card bento-visual bento-span-5">
          <div class="bento-visual__img" role="img" aria-label="Login steps"></div>
          <div class="bento-visual__body">
            <p class="bento-card__tag">Sign in</p>
            <h3>Five-step login</h3>
            <p>Open the login page, enter ID and password, click Login, reach your dashboard, then log out on shared devices.</p>
          </div>
        </article>
        <article class="bento-card bento-span-7">
          <p class="bento-card__tag">How to login</p>
          <h2>Login to Reddy Book Club</h2>
          <div class="bento-steps bento-steps--5">
            <div class="bento-step"><span class="bento-step__num">1</span><p>Open official login page or app link</p></div>
            <div class="bento-step"><span class="bento-step__num">2</span><p>Enter username or cricket ID (no extra spaces)</p></div>
            <div class="bento-step"><span class="bento-step__num">3</span><p>Enter password carefully</p></div>
            <div class="bento-step"><span class="bento-step__num">4</span><p>Click Login → dashboard</p></div>
            <div class="bento-step"><span class="bento-step__num">5</span><p>Log out after use on shared devices</p></div>
          </div>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">Users</p>
          <h3>New vs existing</h3>
          <p><strong>Existing:</strong> You have username, password, and access from support — use Login directly.</p>
          <p><strong>New:</strong> Use <a href="register.html" class="btn-ghost">Register</a> or Get Cricket ID first. Never buy IDs from unknown sellers.</p>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">Mobile</p>
          <h3>Login on mobile &amp; APK</h3>
          <p>Use the mobile browser with the same steps. For APK files, only install from verified Reddy Book Club sources — avoid random Telegram links.</p>
          <div class="bento-pills">
            <span class="bento-pill">Browser login</span>
            <span class="bento-pill">Remember me — personal devices only</span>
          </div>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">Security</p>
          <h3>Important reminders</h3>
          <ul>
            <li>Agent-provided credentials only</li>
            <li>Password reset via agent, not public forms</li>
            <li>Login URLs may change — use latest link</li>
            <li>Never save credentials on public PCs</li>
          </ul>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">Payments</p>
          <h3>Deposits &amp; withdrawals</h3>
          <p>After login, deposits and withdrawals are coordinated with your agent. Keep transaction IDs and screenshots for support.</p>
          <a href="customer-care.html" class="btn-ghost" style="display:inline-block;margin-top:8px;">Payment support →</a>
        </article>
        <article class="bento-card bento-faq bento-span-8">
          <div style="padding:18px 20px 8px;"><p class="bento-card__tag">FAQ</p><h2>Login questions</h2></div>
          <div class="landing-faq">
            <details><summary>Can I use email to log in?</summary><div class="faq-body"><p>Usually not — use the username or cricket ID from your agent.</p></div></details>
            <details><summary>Forgot my password?</summary><div class="faq-body"><p>Contact official customer care or your agent — avoid unofficial recovery links.</p></div></details>
            <details><summary>Login page not opening?</summary><div class="faq-body"><p>Check internet, try another browser, clear cache, or contact support for an updated link.</p></div></details>
          </div>
        </article>
        <article class="bento-card bento-cta-card bento-span-4">
          <p class="bento-card__tag">No ID yet?</p>
          <h3>Register for a cricket ID</h3>
          <p>New users need account access before they can log in.</p>
          <a href="register.html" class="btn-cta btn-cta-primary">Get Cricket ID</a>
        </article>`,
    cta: {
      title: "Ready to sign in?",
      text: "Use your agent-provided credentials on the official login route or open the betting dashboard.",
      buttons: `<a href="index.html" class="btn-cta btn-cta-primary">Betting Dashboard</a>
        <a href="customer-care.html" class="btn-cta btn-cta-secondary">Contact Support</a>`,
    },
  },
  {
    file: "register.html",
    active: "register.html",
    theme: "register",
    title: "Reddy Book Registration | Get Your Reddy Book Club Cricket ID",
    description:
      "Register on Reddy Book Club and get your cricket ID. Step-by-step registration, mobile access, and account safety tips.",
    eyebrow: "New accounts",
    h1: 'Get your <em>Cricket ID</em> today',
    lead: "Request a Reddy Book Club account for sports, cricket markets, and casino access — where legally permitted. Simple steps, mobile-friendly, with safety guidance built in.",
    chips: chipsHtml([
      { icon: "person-plus", strong: "Register", text: "or Get Cricket ID" },
      { icon: "phone", strong: "Mobile", text: "registration" },
      { icon: "shield-check", strong: "18+", text: "eligibility required" },
    ]),
    actions: `<a href="register.html" class="btn-cta btn-cta-primary">Get Cricket ID</a>
        <a href="login.html" class="btn-cta btn-cta-neon">Already have ID? Login</a>
        <a href="customer-care.html" class="btn-ghost">Registration help →</a>`,
    bento: `
        <article class="bento-card bento-intro bento-span-8">
          <p class="bento-card__tag">Registration</p>
          <h2>What is Reddy Book Club registration?</h2>
          <p class="lead">Registration is how new users request a cricket ID and login details for the Reddy Book Club dashboard — sports, cricket, casino, deposits, and support.</p>
          <p>This is online account access, not a local cricket club. Use only the official website and verified support channels.</p>
        </article>
        <article class="bento-card bento-highlight bento-span-4">
          <p class="bento-card__tag">Buttons</p>
          <h3>Register vs Get Cricket ID</h3>
          <p>Both start account setup on the official site. Neither guarantees profit — they only provide platform access.</p>
        </article>
        <article class="bento-card bento-visual bento-span-5">
          <div class="bento-visual__img" role="img" aria-label="Registration"></div>
          <div class="bento-visual__body">
            <p class="bento-card__tag">Start here</p>
            <h3>How to register</h3>
            <p>Click Register or Get Cricket ID, submit accurate details, confirm eligibility, receive credentials, then log in.</p>
          </div>
        </article>
        <article class="bento-card bento-span-7">
          <p class="bento-card__tag">Steps</p>
          <h2>Register on Reddy Book Club</h2>
          <div class="bento-steps bento-steps--5">
            <div class="bento-step"><span class="bento-step__num">1</span><p>Click Register or Get Cricket ID</p></div>
            <div class="bento-step"><span class="bento-step__num">2</span><p>Fill name, mobile, username</p></div>
            <div class="bento-step"><span class="bento-step__num">3</span><p>Confirm age &amp; eligibility</p></div>
            <div class="bento-step"><span class="bento-step__num">4</span><p>Receive ID &amp; password privately</p></div>
            <div class="bento-step"><span class="bento-step__num">5</span><p>Login and review account before deposit</p></div>
          </div>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">Details</p>
          <h3>What you may need</h3>
          <ul>
            <li>Name or preferred username</li>
            <li>Mobile or contact method</li>
            <li>Eligibility confirmation (18+ / 21+ as applicable)</li>
            <li>Payment later if you choose to deposit</li>
          </ul>
          <p>Never share banking passwords, UPI PIN, or OTPs during registration.</p>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">Mobile</p>
          <h3>Register on phone</h3>
          <p>Open the official site, tap Register, submit details, and keep your phone nearby for confirmation. Avoid public Wi‑Fi and shared devices.</p>
          <p>Only use APK files from verified sources — not random group links.</p>
        </article>
        <article class="bento-card bento-span-12">
          <p class="bento-card__tag">Why join</p>
          <h2>Why register with Reddy Book Club?</h2>
          <div class="bento-tiles bento-tiles--3">
            <div class="bento-tile"><i class="bi bi-speedometer2"></i><span>Fast setup</span><p>Start after ID is issued</p></div>
            <div class="bento-tile"><i class="bi bi-trophy"></i><span>Sports &amp; cricket</span><p>IPL, football, live markets</p></div>
            <div class="bento-tile"><i class="bi bi-suit-club"></i><span>Casino</span><p>Games where available</p></div>
            <div class="bento-tile"><i class="bi bi-gift"></i><span>Promotions</span><p>Cashback &amp; offers</p></div>
            <div class="bento-tile"><i class="bi bi-headset"></i><span>24/7 support</span><p>Customer care help</p></div>
            <div class="bento-tile"><i class="bi bi-exclamation-triangle"></i><span>Play responsibly</span><p>Verify agents &amp; limits</p></div>
          </div>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">Problems</p>
          <h3>Common registration issues</h3>
          <ul>
            <li>Form not submitting — check details &amp; connection</li>
            <li>No ID received — contact official support once</li>
            <li>Fake “winning ID” sellers — avoid completely</li>
          </ul>
        </article>
        <article class="bento-card bento-cta-card bento-span-6">
          <p class="bento-card__tag">Next step</p>
          <h3>Already registered?</h3>
          <p>Sign in with the credentials support sent you.</p>
          <a href="login.html" class="btn-cta btn-cta-neon">Go to Login</a>
          <a href="customer-care.html" class="btn-cta btn-cta-secondary" style="margin-top:8px;">Contact Support</a>
        </article>`,
    cta: {
      title: "Start your registration",
      text: "Get your Reddy Book Club cricket ID and explore sports, casino, and live markets.",
      buttons: `<a href="register.html" class="btn-cta btn-cta-primary">Get Cricket ID</a>
        <a href="login.html" class="btn-cta btn-cta-secondary">Login</a>`,
    },
  },
  {
    file: "customer-care.html",
    active: "customer-care.html",
    theme: "support",
    title: "Customer Care | Reddy Book Club Support",
    description:
      "Contact Reddy Book Club customer care for login, registration, payments, and account help.",
    eyebrow: "24/7 support",
    h1: 'Customer care for your <em>account</em>',
    lead: "Help with cricket ID, login, registration, deposits, withdrawals, mobile access, and account safety — through official Reddy Book Club channels only.",
    chips: chipsHtml([
      { icon: "chat-dots", strong: "Get Cricket ID", text: "button" },
      { icon: "credit-card", strong: "Payments", text: "help" },
      { icon: "shield-lock", strong: "Never share", text: "OTP or PIN" },
    ]),
    actions: `<a href="register.html" class="btn-cta btn-cta-primary">Get Cricket ID</a>
        <a href="login.html" class="btn-cta btn-cta-neon">Login Help</a>
        <a href="index.html" class="btn-ghost">Dashboard →</a>`,
    bento: `
        <article class="bento-card bento-intro bento-span-8">
          <p class="bento-card__tag">Support</p>
          <h2>How to contact customer care</h2>
          <p class="lead">Use the <strong>Get Cricket ID</strong> button or official support on this website. Avoid random phone numbers, Telegram groups, or social media “agents.”</p>
          <p>Real support solves problems — it never pressures quick deposits or asks for banking passwords.</p>
        </article>
        <article class="bento-card bento-highlight bento-span-4">
          <p class="bento-card__tag">We help with</p>
          <ul>
            <li>New cricket ID requests</li>
            <li>Login &amp; password issues</li>
            <li>Deposits &amp; withdrawals</li>
            <li>Mobile / APK questions</li>
          </ul>
        </article>
        <article class="bento-card bento-visual bento-span-5">
          <div class="bento-visual__img" role="img" aria-label="Customer support"></div>
          <div class="bento-visual__body">
            <p class="bento-card__tag">Before you call</p>
            <h3>Have these ready</h3>
            <p>Username, error screenshots, transaction ID, amount, date/time, and device type.</p>
          </div>
        </article>
        <article class="bento-card bento-span-7">
          <p class="bento-card__tag">Topics</p>
          <h2>What support can do</h2>
          <div class="bento-tiles">
            <div class="bento-tile"><i class="bi bi-person-badge"></i><span>Cricket ID</span><p>Setup &amp; access guidance</p></div>
            <div class="bento-tile"><i class="bi bi-box-arrow-in-right"></i><span>Login</span><p>Failed login troubleshooting</p></div>
            <div class="bento-tile"><i class="bi bi-pencil-square"></i><span>Register</span><p>Form &amp; ID delivery help</p></div>
            <div class="bento-tile"><i class="bi bi-wallet2"></i><span>Payments</span><p>Deposit &amp; withdrawal status</p></div>
          </div>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">Login issues</p>
          <h3>Common login fixes</h3>
          <ul>
            <li>Re-type username — check case &amp; spaces</li>
            <li>Refresh page or try another browser</li>
            <li>Use latest URL from support</li>
            <li>Account restricted? Contact care</li>
          </ul>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">Never share</p>
          <h3>Protect your account</h3>
          <ul>
            <li>Passwords &amp; OTPs</li>
            <li>UPI PIN &amp; bank login</li>
            <li>Full card PIN</li>
            <li>Wallet passwords</li>
          </ul>
        </article>
        <article class="bento-card bento-faq bento-span-8">
          <div style="padding:18px 20px 8px;"><p class="bento-card__tag">FAQ</p><h2>Support FAQ</h2></div>
          <div class="landing-faq">
            <details><summary>How fast are withdrawals?</summary><div class="faq-body"><p>Often hours to one day, depending on agent and payment method.</p></div></details>
            <details><summary>Deposit not credited?</summary><div class="faq-body"><p>Share UPI/bank reference and screenshot with support for verification.</p></div></details>
            <details><summary>Is WhatsApp support official?</summary><div class="faq-body"><p>Only use contacts linked from this official website — not random numbers.</p></div></details>
          </div>
        </article>
        <article class="bento-card bento-cta-card bento-span-4">
          <p class="bento-card__tag">Responsible play</p>
          <h3>Gaming limits &amp; safety</h3>
          <p>Read our responsible gaming guidance before you play.</p>
          <a href="responsible-gaming.html" class="btn-cta btn-cta-secondary">Responsible Gaming</a>
        </article>`,
    cta: {
      title: "Need help now?",
      text: "Contact official support for login, payments, or a new cricket ID.",
      buttons: `<a href="register.html" class="btn-cta btn-cta-primary">Get Cricket ID</a>
        <a href="login.html" class="btn-cta btn-cta-secondary">Login</a>`,
    },
  },
  {
    file: "privacy-policy.html",
    active: "privacy-policy.html",
    theme: "privacy",
    title: "Privacy Policy | Reddy Book Club",
    description:
      "Read the Reddy Book Privacy Policy to learn how Reddy Book Club may collect, use, protect, and manage your information.",
    bodyClass: "landing-page bento-page bento-page--privacy home-page home-page--light",
    fontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
    eyebrow: "Legal · Privacy",
    h1: 'How we handle your <em>information</em>',
    lead: "Last updated: 27 April 2026. This policy explains what data may be collected when you use Reddy Book Club — registration, login, payments, and support.",
    chips: chipsHtml([
      { icon: "file-earmark-lock", strong: "Your", text: "privacy matters" },
      { icon: "cookie", strong: "Cookies", text: "&amp; device data" },
      { icon: "person-check", strong: "18+", text: "only" },
    ]),
    actions: `<a href="terms-and-conditions.html" class="btn-cta btn-cta-secondary">Terms</a>
        <a href="responsible-gaming.html" class="btn-cta btn-cta-neon">Responsible Gaming</a>
        <a href="customer-care.html" class="btn-ghost">Contact support →</a>`,
    extraHead: `
  <link href="assets/css/landing-home-light.css" rel="stylesheet" />
  <link href="assets/css/home-sections.css" rel="stylesheet" />
  <style>
    body, button, input, select, textarea {
      font-family: "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
    }
    
    /* Layout styling for Split Reader */
    .bento-wrap {
      max-width: 1240px;
      padding-top: 40px;
    }
    
    .privacy-sidebar-card {
      padding: 0;
      background: transparent;
      border: none;
    }
    
    .privacy-sidebar-card::before {
      display: none;
    }
    
    .privacy-sidebar {
      position: sticky;
      top: 100px;
      max-height: calc(100vh - 140px);
      overflow-y: auto;
      padding: 24px;
      background: var(--rb-bg-card-solid, #ffffff);
      border-radius: 16px;
      border: 1px solid var(--rb-border);
      box-shadow: var(--rb-shadow-card);
    }
    
    /* Custom Scrollbar for Sidebar */
    .privacy-sidebar::-webkit-scrollbar {
      width: 6px;
    }
    .privacy-sidebar::-webkit-scrollbar-track {
      background: transparent;
    }
    .privacy-sidebar::-webkit-scrollbar-thumb {
      background: rgba(184, 134, 11, 0.2);
      border-radius: 100px;
    }
    .privacy-sidebar::-webkit-scrollbar-thumb:hover {
      background: rgba(184, 134, 11, 0.4);
    }
    
    .privacy-nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 12px;
    }
    
    .privacy-nav-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      color: var(--rb-text-muted);
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 500;
      border-left: 2px solid transparent;
      border-radius: 0 8px 8px 0;
      transition: all 0.2s ease;
    }
    
    .privacy-nav-link i {
      font-size: 16px;
      transition: transform 0.2s ease;
    }
    
    .privacy-nav-link:hover {
      color: var(--rb-maroon);
      background: rgba(184, 134, 11, 0.05);
      border-left-color: var(--rb-gold-dim);
      padding-left: 18px;
    }
    
    .privacy-nav-link:hover i {
      transform: translateX(2px);
    }
    
    .privacy-nav-link.active {
      color: #ffffff;
      background: linear-gradient(135deg, var(--rb-maroon) 0%, #b3243c 100%);
      border-left-color: var(--rb-gold);
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(155, 27, 48, 0.2);
    }
    
    /* Document Reader Card styling */
    .privacy-reader-card {
      padding: 0;
      background: var(--rb-bg-card-solid, #ffffff);
      border: 1px solid var(--rb-border);
      border-radius: 16px;
      box-shadow: var(--rb-shadow-card);
      overflow: hidden;
    }
    
    .privacy-reader-card::before {
      display: none; /* Hide top accent line to preserve custom visual layout */
    }
    
    .privacy-inline-banner-container {
      width: 100%;
      height: auto;
      border-bottom: 1px solid var(--rb-border);
      overflow: hidden;
      position: relative;
    }
    
    .privacy-inline-banner {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
      max-height: 240px;
      transition: transform 0.5s ease;
    }
    
    .privacy-reader-card:hover .privacy-inline-banner {
      transform: scale(1.02);
    }
    
    .privacy-sections {
      padding: 40px;
    }
    
    .privacy-section {
      padding-bottom: 32px;
      margin-bottom: 32px;
      border-bottom: 1px solid rgba(180, 140, 40, 0.12);
      scroll-margin-top: 120px; /* Offset for sticky header when scrolling */
    }
    
    .privacy-section:last-of-type {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }
    
    .privacy-section h2 {
      font-size: 1.5rem;
      color: var(--rb-text) !important;
      font-weight: 700;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .privacy-section p {
      font-size: 14.5px;
      line-height: 1.7;
      color: var(--rb-text-muted);
      margin-bottom: 16px;
    }
    
    .privacy-section strong {
      color: var(--rb-text) !important;
    }
    
    .custom-bento-list {
      list-style: none;
      padding-left: 0 !important;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .custom-bento-list li {
      position: relative;
      padding-left: 24px;
      font-size: 13.5px;
      color: var(--rb-text-muted);
      line-height: 1.5;
    }
    
    .custom-bento-list li::before {
      content: "➔";
      position: absolute;
      left: 0;
      color: var(--rb-gold);
      font-weight: bold;
    }
    
    /* General notice box styling */
    .privacy-notice-box {
      margin-top: 20px;
      padding: 16px;
      border-radius: 10px;
      font-size: 13.5px;
      line-height: 1.6;
    }
    
    .gold-notice {
      background: rgba(184, 134, 11, 0.05);
      border-left: 4px solid var(--rb-gold);
      color: var(--rb-text);
    }
    
    /* Data Collection 2x2 Grid Styling */
    .privacy-grid-2x2 {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin-top: 24px;
    }
    
    @media (min-width: 992px) {
      .privacy-grid-2x2 {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .privacy-grid-item {
      background: #faf8f5;
      border: 1px solid rgba(180, 140, 40, 0.15);
      border-radius: 12px;
      padding: 20px;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .privacy-grid-item:hover {
      border-color: var(--rb-gold);
      box-shadow: 0 6px 16px rgba(184, 134, 11, 0.05);
      transform: translateY(-2px);
    }
    
    .grid-item-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    
    .grid-item-header i {
      font-size: 24px;
      color: var(--rb-gold);
    }
    
    .grid-item-header h3 {
      font-size: 16px;
      font-weight: 700;
      color: var(--rb-text) !important;
      margin: 0;
    }
    
    .privacy-grid-item p {
      font-size: 13.5px;
      margin-bottom: 12px;
    }
    
    .privacy-grid-item ul {
      padding-left: 0;
      list-style: none;
      margin-bottom: 12px;
      flex-grow: 1;
    }
    
    .privacy-grid-item li {
      position: relative;
      padding-left: 18px;
      font-size: 12.5px;
      color: var(--rb-text-muted);
      margin-bottom: 6px;
      line-height: 1.5;
    }
    
    .privacy-grid-item li::before {
      content: "•";
      position: absolute;
      left: 6px;
      color: var(--rb-gold);
      font-weight: bold;
    }
    
    .grid-item-note {
      font-size: 12px;
      background: rgba(184, 134, 11, 0.06);
      border-left: 3px solid var(--rb-gold);
      padding: 10px;
      border-radius: 4px;
      color: var(--rb-text);
      line-height: 1.4;
      margin-top: auto;
    }
    
    .grid-item-warning {
      font-size: 12px;
      background: rgba(155, 27, 48, 0.06);
      border-left: 3px solid var(--rb-maroon);
      padding: 10px;
      border-radius: 4px;
      color: var(--rb-maroon);
      line-height: 1.4;
      margin-top: auto;
    }
    
    .grid-item-footer {
      font-size: 12px;
      font-style: italic;
      color: var(--rb-text-muted);
      margin: auto 0 0 0 !important;
      padding-top: 8px;
      border-top: 1px dashed rgba(180, 140, 40, 0.15);
    }
    
    /* Financial Privacy Alert Box */
    .privacy-warning-box {
      background: rgba(155, 27, 48, 0.03);
      border: 1px solid rgba(155, 27, 48, 0.16);
      border-left: 4px solid var(--rb-maroon);
      border-radius: 12px;
      padding: 24px;
      margin: 20px 0;
    }
    
    .warning-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .warning-header i {
      font-size: 24px;
      color: var(--rb-maroon);
    }
    
    .warning-header h3 {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: var(--rb-maroon) !important;
      margin: 0;
    }
    
    .warning-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      margin: 16px 0;
    }
    
    @media (min-width: 576px) {
      .warning-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .warning-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 700;
      color: var(--rb-text);
      background: #ffffff;
      padding: 10px 14px;
      border-radius: 8px;
      border: 1px solid rgba(155, 27, 48, 0.08);
      box-shadow: 0 2px 6px rgba(155, 27, 48, 0.02);
    }
    
    .warning-item i {
      color: var(--rb-maroon);
    }
    
    .warning-footer {
      border-top: 1px dashed rgba(155, 27, 48, 0.15);
      padding-top: 14px;
      margin-top: 14px;
    }
    
    .warning-footer p {
      font-size: 12.5px;
      line-height: 1.5;
      color: var(--rb-maroon);
      margin: 0;
      font-weight: 500;
      display: flex;
      gap: 8px;
    }
    
    .warning-footer i {
      font-size: 16px;
      flex-shrink: 0;
    }
    
    /* Brand Clarification Chips */
    .brand-clarification-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 16px 0;
    }
    
    .brand-chip {
      background: #faf8f5;
      border: 1px solid rgba(180, 140, 40, 0.18);
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 13px;
      color: var(--rb-text-muted);
      transition: all 0.2s ease;
    }
    
    .brand-chip.font-bold {
      font-weight: 700;
      color: var(--rb-text);
      border-color: var(--rb-gold-dim);
      background: rgba(184, 134, 11, 0.03);
    }
    
    .brand-chip:hover {
      border-color: var(--rb-gold);
      background: #ffffff;
      color: var(--rb-maroon);
      transform: translateY(-1px);
    }
    
    /* FAQ Accordion Styling inside Reader Card */
    .privacy-section .landing-faq {
      margin-top: 16px;
      border-top: 1px solid rgba(180, 140, 40, 0.12);
      padding-top: 8px;
    }
    
    .privacy-section .landing-faq details {
      border-bottom: 1px solid rgba(180, 140, 40, 0.1);
      margin: 0;
    }
    
    .privacy-section .landing-faq details:last-of-type {
      border-bottom: none;
    }
    
    .privacy-section .landing-faq summary {
      padding: 18px 0;
      font-size: 15px;
      font-weight: 600;
      color: var(--rb-text);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      list-style: none;
      transition: color 0.2s ease;
    }
    
    .privacy-section .landing-faq summary::-webkit-details-marker {
      display: none;
    }
    
    .privacy-section .landing-faq summary::after {
      content: "+";
      font-size: 20px;
      color: var(--rb-gold);
      font-weight: 400;
      transition: transform 0.2s ease;
    }
    
    .privacy-section .landing-faq details[open] summary {
      color: var(--rb-maroon);
    }
    
    .privacy-section .landing-faq details[open] summary::after {
      content: "−";
      transform: rotate(180deg);
    }
    
    .privacy-section .landing-faq .faq-body {
      padding: 0 0 18px 0;
    }
    
    .privacy-section .landing-faq .faq-body p {
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
      color: var(--rb-text-muted);
    }
    
    /* Conclusion Summary Card inside Reader */
    .privacy-conclusion-card {
      background: linear-gradient(135deg, rgba(184, 134, 11, 0.03) 0%, rgba(155, 27, 48, 0.02) 100%);
      border: 1px solid rgba(180, 140, 40, 0.2);
      border-radius: 12px;
      padding: 28px;
      margin-top: 8px;
    }
    
    .privacy-conclusion-card h2 {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--rb-text);
      margin-bottom: 12px;
    }
    
    .privacy-conclusion-card p {
      font-size: 14px;
      line-height: 1.65;
      color: var(--rb-text-muted);
      margin-bottom: 12px;
    }
    
    .privacy-conclusion-card p:last-of-type {
      margin-bottom: 0;
    }
  </style>
`,
    bento: `
        <!-- Right Content Reader -->
        <article class="bento-card privacy-reader-card bento-span-12">
          <div class="privacy-inline-banner-container">
            <img src="assets/images/pages/privacy-policy/banner-2.webp" class="privacy-inline-banner" alt="Privacy Policy Details" />
          </div>

          <div class="privacy-sections">
            <section id="section-about" class="privacy-section">
              <p class="bento-card__tag">Legal Framework</p>
              <h2>About This Privacy Policy</h2>
              <p class="lead">Your privacy matters. Whether you are a new user clicking Get Cricket ID, an existing user using the Login button, or someone contacting support for help, you should understand what information may be required and how it may be used.</p>
              <p>This page is written in simple language so users can understand the main points before using Reddy Book Club. By using the website, submitting information, requesting account access, contacting support, or continuing to use your account, you agree to the handling of information as explained in this Privacy Policy.</p>
              <p>This Privacy Policy applies to the Reddy Book Club website, login page, registration page, customer care page, responsible gaming page, mobile access pages, account support channels, and any related services connected with Reddy Book Club.</p>
              <p><strong>It explains:</strong></p>
              <ul class="custom-bento-list">
                <li>What information may be collected</li>
                <li>Why information may be collected</li>
                <li>How account and cricket ID details may be used</li>
                <li>How payment and transaction information may be handled</li>
                <li>How support messages may be stored or reviewed</li>
                <li>How cookies or device information may be used</li>
                <li>How information may be shared with support or service providers</li>
                <li>How users can ask questions about their data</li>
              </ul>
              <p>This Privacy Policy should be read together with our <a href="terms-and-conditions.html">Terms and Conditions</a>, <a href="responsible-gaming.html">Responsible Gaming</a> page, and <a href="customer-care.html">Customer Care</a> page.</p>
              
              <!-- Access Restriction Highlight -->
              <div class="privacy-notice-box gold-notice">
                <strong>Important Notice:</strong> Reddy Book Club is intended only for eligible adults where access is legally permitted. If you do not agree with this Privacy Policy, you should not use the website, request a cricket ID, log in, or submit personal information.
              </div>
            </section>

            <section id="section-collect" class="privacy-section">
              <p class="bento-card__tag">Data Collection</p>
              <h2>Information We May Collect</h2>
              <p>Reddy Book Club may collect different types of information depending on how you use the website. We organize this data into four primary categories:</p>
              
              <div class="privacy-grid-2x2">
                <div class="privacy-grid-item">
                  <div class="grid-item-header">
                    <i class="bi bi-person-badge-fill text-gold"></i>
                    <h3>Account &amp; Registration</h3>
                  </div>
                  <p>When you click Register or Get Cricket ID, you may be asked to provide basic details so account access can be created or reviewed.</p>
                  <ul>
                    <li>Name or preferred alias</li>
                    <li>Mobile number &amp; contact info</li>
                    <li>Preferred username / account ID</li>
                    <li>Age or eligibility confirmation</li>
                    <li>Location-related verification where needed</li>
                  </ul>
                  <div class="grid-item-note">
                    <strong>Accuracy Notice:</strong> Provide correct details. Fake info may delay registration, account recovery, or payment support.
                  </div>
                </div>

                <div class="privacy-grid-item">
                  <div class="grid-item-header">
                    <i class="bi bi-shield-lock-fill text-gold"></i>
                    <h3>Login &amp; Account Access</h3>
                  </div>
                  <p>When you use the Reddy Book login page, we process operational details connected to your account access.</p>
                  <ul>
                    <li>Username or cricket ID</li>
                    <li>Login timestamps &amp; frequency</li>
                    <li>Device specs &amp; browser version</li>
                    <li>IP address or approximate location</li>
                    <li>Failed login attempts &amp; security logs</li>
                  </ul>
                  <p class="grid-item-footer">This operational data protects your account and identifies login problems.</p>
                </div>

                <div class="privacy-grid-item">
                  <div class="grid-item-header">
                    <i class="bi bi-wallet2 text-gold"></i>
                    <h3>Payment &amp; Transaction</h3>
                  </div>
                  <p>If you make deposit or withdrawal requests, transaction-related details may be collected or reviewed.</p>
                  <ul>
                    <li>Deposit and withdrawal amounts</li>
                    <li>Chosen payment method</li>
                    <li>UPI reference or transaction ID</li>
                    <li>Bank transfer refs &amp; screenshots</li>
                    <li>Time and date of transaction</li>
                  </ul>
                  <div class="grid-item-warning">
                    <strong>IMPORTANT:</strong> Reddy Book Club never asks for bank passwords, UPI PINs, OTPs, or card PINs.
                  </div>
                </div>

                <div class="privacy-grid-item">
                  <div class="grid-item-header">
                    <i class="bi bi-chat-right-text-fill text-gold"></i>
                    <h3>Customer Care</h3>
                  </div>
                  <p>When you contact customer care, we process the information you choose to share with us.</p>
                  <ul>
                    <li>Cricket ID &amp; username</li>
                    <li>Contact number or support ID</li>
                    <li>Detailed description of the issue</li>
                    <li>Screenshots of errors or system messages</li>
                    <li>Chat transcripts &amp; support history</li>
                  </ul>
                  <p class="grid-item-footer">This information helps resolve your issues, prevent fraud, and maintain service quality.</p>
                </div>
              </div>
            </section>

            <section id="section-usage" class="privacy-section">
              <p class="bento-card__tag">Utility</p>
              <h2>How We Use Your Information</h2>
              <p>Reddy Book Club may use collected information for practical account, support, security, and service purposes. We may use information to:</p>
              <ul class="custom-bento-list">
                <li>Create or process cricket ID requests</li>
                <li>Help users register or access their account</li>
                <li>Support Reddy Book login activity</li>
                <li>Confirm account ownership</li>
                <li>Review payment and withdrawal issues</li>
                <li>Respond to customer care questions</li>
                <li>Investigate suspicious activity</li>
                <li>Protect users from fake links or account misuse</li>
                <li>Improve website performance</li>
                <li>Maintain transaction records</li>
                <li>Apply responsible gaming support where requested</li>
                <li>Follow legal, regulatory, security, or compliance requirements</li>
              </ul>
              <div class="privacy-notice-box gold-notice">
                <strong>Sports &amp; Casino Outcomes Notice:</strong> We do not use your information to guarantee betting results, influence game outcomes, or provide fixed match tips. Sports and casino outcomes involve risk and cannot be guaranteed.
              </div>
            </section>

            <section id="section-cricket-id" class="privacy-section">
              <p class="bento-card__tag">Account Security</p>
              <h2>Cricket ID and Account Data</h2>
              <p>Your Reddy Book Club cricket ID is part of your account access. It may connect your username, password, support history, account activity, payments, and available platform features.</p>
              <p>You are responsible for keeping your cricket ID and password private. If you share your login details with another person, that person may be able to access your account, view your information, or take actions through your account.</p>
              <p><strong>Do not share your cricket ID</strong> in public groups, comments, social media pages, or unknown support chats.</p>
              <p>If you believe your account has been accessed without permission, contact customer care through the official Reddy Book Club support route as soon as possible.</p>
            </section>

            <section id="section-financial" class="privacy-section">
              <p class="bento-card__tag">Financial Privacy</p>
              <h2>Payment Information and Financial Privacy</h2>
              <p>Payment-related information may be used to confirm deposits, process withdrawals, resolve disputes, check transaction status, and protect against fraud.</p>
              <p>Because deposits and withdrawals may involve payment providers, banks, wallets, UPI, or support-assisted instructions, some transaction information may need to be reviewed manually.</p>
              <p>You should keep payment records private and share only what is necessary to solve your issue.</p>
              
              <div class="privacy-warning-box">
                <div class="warning-header">
                  <i class="bi bi-exclamation-octagon-fill"></i>
                  <h3>CRITICAL SECURITY ALERT: DO NOT SHARE</h3>
                </div>
                <p>To protect your funds and personal security, Reddy Book Club, its staff, and official agents will <strong>NEVER</strong> ask you to share:</p>
                <div class="warning-grid">
                  <div class="warning-item"><i class="bi bi-x-circle-fill"></i> UPI PIN</div>
                  <div class="warning-item"><i class="bi bi-x-circle-fill"></i> OTP (One-Time Password)</div>
                  <div class="warning-item"><i class="bi bi-x-circle-fill"></i> Bank Login Password</div>
                  <div class="warning-item"><i class="bi bi-x-circle-fill"></i> Wallet Password</div>
                  <div class="warning-item"><i class="bi bi-x-circle-fill"></i> ATM/Card PIN</div>
                  <div class="warning-item"><i class="bi bi-x-circle-fill"></i> Full Card Details (CVV)</div>
                </div>
                <div class="warning-footer">
                  <p><i class="bi bi-shield-shaded"></i> If someone claiming to be support requests any of these credentials, stop immediately, block the sender, and report the incident via the official website support channel.</p>
                </div>
              </div>
            </section>

            <section id="section-kyc" class="privacy-section">
              <p class="bento-card__tag">KYC / Compliance</p>
              <h2>Verification and KYC Information</h2>
              <p>Reddy Book Club may request verification information where needed to confirm account ownership, age, eligibility, payment details, fraud prevention, or withdrawal requests.</p>
              <p>Verification may include basic identity details, contact confirmation, payment ownership confirmation, or other reasonable checks.</p>
              <p>The exact information required may depend on your account issue, local requirements, payment method, and platform rules.</p>
              <p>If you do not provide required verification information, account access, deposits, withdrawals, or support requests may be delayed, limited, or declined.</p>
              <p>Any verification request should be handled through official support only. Do not send sensitive documents or details to unknown contacts.</p>
            </section>

            <section id="section-cookies" class="privacy-section">
              <p class="bento-card__tag">Browser Technologies</p>
              <h2>Cookies, Browser Data, &amp; Device Information</h2>
              <p>Reddy Book Club may use cookies or similar technologies to support website functionality, security, performance, and user experience.</p>
              <p>Cookies may help with:</p>
              <ul class="custom-bento-list">
                <li>Keeping the website working properly</li>
                <li>Remembering basic preferences</li>
                <li>Improving page speed and layout</li>
                <li>Detecting technical errors</li>
                <li>Supporting account security</li>
                <li>Understanding how users move through the website</li>
              </ul>
              <p>We may also collect basic device or browser information such as device type, browser version, operating system, IP address, page visit time, and referral source.</p>
              <p>You can manage cookies through your browser settings. If you block cookies, some parts of the website may not work correctly.</p>
            </section>

            <section id="section-mobile" class="privacy-section">
              <p class="bento-card__tag">Mobile Security</p>
              <h2>Mobile Access and APK Privacy</h2>
              <p>Many users access Reddy Book Club through mobile browsers. Some users may also search for terms such as <strong>reddy book club apk</strong>, <strong>reddybook.club apk</strong>, or mobile app access.</p>
              <p>If you use mobile access, device-related information may be processed for login, security, troubleshooting, or performance purposes.</p>
              <p>Be careful with APK files. Only use APK access if it is provided through a verified Reddy Book Club source. Fake APK files can collect passwords, payment details, contact data, device information, or other sensitive information without your permission.</p>
              <p>Reddy Book Club is not responsible for privacy or security issues caused by third-party clone apps, fake APKs, copied login pages, or links from unknown sources.</p>
              <p>For many users, mobile browser access may be safer than installing unverified files.</p>
            </section>

            <section id="section-sharing" class="privacy-section">
              <p class="bento-card__tag">Data Sharing</p>
              <h2>How We Share Information</h2>
              <p>Reddy Book Club may share limited information where needed to operate the website, process support requests, review payments, maintain account security, or comply with applicable rules.</p>
              <p>Information may be shared with:</p>
              <ul class="custom-bento-list">
                <li>Customer care or account support teams</li>
                <li>Payment support providers or intermediaries</li>
                <li>Technical service providers</li>
                <li>Security and fraud-prevention teams</li>
                <li>Legal, regulatory, or compliance authorities where required</li>
                <li>Professional advisers where necessary</li>
              </ul>
              <p>We aim to share only the information needed for the relevant purpose. We do not sell your login details. We do not ask users to share private banking passwords, OTPs, UPI PINs, or wallet passwords.</p>
            </section>

            <section id="section-third-party" class="privacy-section">
              <p class="bento-card__tag">Brand Clarification</p>
              <h2>Third-Party Links &amp; Similar Websites</h2>
              <p>Users may come across similar names online, including:</p>
              <div class="brand-clarification-chips">
                <span class="brand-chip">reddy book club</span>
                <span class="brand-chip">reddybook club</span>
                <span class="brand-chip">reddy anna club</span>
                <span class="brand-chip font-bold">reddy anna book club</span>
                <span class="brand-chip">reddyanna</span>
                <span class="brand-chip">book777</span>
                <span class="brand-chip font-bold">raddybook</span>
                <span class="brand-chip">reddy anna login</span>
                <span class="brand-chip">reddy kings login</span>
                <span class="brand-chip font-bold">www.reddy book.com</span>
              </div>
              <p style="margin-top: 16px;">Similar names do not always mean the same website. Some pages may be unrelated, outdated, copied, or unsafe.</p>
              <p>This Privacy Policy applies only to Reddy Book Club and its official website pages. If you click third-party links, download outside APKs, contact unknown agents, or enter details on fake pages, their privacy practices are not controlled by Reddy Book Club.</p>
              <p>Before entering personal or payment information, always check that you are using the official Reddy Book Club website or verified support route.</p>
            </section>

            <section id="section-security" class="privacy-section">
              <p class="bento-card__tag">Data Protection</p>
              <h2>Data Security</h2>
              <p>Reddy Book Club aims to use reasonable steps to protect user information from unauthorised access, misuse, loss, alteration, or disclosure. Security measures may include account checks, login monitoring, support review, restricted access to user information, and transaction verification.</p>
              <p>However, no website, app, payment method, or online system can be completely risk-free. Users also play an important role in keeping accounts safe. You can protect your data by:</p>
              <ul class="custom-bento-list">
                <li>Using a strong password</li>
                <li>Keeping your cricket ID private</li>
                <li>Avoiding shared devices</li>
                <li>Logging out after use</li>
                <li>Not saving passwords on public computers</li>
                <li>Avoiding fake APKs</li>
                <li>Using only official website links</li>
                <li>Not sharing OTPs or payment PINs</li>
                <li>Reporting suspicious activity quickly</li>
              </ul>
              <p>If you suspect your account or data has been exposed, contact customer care immediately.</p>
            </section>

            <section id="section-retention" class="privacy-section">
              <p class="bento-card__tag">Data Lifecycle</p>
              <h2>Data Retention</h2>
              <p>Reddy Book Club may keep user information for as long as needed for account access, support, transaction records, dispute resolution, security checks, legal compliance, responsible gaming purposes, and business operations.</p>
              <p>Some information may need to be retained even after an account becomes inactive, especially where it relates to payments, fraud prevention, legal obligations, account disputes, or responsible gaming concerns.</p>
              <p>When information is no longer required, it may be deleted, anonymised, archived, or securely restricted according to internal processes and applicable requirements.</p>
            </section>

            <section id="section-rights" class="privacy-section">
              <p class="bento-card__tag">Privacy Rights</p>
              <h2>Your Choices &amp; Privacy Rights</h2>
              <p>Depending on applicable law and your location, you may have rights related to your personal information. These may include the ability to:</p>
              <ul class="custom-bento-list">
                <li>Ask what information is held about you</li>
                <li>Request correction of inaccurate details</li>
                <li>Ask for certain information to be updated</li>
                <li>Withdraw consent where consent-based processing applies</li>
                <li>Ask questions about how your information is used</li>
                <li>Raise a complaint about privacy handling</li>
                <li>Request account-related assistance through customer care</li>
              </ul>
              <p>Some requests may require identity or account verification before action can be taken. This helps prevent another person from accessing or changing your information without permission.</p>
              <p>Certain requests may not be accepted if information must be kept for legal, security, fraud-prevention, payment, or dispute-resolution reasons. To make a privacy-related request, contact customer care through the official support route shown on the website.</p>
            </section>

            <section id="section-underage" class="privacy-section">
              <p class="bento-card__tag">Underage Users</p>
              <h2>Children &amp; Underage Users</h2>
              <p>Reddy Book Club is not intended for children or underage users.</p>
              <p>Users must meet the legal age requirement that applies in their location. This may be 18+ or 21+, depending on applicable rules.</p>
              <p>Underage users must not register, request a cricket ID, log in, deposit, withdraw, or use any sports or casino feature.</p>
              <p>Parents or guardians should protect children by keeping payment apps, passwords, login details, and devices secure. If you believe an underage person has used Reddy Book Club, contact customer care through the official website support route.</p>
            </section>

            <section id="section-responsible" class="privacy-section">
              <p class="bento-card__tag">Responsible Play</p>
              <h2>Responsible Gaming &amp; Privacy</h2>
              <p>Privacy and responsible gaming are connected. If a user contacts support about gaming limits, account breaks, harmful play, or loss of control, support-related information may be used to help respond to the concern.</p>
              <p>Responsible gaming information may be handled carefully and used only for account support, safety, and compliance purposes where relevant.</p>
              <p>Reddy Book Club encourages users to play only for entertainment, set limits, avoid chasing losses, and stop if gaming affects finances, sleep, mood, work, studies, or relationships.</p>
              <p>If you feel gaming is becoming difficult to control, contact support, take a break, and speak to someone you trust.</p>
            </section>

            <section id="section-marketing" class="privacy-section">
              <p class="bento-card__tag">Communications</p>
              <h2>Marketing &amp; Communication</h2>
              <p>Reddy Book Club may use contact information to send account-related updates, support replies, service notices, payment updates, registration guidance, or platform information.</p>
              <p>Where promotional messages are used, they should not be misleading or promise guaranteed results. Users should not receive messages claiming fixed matches, sure wins, guaranteed profits, or risk-free betting.</p>
              <p>If you receive suspicious marketing messages or support claims, do not click links or share details. Return to the official website and contact customer care. You may ask support about communication preferences where available.</p>
            </section>

            <section id="section-changes" class="privacy-section">
              <p class="bento-card__tag">Policy Updates</p>
              <h2>Changes to This Privacy Policy</h2>
              <p>Reddy Book Club may update this Privacy Policy from time to time to reflect changes in website features, account processes, support methods, payment systems, legal requirements, security practices, or business operations.</p>
              <p>The updated policy will apply from the date it is posted on the website unless stated otherwise.</p>
              <p>You should review this page regularly. If you continue using the website after changes are posted, you accept the updated Privacy Policy.</p>
            </section>

            <section id="section-contact" class="privacy-section">
              <p class="bento-card__tag">Data Queries</p>
              <h2>Contact &amp; Privacy Questions</h2>
              <p>If you have questions about this Privacy Policy, your account information, support records, payment data, or privacy choices, contact Reddy Book Club customer care through the official support option on the website.</p>
              <p>When contacting support, provide only the details needed to solve your issue. Do not share your password, OTP, UPI PIN, bank password, wallet password, or private financial credentials.</p>
              <p>Support may ask for basic verification before discussing account information. This is done to protect your privacy and prevent unauthorised access.</p>
            </section>

            <section id="section-faq" class="privacy-section">
              <p class="bento-card__tag">F.A.Q.</p>
              <h2>Frequently Asked Questions</h2>
              <div class="landing-faq">
                <details>
                  <summary>What information does Reddy Book Club collect?</summary>
                  <div class="faq-body">
                    <p>Reddy Book Club may collect account details, cricket ID information, login activity, contact details, payment references, support messages, device data, and verification information where needed.</p>
                  </div>
                </details>
                <details>
                  <summary>Why does Reddy Book Club need my information?</summary>
                  <div class="faq-body">
                    <p>Your information may be used to create account access, support login, review deposits or withdrawals, protect account security, respond to customer care requests, and meet applicable requirements.</p>
                  </div>
                </details>
                <details>
                  <summary>Does Reddy Book Club ask for OTP or UPI PIN?</summary>
                  <div class="faq-body">
                    <p>No. You should never share OTPs, UPI PINs, bank passwords, wallet passwords, card PINs, or private financial credentials with anyone claiming to be support.</p>
                  </div>
                </details>
                <details>
                  <summary>Can I ask to update my personal details?</summary>
                  <div class="faq-body">
                    <p>Yes. You can contact customer care through the official website support route to ask about updating incorrect account or contact details. Verification may be required.</p>
                  </div>
                </details>
                <details>
                  <summary>Is my data safe if I download a Reddy Book Club APK?</summary>
                  <div class="faq-body">
                    <p>Only use APK files from verified Reddy Book Club sources. Fake APKs can put your data at risk. Mobile browser access may be safer for many users.</p>
                  </div>
                </details>
              </div>
            </section>

            <!-- Conclusion Block -->
            <div class="privacy-conclusion-card">
              <p class="bento-card__tag">Summary</p>
              <h2>Conclusion</h2>
              <p>This Reddy Book Privacy Policy explains how Reddy Book Club may handle information connected to cricket ID requests, registration, login, payments, withdrawals, support, mobile access, and responsible gaming.</p>
              <p>Your privacy also depends on safe user habits. Use only the official website, protect your cricket ID, avoid fake links, do not install unverified APK files, and never share OTPs, UPI PINs, banking passwords, or private payment credentials.</p>
              <p>Use Reddy Book Club only if you are eligible, legally allowed, and comfortable with how your information may be used to support account access, security, payments, and customer care.</p>
            </div>
          </div>
        </article>`,
    cta: {
      title: "Questions about privacy?",
      text: "Contact official customer care for data-related requests.",
      buttons: `<a href="customer-care.html" class="btn-cta btn-cta-primary">Customer Care</a>
        <a href="home.html" class="btn-cta btn-cta-secondary">Back to Home</a>`,
    },
  },
  {
    file: "terms-and-conditions.html",
    active: "terms-and-conditions.html",
    theme: "terms",
    title: "Terms and Conditions | Reddy Book Club",
    description:
      "Read Reddy Book Terms and Conditions for account use, cricket ID access, payments, eligibility, and responsible gaming.",
    eyebrow: "Legal · Terms",
    h1: 'Terms for <em>Reddy Book Club</em> users',
    lead: "Last updated: 27 April 2026. Rules for using the website, cricket ID, login, payments, and gaming features. Read before registering or logging in.",
    chips: chipsHtml([
      { icon: "file-text", strong: "Eligibility", text: "18+ / 21+" },
      { icon: "lock", strong: "Your", text: "login security" },
      { icon: "cash-stack", strong: "Payment", text: "rules" },
    ]),
    actions: `<a href="privacy-policy.html" class="btn-cta btn-cta-secondary">Privacy Policy</a>
        <a href="register.html" class="btn-cta btn-cta-neon">Get Cricket ID</a>`,
    bento: `
        <article class="bento-card bento-intro bento-span-12">
          <p class="bento-card__tag">Agreement</p>
          <h2>About these terms</h2>
          <p class="lead">By using Reddy Book Club — Register, Get Cricket ID, Login, or support — you agree to these Terms. If you disagree, do not register, log in, or deposit.</p>
          <p>Intended only for eligible adults where access is legally permitted. Betting involves financial risk.</p>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">§1</p>
          <h3>Eligibility</h3>
          <p>You must meet age and location rules (often 18+ or 21+). Do not use the site if underage, restricted, using another person’s identity, or for fraud.</p>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">§2</p>
          <h3>Cricket ID &amp; registration</h3>
          <p>Provide accurate information. Reddy Book Club may refuse, delay, or restrict accounts. Duplicate accounts may be closed unless permitted.</p>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">§3</p>
          <h3>Login security</h3>
          <ul>
            <li>Do not share passwords or sell accounts</li>
            <li>No shared-device password storage</li>
            <li>Report unauthorized access immediately</li>
          </ul>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">§4</p>
          <h3>Deposits &amp; withdrawals</h3>
          <p>Follow agent or platform payment instructions. Keep proof of transactions. Minimum amounts and processing times may vary.</p>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">§5</p>
          <h3>Prohibited conduct</h3>
          <ul>
            <li>Abuse, cheating, or market manipulation</li>
            <li>Multiple unauthorized accounts</li>
            <li>Illegal activity or money laundering</li>
          </ul>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">§6</p>
          <h3>Responsible gaming</h3>
          <p>Set limits, avoid chasing losses, and use our <a href="responsible-gaming.html" class="btn-ghost">Responsible Gaming</a> page. Self-exclusion requests may be honoured where supported.</p>
        </article>
        <article class="bento-card bento-highlight bento-span-12">
          <p class="bento-card__tag">Updates</p>
          <h3>Changes to terms</h3>
          <p>Terms may be updated from time to time. Continued use after changes means you accept the updated version. Also read our <a href="privacy-policy.html" class="btn-ghost">Privacy Policy</a>.</p>
        </article>
        <article class="bento-card bento-cta-card bento-span-12">
          <p class="bento-card__tag">Support</p>
          <h3>Questions about these terms?</h3>
          <a href="customer-care.html" class="btn-cta btn-cta-primary">Contact Customer Care</a>
        </article>`,
    cta: {
      title: "Accept and continue",
      text: "Register or log in only if you agree to these Terms and meet eligibility requirements.",
      buttons: `<a href="register.html" class="btn-cta btn-cta-primary">Get Cricket ID</a>
        <a href="login.html" class="btn-cta btn-cta-secondary">Login</a>`,
    },
  },
  {
    file: "responsible-gaming.html",
    active: "responsible-gaming.html",
    theme: "responsible",
    title: "Responsible Gaming | Reddy Book Club",
    description:
      "Read Reddy Book responsible gaming guidance for safer play, limits, warning signs, and support.",
    eyebrow: "Play safely",
    h1: 'Responsible <em>gaming</em> first',
    lead: "Betting and casino play should be entertainment — not income. Set limits, know warning signs, and get help if gaming stops feeling controlled.",
    chips: chipsHtml([
      { icon: "piggy-bank", strong: "Budget", text: "before you play" },
      { icon: "clock", strong: "Time", text: "limits matter" },
      { icon: "heart-pulse", strong: "Help", text: "when needed" },
    ]),
    actions: `<a href="customer-care.html" class="btn-cta btn-cta-primary">Contact Support</a>
        <a href="home.html" class="btn-cta btn-cta-secondary">Back to Home</a>`,
    bento: `
        <article class="bento-card bento-intro bento-span-8">
          <p class="bento-card__tag">Overview</p>
          <h2>What responsible gaming means</h2>
          <p class="lead">Stay in control of time, money, and emotions. Outcomes are uncertain — no strategy removes risk from sports or casino play.</p>
          <p>Only use Reddy Book Club if you are an eligible adult where access is legally permitted.</p>
        </article>
        <article class="bento-card bento-highlight bento-highlight--safe bento-span-4">
          <p class="bento-card__tag">Ask yourself</p>
          <h3>Budget rule</h3>
          <p><strong>“If I lose this amount today, will my normal life still be okay tomorrow?”</strong> If no — do not deposit or play.</p>
        </article>
        <article class="bento-card bento-visual bento-span-5">
          <div class="bento-visual__img" role="img" aria-label="Responsible gaming"></div>
          <div class="bento-visual__body">
            <p class="bento-card__tag">Mindset</p>
            <h3>Not an income source</h3>
            <p>Never use betting to pay bills, clear debt, or replace salary. Spend only what you can afford to lose.</p>
          </div>
        </article>
        <article class="bento-card bento-span-7">
          <p class="bento-card__tag">Habits</p>
          <h2>Healthy play checklist</h2>
          <div class="bento-tiles">
            <div class="bento-tile"><i class="bi bi-wallet2"></i><span>Fixed budget</span><p>Decide before login</p></div>
            <div class="bento-tile"><i class="bi bi-clock"></i><span>Time limits</span><p>Stop when time is up</p></div>
            <div class="bento-tile"><i class="bi bi-slash-circle"></i><span>No chase</span><p>Don’t recover losses fast</p></div>
            <div class="bento-tile"><i class="bi bi-person-lock"></i><span>Private account</span><p>Never share login</p></div>
          </div>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">Warning signs</p>
          <h3>When to pause</h3>
          <ul>
            <li>Playing longer than planned</li>
            <li>Borrowing money to bet</li>
            <li>Neglecting work or family</li>
            <li>Feeling restless when not logged in</li>
            <li>Hiding activity from others</li>
          </ul>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">Never chase</p>
          <h3>After a loss</h3>
          <p>Chasing losses with bigger bets is a common risky pattern. Accept the loss, stop for the day, and return only within your preset budget.</p>
        </article>
        <article class="bento-card bento-span-12">
          <p class="bento-card__tag">Underage &amp; self-exclusion</p>
          <h2>Who should not play</h2>
          <p>Underage users, restricted locations, and anyone who cannot control gambling behaviour should not use the platform. Contact customer care if you need account restrictions or support guidance.</p>
        </article>
        <article class="bento-card bento-cta-card bento-span-12">
          <p class="bento-card__tag">Need help?</p>
          <h3>Talk to support</h3>
          <p>Official customer care can guide account limits and safer-play resources where available.</p>
          <a href="customer-care.html" class="btn-cta btn-cta-primary">Customer Care</a>
          <a href="terms-and-conditions.html" class="btn-cta btn-cta-secondary" style="margin-left:8px;">Terms</a>
        </article>`,
    cta: {
      title: "Play responsibly",
      text: "Set your limits before you register, log in, or deposit.",
      buttons: `<a href="responsible-gaming.html" class="btn-cta btn-cta-secondary">Review guidance</a>
        <a href="customer-care.html" class="btn-cta btn-cta-primary">Get Support</a>`,
    },
  },
];

for (const page of PAGES) {
  const html = renderShell(page);
  const out = path.join(ROOT, page.file);
  fs.writeFileSync(out, html, "utf8");
  console.log("Wrote", page.file);
}
