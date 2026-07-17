# grok.hot

**Understand the heat.**

A production-ready, single-page brand site for [grok.hot](https://grok.hot) — deep understanding meets raw heat. Dark-first, bold, high-energy, and built for Lighthouse 95+ on mobile.

## Stack

| Layer  | Choice                                        |
|--------|-----------------------------------------------|
| Markup | Semantic HTML5                                |
| Styles | Vanilla CSS (custom properties, mobile-first) |
| Script | Vanilla JS (no frameworks, no build step)     |
| Deploy | Static files → Vercel (or any static host)    |

Zero dependencies. Zero bundler. Deploy the folder.

## Project structure

```
grok.hot/
├── index.html          # Full page: SEO meta, sections, form
├── css/
│   └── styles.css      # Themes, layout, animations
├── js/
│   └── main.js         # Theme, nav, reveals, embers, form
├── favicon.svg
├── og-image.svg
├── robots.txt
├── sitemap.xml
├── vercel.json         # Headers + clean URLs
└── README.md
```

## Sections

1. **Hero** — brand punch + CTA + live stats  
2. **About** — brand story / equation  
3. **Why Badass** — feature grid  
4. **Gallery** — visual language samples  
5. **Voices** — testimonials  
6. **Contact** — validated CTA form  

Also: sticky nav, smooth scroll, dark/light toggle, scroll reveals, ember canvas particles, mobile menu.

## Local preview

Any static server works. Examples:

```bash
# Python
python3 -m http.server 4173

# Node (if you have npx)
npx --yes serve -l 4173
```

Open [http://localhost:4173](http://localhost:4173).

## One-click deploy (Vercel)

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts. For production:

```bash
vercel --prod
```

### Option B — GitHub + Vercel dashboard

1. Push this repo to GitHub.  
2. Go to [vercel.com/new](https://vercel.com/new).  
3. Import the repository.  
4. Leave **Framework Preset** as **Other** (static).  
5. Root directory: project root.  
6. Build command: leave empty.  
7. Output directory: leave empty (or `.`).  
8. Deploy.

### Option C — Vercel button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

Point the clone at this repository after you push it.

### Custom domain

In the Vercel project → **Settings → Domains** → add `grok.hot` and `www.grok.hot`. Update DNS as Vercel instructs (usually A/CNAME records).

## Features checklist

- [x] Fully responsive (mobile-first)  
- [x] Dark mode by default + one-click theme toggle (persisted)  
- [x] Hero that sells the domain vibe  
- [x] Smooth scroll + 6 content blocks  
- [x] Hover micro-interactions + scroll-triggered reveals  
- [x] SEO meta, Open Graph, Twitter card, JSON-LD, sitemap  
- [x] Accessible: skip link, focus styles, `prefers-reduced-motion`  
- [x] Security headers via `vercel.json`  

## Contact form note

The form validates client-side and simulates a successful submit (no backend). To wire a real endpoint:

1. Open `js/main.js` and find the contact form submit handler.  
2. Replace the simulated `await new Promise(...)` block with `fetch` to Formspree, Basin, your API, etc.  
3. Keep the existing success/error UI hooks.

## Performance notes

- No JS frameworks or image payloads (CSS + SVG only)  
- Fonts loaded with `display=swap` + preconnect  
- Canvas embers pause when the tab is hidden  
- Particle count scales with viewport and is capped on small screens  
- Long-cache headers for static assets on Vercel  

Target: **Lighthouse Performance 95+** on mobile (throttled). Run Chrome DevTools Lighthouse after deploy to confirm on real CDN latency.

## License

Proprietary — all rights for the grok.hot brand presentation.







