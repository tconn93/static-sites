# grokbuild.cloud

Professional single-page landing site for **GrokBuild** — cloud-based AI coding agents powered by xAI.

> Your GitHub repos. Grok's brain. Fully in the cloud.

## Stack

- Next.js 16 (App Router)
- TypeScript + Tailwind CSS
- Pure React typewriter animation (no external libs)
- File-based waitlist storage

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Key Routes

- `/` — Full landing page (Hero, How it Works, Features + Access Mask)
- `/api/waitlist` — POST endpoint for email capture

## Waitlist Storage

Emails are stored in `data/waitlist.json` (created on first submission).

For production use, you can later swap this for Supabase, PlanetScale, or any email service (ConvertKit, Buttondown, etc.).

## Deployment

### Vercel (recommended)

```bash
npm run build
```

Push to GitHub and import the project on [Vercel](https://vercel.com). The API route will work automatically.

### Self-hosted (Apache + Node)

Tyler’s current setup uses an Apache reverse proxy in front of a Node process on Proxmox.

1. Build the app:
   ```bash
   npm run build
   ```

2. Start the standalone server (or use PM2):
   ```bash
   npm run start
   # or
   pm2 start npm --name "grokbuild" -- start
   ```

3. Configure Apache to proxy:
   ```
   ProxyPreserveHost On
   ProxyPass / http://127.0.0.1:3000/
   ProxyPassReverse / http://127.0.0.1:3000/
   ```

4. Point Cloudflare to the origin (orange cloud on for full proxy).

Add environment variables if you later move waitlist storage.

## Environment Notes

- No extra dependencies beyond Next.js + Tailwind.
- Terminal animation is implemented with `useEffect` + `setTimeout`.
- All colors, fonts, and layout match the provided brand spec.

## Fonts

- Display / Logo / Terminal: **JetBrains Mono**
- Headings + Body: **Inter**

Loaded via `next/font/google`.

## OG / Social

Update `/public/og.png` with a proper 1200×630 image when available. Meta tags are already configured in `app/layout.tsx`.

## License

Internal project for Tyler Connor Agency (TCON) — 2026.
