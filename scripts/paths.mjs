/**
 * Shared paths for marketing pages under /pages/
 */
import path from "path";

export const PAGES_DIR = "pages";

export const PAGE_ROUTES = {
  "home.html": "/",
  "login.html": "/login",
  "register.html": "/register",
  "about-us.html": "/about-us",
  "customer-care.html": "/customer-care",
  "blogs.html": "/blogs",
  "categories.html": "/categories",
  "privacy-policy.html": "/privacy-policy",
  "terms-and-conditions.html": "/terms-and-conditions",
  "responsible-gaming.html": "/responsible-gaming",
};

export const BET_ROUTE = "/bet";

export function pageHref(file) {
  return PAGE_ROUTES[file] ?? `/${PAGES_DIR}/${file}`;
}

export function pageFilePath(root, file) {
  return path.join(root, PAGES_DIR, file);
}

export const MARKETING_NAV = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
  { href: "/about-us", label: "About" },
  { href: "/customer-care", label: "Support" },
  { href: "/blogs", label: "Blogs" },
  { href: "/categories", label: "Categories" },
];

export const MARKETING_SUBNAV_EXTRA = [
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms-and-conditions", label: "Terms" },
  { href: "/responsible-gaming", label: "Responsible Gaming" },
];

export const FOOTER_QUICK_LINKS = MARKETING_NAV;

export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/responsible-gaming", label: "Responsible Gaming" },
  { href: "/about-us", label: "About Us" },
  { href: "/customer-care", label: "Customer Care" },
];

export const FOOTER_ACCOUNT_LINKS = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
  { href: BET_ROUTE, label: "Betting Dashboard" },
];
