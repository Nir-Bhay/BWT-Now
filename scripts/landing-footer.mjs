/**
 * Shared premium footer for all Reddy Book Club landing pages.
 */
import {
  FOOTER_QUICK_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_ACCOUNT_LINKS,
  BET_ROUTE,
} from "./paths.mjs";

function linkList(items) {
  return items.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("\n              ");
}

export function renderLandingFooter(year = new Date().getFullYear()) {
  return `  <footer class="landing-footer">
    <div class="landing-footer__glow" aria-hidden="true"></div>
    <div class="container">
      <div class="landing-footer__main">
        <div class="landing-footer__brand">
          <a href="/" class="landing-footer__logo">
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
            <a href="/register" class="btn-cta btn-cta-primary">Get Cricket ID</a>
            <a href="${BET_ROUTE}" class="btn-ghost">Open dashboard →</a>
          </div>
        </div>
        <div class="landing-footer__nav">
          <div class="landing-footer__col">
            <h4 class="landing-footer__heading"><i class="bi bi-compass" aria-hidden="true"></i> Explore</h4>
            <ul>
              ${linkList(FOOTER_QUICK_LINKS)}
            </ul>
          </div>
          <div class="landing-footer__col">
            <h4 class="landing-footer__heading"><i class="bi bi-journal-text" aria-hidden="true"></i> Legal</h4>
            <ul>
              ${linkList(FOOTER_LEGAL_LINKS)}
            </ul>
          </div>
          <div class="landing-footer__col">
            <h4 class="landing-footer__heading"><i class="bi bi-person-badge" aria-hidden="true"></i> Account</h4>
            <ul>
              ${linkList(FOOTER_ACCOUNT_LINKS)}
            </ul>
          </div>
        </div>
      </div>
      <div class="landing-footer-bottom">
        <p class="landing-footer__copy">&copy; ${year} Reddy Book Club. All rights reserved.</p>
        <nav class="landing-footer__legal-nav" aria-label="Footer legal">
          <a href="/privacy-policy">Privacy</a>
          <a href="/terms-and-conditions">Terms</a>
          <a href="/responsible-gaming">Responsible gaming</a>
        </nav>
        <p class="landing-footer__disclaimer">Play responsibly · Entertainment only where legally permitted</p>
      </div>
    </div>
  </footer>`;
}
