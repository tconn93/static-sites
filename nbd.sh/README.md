# nbd.sh

> **Ship the impossible. Call it nothing.**

A single-page, zero-dependency static site for [nbd.sh](https://nbd.sh) — the home of the
shrug-and-ship. Terminal aesthetic, acid-green on near-black, dark mode by default.

## Stack

Vanilla HTML + CSS + JS. No frameworks, no build step, no external fonts or CDNs —
every byte is served from this repo, which is how it hits 95+ mobile Lighthouse scores.

## Folder structure

```
nbd.sh/
├── index.html          # single page: hero, about, features, gallery, testimonials, CTA
├── css/
│   └── style.css       # design tokens, dark/light themes, responsive layout, animations
├── js/
│   └── main.js         # theme toggle, scroll reveals, stat counters, terminal typing, copy button
├── assets/
│   ├── favicon.svg     # terminal-prompt favicon
│   └── og.png          # 1200x630 Open Graph / Twitter card image
├── vercel.json         # security headers + immutable caching for static assets
└── README.md
```

## Features

- **Mobile-first responsive** — hamburger nav under 720px, fluid type via `clamp()`
- **Dark mode by default** with a one-click sun/moon toggle, persisted to `localStorage`,
  applied before first paint (no flash)
- **Hero** — glitch-on-hover headline plus a looping, character-by-character typed
  terminal deploy session
- **Smooth scroll nav** with active-section highlighting (`IntersectionObserver`)
- **Scroll-triggered reveals** and count-up stat counters
- **Micro-interactions** — card accent sweeps, hover lifts, copy-to-clipboard install command
- **Accessible** — semantic landmarks, skip link, ARIA labels, keyboard-friendly,
  honors `prefers-reduced-motion`, content visible without JavaScript
- **SEO-ready** — meta description, canonical URL, Open Graph + Twitter cards,
  JSON-LD structured data

## Run locally

Any static file server works:

```sh
npx serve .
# or
python3 -m http.server 8000
```

Then open http://localhost:8000 (or the port `serve` prints).

## Deploy

### Vercel (one command)

```sh
npm i -g vercel   # if you don't have it
vercel --prod
```

Accept the defaults — it's a static site with no build step. Point the `nbd.sh`
domain at the project in **Vercel → Project → Settings → Domains** and you're live.

### One-click alternatives

- **Netlify:** drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop)
- **Cloudflare Pages:** `npx wrangler pages deploy .`
- **GitHub Pages:** push and enable Pages on the repo — no build step needed

## License

MIT — take it, ship it, shrug.
