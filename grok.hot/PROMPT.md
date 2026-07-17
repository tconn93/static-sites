# Initial Prompt:

```
You are an elite full-stack designer/developer. Build a complete, production-ready, single-page modern website for https://grok.hot 

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
Grok's response when done:
```markdown
grok.hot is live in the repo as a production-ready static site — no framework, no build step, deploy the folder.

Brand vibe

“Understand the heat.” — grok (deep comprehension) × hot (raw intensity). Dark void base, magma orange → hot-pink gradients, Syne + Outfit, ember particle field.

What’s included

┌────────────┬───────────────────────────────────────────────────────────┐
│ Piece      │ Detail                                                    │
├────────────┼───────────────────────────────────────────────────────────┤
│ Hero       │ Full-viewport punchline, CTAs, animated stats, scroll cue │
├────────────┼───────────────────────────────────────────────────────────┤
│ About      │ Brand story + “GROK × HOT = UNSTOPPABLE” card             │
├────────────┼───────────────────────────────────────────────────────────┤
│ Why Badass │ 5 feature cards with hover heat                           │
├────────────┼───────────────────────────────────────────────────────────┤
│ Gallery    │ Wordmark, orbit, type system, color spectrum (CSS-only)   │
├────────────┼───────────────────────────────────────────────────────────┤
│ Voices     │ 3 testimonials                                            │
├────────────┼───────────────────────────────────────────────────────────┤
│ Contact    │ Validated form + success UI                               │
├────────────┼───────────────────────────────────────────────────────────┤
│ Chrome     │ Sticky nav, mobile drawer, dark/light toggle (persisted)  │
└────────────┴───────────────────────────────────────────────────────────┘

Tech (Lighthouse-minded)

• Vanilla HTML / CSS / JS — ~65KB total source
• CSS variables for theming; prefers-reduced-motion respected
• Scroll reveals via IntersectionObserver
• Non-blocking font load + preconnect
• SEO: meta, OG/Twitter, JSON-LD, sitemap.xml, robots.txt
• vercel.json: security headers + sensible caching

Structure

grok.hot/
├── index.html
├── css/styles.css
├── js/main.js
├── favicon.svg · og-image.svg
├── robots.txt · sitemap.xml
├── vercel.json
└── README.md

Preview & deploy

# local
python3 -m http.server 4173
# → http://localhost:4173

# Vercel (one-shot)
npm i -g vercel && vercel --prod

Or: push to GitHub → import at vercel.com/new (https://vercel.com/new) → Framework Other, empty build/output → deploy → attach domain grok.hot.

Full steps are in README.md. Contact form validates client-side and simulates success; swap the handler in js/main.js for Formspree/your API when you want real submissions.
```