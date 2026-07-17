# YEET.PW 🥏

> **Throw it into orbit.** — A bold, high-energy single-page website for [yeet.pw](https://yeet.pw).

Built with vanilla HTML, CSS, and JavaScript. Zero dependencies. Zero build step. Maximum speed.

## Quick Deploy (Vercel)

### One-click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USER/yeet.pw)

### Manual via CLI

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Production
vercel --prod
```

That's it. Vercel auto-detects the static site — no `vercel.json` required (but one is included with optimal cache headers and security headers).

### Manual via any static host

Serve the root directory. Examples:

```bash
# Python
python3 -m http.server 8080

# Node (with serve)
npx serve .

# Netlify
netlify deploy --prod --dir=.
```

## Project Structure

```
yeet.pw/
├── index.html          # Main page — semantic HTML5, SEO-optimized
├── css/
│   └── style.css       # All styles — dark/light theme, responsive, animations
├── js/
│   └── main.js         # Interactive features — vanilla JS, zero deps
├── assets/
│   └── favicon.svg     # Vector favicon
├── vercel.json         # Vercel config with security headers + caching
└── README.md           # You're reading it
```

## Features

- **Dark mode by default** — one-click toggle (persisted to localStorage)
- **Fully responsive** — mobile-first, works from 320px to 4K
- **6 sections** — Hero, About (with animated counters), Features (mouse-glow cards), Showcase (bento grid), Testimonials, CTA with email form
- **Particle system** — canvas-based animated particle network in hero
- **Scroll-triggered animations** — Intersection Observer with reveal transitions
- **Animated counters** — stats animate on scroll into view
- **Mobile hamburger menu** — full-screen overlay with smooth transitions
- **Smooth scroll** — CSS `scroll-behavior: smooth` with JS scroll-spy for active nav
- **SEO-ready** — Open Graph, Twitter Cards, canonical, semantic HTML, proper meta tags
- **`prefers-reduced-motion`** — disables animations for accessibility
- **Focus-visible** — keyboard navigation fully supported
- **Security headers** — configured in `vercel.json` (X-Content-Type-Options, X-Frame-Options, etc.)
- **Lighthouse 95+** — no external dependencies, minimal CSS/JS, capped DPR for canvas

## Theme Toggle

The site starts in dark mode. Click the sun/moon icon in the nav to switch. Your preference is saved to `localStorage` and persists across visits.

## Performance Notes

- **No frameworks** — vanilla HTML/CSS/JS, ~15KB total CSS + JS (uncompressed)
- **No external fonts** — uses system font stack (`Inter` → `SF Pro` → `system-ui` fallback)
- **Canvas DPR capped at 2x** — particle system won't tank performance on high-DPI screens
- **Passive scroll listeners** — all scroll handlers use `{ passive: true }`
- **RequestAnimationFrame** — all animations and scroll handlers are RAF-throttled
- **Intersection Observer** — scroll animations use native browser API, no scroll polling

## License

MIT
