/**
 * Shared top chrome (disclaimer + header + subnav) — must match home.html exactly.
 */

export const MARKETING_NAV = [
  { href: "home.html", label: "Home" },
  { href: "login.html", label: "Login" },
  { href: "register.html", label: "Register" },
  { href: "about-us.html", label: "About" },
  { href: "customer-care.html", label: "Support" },
  { href: "blogs.html", label: "Blogs" },
  { href: "categories.html", label: "Categories" },
];

export const MARKETING_SUBNAV_EXTRA = [
  { href: "privacy-policy.html", label: "Privacy" },
  { href: "terms-and-conditions.html", label: "Terms" },
  { href: "responsible-gaming.html", label: "Responsible Gaming" },
];

function navActive(href, active) {
  return href === active ? ' class="active"' : "";
}

export function renderMarketingChrome(activePage) {
  const mainNav = MARKETING_NAV.map(
    (n) => `        <li><a href="${n.href}"${navActive(n.href, activePage)}>${n.label}</a></li>`
  ).join("\n");

  const subItems = [...MARKETING_NAV, ...MARKETING_SUBNAV_EXTRA].filter(
    (n, i, arr) => arr.findIndex((x) => x.href === n.href) === i
  );
  const subNav = subItems
    .map((n) => `      <li><a href="${n.href}"${navActive(n.href, activePage)}>${n.label}</a></li>`)
    .join("\n");

  return `  <div class="landing-disclaimer">18+ | Play Responsibly | This site is for entertainment where legally permitted</div>

    <header class="landing-header">
    <div class="container">
      <a href="home.html" class="logo"><img src="https://speedcdn.io/assets/logos/reddybook.live.png"
          alt="Reddy Book Club" /></a>
      <nav>
        <ul class="landing-nav">
${mainNav}
        </ul>
      </nav>
      <div class="landing-header-actions">
        <a href="index.html" class="rules-btn">Bet Now</a>
        <a href="javascript:void(0)" class="btn-login btn-accent" data-auth-open="signup">Signup</a>
        <a href="javascript:void(0)" class="btn-login" data-auth-open="login">Login</a>
      </div>
    </div>
  </header>

  <nav class="landing-subnav" aria-label="Page sections">
    <div class="container">
      <ul>
${subNav}
      </ul>
    </div>
  </nav>`;
}

const LIVE_WIN_CHIPS = [
  ["₹42,500", "Rahul M.", "· IPL"],
  ["₹18,200", "Priya S.", "· Live Casino"],
  ["₹95,000", "Amit K.", "· Cricket"],
  ["₹31,400", "Vikram D.", "· Football"],
];

function renderWinChip([amt, name, game]) {
  return `<div class="win-chip"><span class="win-chip__amt">${amt}</span> <strong>${name}</strong> <span class="win-chip__game">${game}</span></div>`;
}

/** Live Wins strip — identical to home.html (below hero on every marketing page). */
export function renderLiveWinsTicker() {
  const chips = LIVE_WIN_CHIPS.map(renderWinChip).join("\n          ");
  const track = `${chips}\n          ${chips}`;
  return `  <div class="winners-ticker-wrap" aria-hidden="true">
    <div class="winners-ticker-row">
      <span class="winners-ticker-label"><i class="bi bi-lightning-charge-fill" aria-hidden="true"></i> Live Wins</span>
      <div class="winners-ticker-viewport">
        <div class="winners-ticker">
          ${track}
        </div>
      </div>
    </div>
  </div>`;
}

export const MARKETING_HEAD_LINKS = `  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    body, button, input, select, textarea {
      font-family: "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
    }
  </style>
  <link href="assets/css/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
  <link href="assets/css/common_style.css" rel="stylesheet" />
  <link href="assets/css/landing.css" rel="stylesheet" />
  <link href="assets/css/landing-footer.css" rel="stylesheet" />
  <link href="assets/css/landing-home-light.css" rel="stylesheet" />
  <link href="assets/css/landing-header.css" rel="stylesheet" />`;
