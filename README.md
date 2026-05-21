# BWT-Now

Static Reddy Book Club site — marketing landing pages + mirrored betting UI.

## Project layout

```
site-clone/
├── index.html          # Betting dashboard (root entry)
├── 404.html
├── pages/              # All marketing pages
│   ├── home.html
│   ├── login.html
│   ├── register.html
│   └── ...
├── assets/             # CSS, JS, images
├── js/                 # site-logic.js
└── vercel.json         # Clean URL rewrites
```

## Local preview

```bash
npm run build
npm start
```

Open http://localhost:3000/ (home) or http://localhost:3000/bet (dashboard).
Local rewrites are configured in `serve.json`.

## Deploy on Vercel

1. Push this repo to GitHub: https://github.com/Nir-Bhay/BWT-Now
2. In [Vercel](https://vercel.com/new), **Import** the `BWT-Now` repository.
3. Use these settings (auto-detected from `vercel.json`):
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `.` (project root)
4. Click **Deploy**.

### URLs after deploy

| URL | Page |
|-----|------|
| `/` | Home (marketing) |
| `/login`, `/register`, `/about-us` | Landing pages |
| `/blogs`, `/categories` | Grid pages |
| `/privacy-policy`, `/terms-and-conditions`, `/responsible-gaming` | Legal |
| `/bet` or `/index.html` | Betting UI mirror |
| `/inplay`, `/sports/*` | Betting UI (rewritten to `index.html`) |

All asset paths use root-relative URLs (`/assets/`, `/js/`) so CSS, images, and scripts work from any page depth.

## Regenerate HTML from content

```bash
npm run build:pages
```

Requires `ReddyBook.md` in the project root. Output is written to `pages/`.
