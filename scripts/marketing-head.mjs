/**
 * Shared marketing page <head> — SEO meta, Open Graph, Twitter cards.
 * Not cloned reference-site tags.
 */

export const SITE_NAME = "Reddy Book Club";
export const SITE_URL = "https://bwt-now.vercel.app";

export const MARKETING_VIEWPORT =
  '<meta name="viewport" content="width=device-width, initial-scale=1" />';

export const MARKETING_FAVICON = '<link rel="icon" href="assets/favicon.ico" />';

/** @type {Record<string, { title: string, description: string, path: string, ogImage: string, keywords: string }>} */
export const MARKETING_PAGE_SEO = {
  "home.html": {
    title: "Reddy Book Club Guide 2026 | Cricket ID, Login & Registration",
    description:
      "Learn how Reddy Book Club works: agent-based cricket ID access, login steps, registration, sports markets, bonuses, UPI payments, withdrawals, and responsible gaming tips for India.",
    path: "/",
    ogImage: "assets/images/pages/home/Homepage%20Banner.webp",
    keywords:
      "reddy book club, reddybook, cricket id, reddy book login, reddy book registration, online betting id india",
  },
  "login.html": {
    title: "Reddy Book Login Guide | Access Your Reddy Book Club Cricket ID",
    description:
      "Step-by-step Reddy Book Club login help for existing users: cricket ID sign-in, mobile browser access, APK safety, account security, deposits, withdrawals, and login troubleshooting.",
    path: "/login",
    ogImage: "assets/images/pages/login/Login%20Page%20Banner.webp",
    keywords:
      "reddy book login, reddy book club login, cricket id login, reddybook login, reddy book club apk",
  },
  "register.html": {
    title: "Reddy Book Registration | Get Your Reddy Book Club Cricket ID",
    description:
      "Register for a Reddy Book Club cricket ID with clear steps, required details, mobile registration tips, APK warnings, payment safety, and responsible gaming guidance before you start.",
    path: "/register",
    ogImage: "assets/images/pages/register/Register%20Page%20banner.webp",
    keywords:
      "reddy book registration, get cricket id, reddy book club register, reddybook club id, new betting id",
  },
  "about-us.html": {
    title: "About Reddy Book Club | Trusted Cricket ID & Betting Platform",
    description:
      "Discover what Reddy Book Club offers: cricket ID onboarding, sports and casino markets, payments, customer support, and safer account practices for users in India.",
    path: "/about-us",
    ogImage: "assets/images/pages/about-us/About%20Us%20Main%20Banner%20-%201.webp",
    keywords:
      "about reddy book club, reddy book cricket id platform, reddybook club about, betting platform india",
  },
  "customer-care.html": {
    title: "Reddy Book Customer Care | Login, ID & Payment Support",
    description:
      "Get Reddy Book Club customer care help for cricket ID issues, login problems, registration, deposits, withdrawals, APK questions, and account support in India.",
    path: "/customer-care",
    ogImage: "assets/images/pages/customer-care/Customer%20Care%20Main%20Banner%20-%201.webp",
    keywords:
      "reddy book customer care, reddy book club support, cricket id help, login support, payment help",
  },
  "privacy-policy.html": {
    title: "Privacy Policy | Reddy Book Club Data & Account Information",
    description:
      "Read the Reddy Book Club Privacy Policy covering data collection, cookies, account information, security practices, user rights, and how your details may be used or protected.",
    path: "/privacy-policy",
    ogImage: "assets/images/pages/privacy-policy/Privacy%20Policy%20Main%20Banner%20-%201.webp",
    keywords:
      "reddy book club privacy policy, reddybook privacy, data protection, account privacy",
  },
  "terms-and-conditions.html": {
    title: "Terms & Conditions | Reddy Book Club User Agreement",
    description:
      "Review Reddy Book Club Terms and Conditions for account eligibility, cricket ID use, payments, withdrawals, responsible gaming, prohibited activity, and platform rules in India.",
    path: "/terms-and-conditions",
    ogImage: "assets/images/pages/terms/T%26C%20Main%20Banner%20-%201.webp",
    keywords:
      "reddy book terms and conditions, reddy book club rules, user agreement, betting terms",
  },
  "responsible-gaming.html": {
    title: "Responsible Gaming | Play Safely on Reddy Book Club",
    description:
      "Reddy Book Club responsible gaming guide: set limits, recognize warning signs, avoid chasing losses, protect your budget, and get help if betting affects your life.",
    path: "/responsible-gaming",
    ogImage:
      "assets/images/pages/responsible-gaming/Responsible%20Gaming%20Main%20Banner%20-%201.webp",
    keywords:
      "responsible gaming, reddy book club safe play, betting limits, problem gambling help",
  },
  "blogs.html": {
    title: "Reddy Book Club Blog | Cricket ID, Login & Betting Guides",
    description:
      "Browse Reddy Book Club guides on cricket IDs, login routes, registration steps, sports betting basics, mobile access, and platform updates for users in India.",
    path: "/blogs",
    ogImage:
      "assets/images/pages/home/Homepage%20-%20What%20is%20ReddyBook_%20Complete%20Guide%20to%20Betting%2C%20Login%20%26%20Registration.webp",
    keywords:
      "reddy book blog, cricket betting guides, login tips, registration help, reddybook articles",
  },
  "categories.html": {
    title: "Betting Categories | Cricket, Sports & Casino | Reddy Book Club",
    description:
      "Explore Reddy Book Club categories including cricket, football, live betting, casino games, account tools, and support topics to find the right section faster.",
    path: "/categories",
    ogImage: "assets/images/pages/home/Homepage%20-%20Live%20Betting%20Experience.webp",
    keywords:
      "reddy book categories, cricket betting, live sports, casino games, reddy book club sections",
  },
};

function escapeAttr(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * @param {{ title: string, description: string, path?: string, ogImage?: string, keywords?: string }} meta
 */
export function renderMarketingHeadMeta(meta) {
  const {
    title,
    description,
    path = "",
    ogImage = "assets/images/pages/home/Homepage%20Banner.webp",
    keywords = "",
  } = meta;

  const canonical = path ? `${SITE_URL}${path}` : SITE_URL;
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}/${ogImage}`;

  const keywordLine = keywords
    ? `\n  <meta name="keywords" content="${escapeAttr(keywords)}" />`
    : "";

  return `${MARKETING_VIEWPORT}
  <title>${escapeAttr(title)}</title>
  <meta name="description" content="${escapeAttr(description)}" />${keywordLine}
  <meta name="robots" content="index, follow" />
  <meta name="author" content="${SITE_NAME}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeAttr(title)}" />
  <meta property="og:description" content="${escapeAttr(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:locale" content="en_IN" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttr(title)}" />
  <meta name="twitter:description" content="${escapeAttr(description)}" />
  <meta name="twitter:image" content="${ogImageUrl}" />
  ${MARKETING_FAVICON}`;
}

/** @param {string} file */
export function seoForPage(file) {
  const seo = MARKETING_PAGE_SEO[file];
  if (!seo) throw new Error(`No SEO config for ${file}`);
  return seo;
}
