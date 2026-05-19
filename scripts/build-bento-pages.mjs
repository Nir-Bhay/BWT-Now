#!/usr/bin/env node
/**
 * Generates bento-layout landing pages (login, register, support, legal).
 * Run: node scripts/build-bento-pages.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
  const { file, active, title, description, theme, eyebrow, h1, lead, chips, actions, bento, cta } =
    page;

  const navHtml = NAV.map(
    (n) => `<li><a href="${n.href}"${navLink(n.href, active)}>${n.label}</a></li>`
  ).join("\n          ");

  const subExtra = [...NAV, ...SUBNAV_EXTRA]
    .filter((n, i, a) => a.findIndex((x) => x.href === n.href) === i)
    .map((n) => `<li><a href="${n.href}"${navLink(n.href, active)}>${n.label}</a></li>`)
    .join("\n      ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="shortcut icon" type="image/jpg" href="assets/favicon.ico" />
  <link href="https://fonts.gstatic.com" rel="preconnect" />
  <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap" rel="stylesheet" />
  <link href="assets/css/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
  <link href="assets/css/common_style.css" rel="stylesheet" />
  <link href="assets/css/landing.css" rel="stylesheet" />
  <link href="assets/css/landing-dark.css" rel="stylesheet" />
  <link href="assets/css/landing-bento.css" rel="stylesheet" />
</head>
<body class="landing-page bento-page bento-page--${theme}">
  <div class="landing-disclaimer">18+ | Play Responsibly | This site is for entertainment where legally permitted</div>

  <header class="landing-header">
    <div class="container">
      <a href="home.html" class="logo"><img src="https://speedcdn.io/assets/logos/reddybook.live.png" alt="Reddy Book Club" /></a>
      <nav>
        <ul class="landing-nav">
          ${navHtml}
        </ul>
      </nav>
      <div class="landing-header-actions">
        <a href="index.html" class="rules-btn">Bet Now</a>
        <a href="register.html" class="btn-login btn-accent">Signup</a>
        <a href="login.html" class="btn-login">Login</a>
      </div>
    </div>
  </header>

  <nav class="landing-subnav" aria-label="Page sections">
    <div class="container"><ul>
      ${subExtra}
    </ul></div>
  </nav>

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
    <div class="container">
      <div class="landing-footer-grid">
        <div>
          <h4>Reddy Book Club</h4>
          <p style="font-size:14px;margin:0;color:#aaa;">India's trusted cricket betting ID platform. Sports, casino, and live markets in one account.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
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
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="privacy-policy.html">Privacy Policy</a></li>
            <li><a href="terms-and-conditions.html">Terms &amp; Conditions</a></li>
            <li><a href="responsible-gaming.html">Responsible Gaming</a></li>
            <li><a href="about-us.html">About Us</a></li>
            <li><a href="customer-care.html">Customer Care</a></li>
          </ul>
        </div>
        <div>
          <h4>Account</h4>
          <ul>
            <li><a href="login.html">Login</a></li>
            <li><a href="register.html">Register</a></li>
            <li><a href="index.html">Betting Dashboard</a></li>
          </ul>
        </div>
      </div>
      <div class="landing-footer-bottom">
        <p>&copy; 2026 Reddy Book Club. Play responsibly. 18+ only where legally permitted.</p>
      </div>
    </div>
  </footer>
  <script src="assets/js/landing-ui.js" defer></script>
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
    bento: `
        <article class="bento-card bento-intro bento-span-8">
          <p class="bento-card__tag">Policy</p>
          <h2>About this privacy policy</h2>
          <p class="lead">Applies to the website, login, registration, customer care, responsible gaming, mobile pages, and related Reddy Book Club services.</p>
          <p>Read together with our <a href="terms-and-conditions.html" class="btn-ghost">Terms</a> and <a href="responsible-gaming.html" class="btn-ghost">Responsible Gaming</a> pages. By using the site you agree to this handling of information.</p>
        </article>
        <article class="bento-card bento-highlight bento-span-4">
          <p class="bento-card__tag">Applies to</p>
          <ul>
            <li>Register / Get Cricket ID</li>
            <li>Login &amp; account access</li>
            <li>Payments &amp; support chats</li>
            <li>Cookies &amp; security logs</li>
          </ul>
        </article>
        <article class="bento-card bento-visual bento-span-5">
          <div class="bento-visual__img" role="img" aria-label="Privacy"></div>
          <div class="bento-visual__body">
            <p class="bento-card__tag">Principle</p>
            <h3>Accurate information</h3>
            <p>Provide correct details during registration — wrong data can delay support, payments, or recovery.</p>
          </div>
        </article>
        <article class="bento-card bento-span-7">
          <p class="bento-card__tag">We may collect</p>
          <h2>Types of information</h2>
          <div class="bento-legal-list">
            <div class="bento-legal-item"><span class="bento-legal-item__n">1</span><p><strong>Account:</strong> name, mobile, username, eligibility confirmation</p></div>
            <div class="bento-legal-item"><span class="bento-legal-item__n">2</span><p><strong>Login:</strong> ID, device, browser, IP, failed attempts, security activity</p></div>
            <div class="bento-legal-item"><span class="bento-legal-item__n">3</span><p><strong>Payments:</strong> amounts, UPI/bank refs, screenshots you share</p></div>
            <div class="bento-legal-item"><span class="bento-legal-item__n">4</span><p><strong>Support:</strong> messages, tickets, call/chat records</p></div>
          </div>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">Use</p>
          <h3>Why we use data</h3>
          <ul>
            <li>Create and manage accounts</li>
            <li>Process payment requests</li>
            <li>Prevent fraud and misuse</li>
            <li>Improve site security &amp; performance</li>
            <li>Respond to support requests</li>
          </ul>
        </article>
        <article class="bento-card bento-span-6">
          <p class="bento-card__tag">Protection</p>
          <h3>Storage &amp; sharing</h3>
          <p>Reasonable measures help protect information. Data may be shared with payment processors, hosting, or support providers only as needed — not sold for unrelated marketing.</p>
        </article>
        <article class="bento-card bento-span-12">
          <p class="bento-card__tag">Your rights</p>
          <h2>Cookies, retention &amp; contact</h2>
          <p>Cookies and similar tech may remember preferences and support security. Retention depends on account status and legal requirements. Questions? Contact official customer care — never share passwords in messages.</p>
        </article>
        <article class="bento-card bento-cta-card bento-span-12">
          <p class="bento-card__tag">Related</p>
          <h3>Other legal pages</h3>
          <p style="margin-bottom:12px;">Review terms and responsible gaming before using the platform.</p>
          <a href="terms-and-conditions.html" class="btn-cta btn-cta-secondary">Terms &amp; Conditions</a>
          <a href="responsible-gaming.html" class="btn-cta btn-cta-secondary" style="margin-left:8px;">Responsible Gaming</a>
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
