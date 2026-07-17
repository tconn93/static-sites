# Initial Prompt:

```
You are an elite full-stack designer/developer. Build a complete, production-ready, single-page modern website for https://yeet.pw  

Theme the entire site creatively around the domain name itself — make it feel “badass” (bold, high-energy, memorable, premium feel) Make the visitor want to know more about this site. 
Tech stack: Your choice. Deploy-ready code only (no placeholders).

Requirements (identical for every test):
- Fully responsive (mobile-first)
- Dark mode by default with one-click toggle
- Hero section that instantly communicates the domain vibe
- Smooth scroll navigation + 4–5 sections (About the brand, Features/Why badass, Gallery/Examples, Testimonials, Contact/CTA)
- Interactive elements (hover effects, micro-animations, at least one scroll-triggered animation)
- SEO-ready (proper meta, Open Graph, semantic HTML)
- Lighthouse performance target: 95+ on mobile
- Clean, well-commented code with a clear folder structure
- Include a README.md with one-click deploy instructions (Vercel preferred)
- Production ready!!!
```

## After coding
DeepSeek's response when done:
```markdown
🥏 YEET.PW — Complete

The site is built at /mnt/c/Users/tyler/projects/static-sites/yeet.pw/. Here's what you get:

File Structure

yeet.pw/
├── index.html        (28KB) — Semantic HTML5, 6 sections
├── css/style.css     (33KB) — Dark/light theme, fully responsive
├── js/main.js        (16KB) — Vanilla JS, zero dependencies
├── assets/favicon.svg — Bold Y-shaped favicon
├── vercel.json       — Security headers + caching config
└── README.md         — Deploy instructions

What's Inside

┌───────────────────┬────────────────────────────────────────────────────────────────────────────────────────────┐
│    Requirement    │                                       Implementation                                       │
├───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤
│ Dark mode default │ data-theme="dark" with localStorage persistence + sun/moon toggle                          │
├───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤
│ Responsive        │ Mobile-first with 5 breakpoints (320px → 4K)                                               │
├───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤
│ Hero              │ Massive animated "YEET" lettering, particle network canvas, gradient overlays              │
├───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤
│ About             │ Animated stat counters (247K+, 99.9%, 12ms) + brand story card                             │
├───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤
│ Features          │ 6 cards with mouse-tracking radial glow effect, SVG icons, metric badges                   │
├───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤
│ Showcase          │ Bento-grid gallery (5 cards, 3 layout variants) with hover overlays                        │
├───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤
│ Testimonials      │ 3 quote cards with avatar gradients + trust logo row                                       │
├───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤
│ CTA               │ Email signup form with validation + orbit-ring animation visual                            │
├───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤
│ Scroll animations │ Intersection Observer reveals on all sections                                              │
├───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤
│ SEO               │ OG, Twitter Cards, canonical, semantic <main>/<nav>/<article>/<footer>, 44 aria attributes │
├───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤
│ Accessibility     │ prefers-reduced-motion, focus-visible, keyboard nav, screen-reader labels                  │
├───────────────────┼────────────────────────────────────────────────────────────────────────────────────────────┤
│ Performance       │ No frameworks, no external fonts, RAF-throttled, passive listeners, DPR-capped canvas      │
└───────────────────┴────────────────────────────────────────────────────────────────────────────────────────────┘

Deploy

cd /mnt/c/Users/tyler/projects/static-sites/yeet.pw
vercel --prod

Or drop it on any static host — zero build step required. Total uncompressed payload is ~82KB (~15KB gzipped).
```
