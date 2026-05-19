/**
 * Shared premium footer for all Reddy Book Club landing pages.
 */

const QUICK_LINKS = [
  { href: "home.html", label: "Home" },
  { href: "login.html", label: "Login" },
  { href: "register.html", label: "Register" },
  { href: "about-us.html", label: "About" },
  { href: "customer-care.html", label: "Support" },
  { href: "blogs.html", label: "Blogs" },
  { href: "categories.html", label: "Categories" },
];

const LEGAL_LINKS = [
  { href: "privacy-policy.html", label: "Privacy Policy" },
  { href: "terms-and-conditions.html", label: "Terms & Conditions" },
  { href: "responsible-gaming.html", label: "Responsible Gaming" },
  { href: "about-us.html", label: "About Us" },
  { href: "customer-care.html", label: "Customer Care" },
];

const ACCOUNT_LINKS = [
  { href: "login.html", label: "Login" },
  { href: "register.html", label: "Register" },
  { href: "index.html", label: "Betting Dashboard" },
];

function linkList(items) {
  return items.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("\n              ");
}

export function renderLandingFooter(year = new Date().getFullYear()) {
  return `  <footer class="landing-footer">
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
              ${linkList(QUICK_LINKS)}
            </ul>
          </div>
          <div class="landing-footer__col">
            <h4 class="landing-footer__heading"><i class="bi bi-journal-text" aria-hidden="true"></i> Legal</h4>
            <ul>
              ${linkList(LEGAL_LINKS)}
            </ul>
          </div>
          <div class="landing-footer__col">
            <h4 class="landing-footer__heading"><i class="bi bi-person-badge" aria-hidden="true"></i> Account</h4>
            <ul>
              ${linkList(ACCOUNT_LINKS)}
            </ul>
          </div>
          <div class="landing-footer__col landing-footer__col--highlight">
            <h4 class="landing-footer__heading"><i class="bi bi-chat-dots" aria-hidden="true"></i> Need help?</h4>
            <p class="landing-footer__hint">Agents handle deposits, withdrawals, and ID recovery.</p>
            <ul>
              <li><a href="customer-care.html">Customer care</a></li>
              <li><a href="login.html">Login help</a></li>
              <li><a href="register.html">Registration guide</a></li>
            </ul>
            <div class="landing-footer__payments" aria-label="Payment methods">
              <span>UPI</span>
              <span>Bank</span>
              <span>Paytm</span>
              <span>Wallet</span>
            </div>
          </div>
        </div>
      </div>
      <div class="landing-footer__ribbon" aria-hidden="true">
        <span>Cricket</span><span>Football</span><span>Live casino</span><span>In-play</span><span>IPL</span><span>Exchange</span>
      </div>
      <div class="landing-footer-bottom">
        <p class="landing-footer__copy">&copy; ${year} Reddy Book Club. All rights reserved.</p>
        <nav class="landing-footer__legal-nav" aria-label="Footer legal">
          <a href="privacy-policy.html">Privacy</a>
          <a href="terms-and-conditions.html">Terms</a>
          <a href="responsible-gaming.html">Responsible gaming</a>
        </nav>
        <p class="landing-footer__disclaimer">Play responsibly · Entertainment only where legally permitted</p>
      </div>
    </div>
  </footer>`;
}
