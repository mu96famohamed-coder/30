# POA in 30 — Deployment Guide

## Pre-launch Checklist

### 1. Add your GA4 ID (required for analytics)
Open `data/content.json` and find:
```json
"ga": ""
```
Replace with your Measurement ID:
```json
"ga": "G-XXXXXXXXXX"
```

### 2. Deploy to Vercel

**Option A — Vercel Dashboard (easiest)**
1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Framework: Next.js (auto-detected)
4. Build Command: `next build` (default)
5. Click Deploy

**Option B — Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 3. Connect your domain
1. In Vercel dashboard → Project → Settings → Domains
2. Add `poain30.ae` and `www.poain30.ae`
3. Point your DNS to Vercel's nameservers (or add A/CNAME records)
4. HTTPS is automatic — Vercel handles SSL certificates

### 4. After deploy — Submit sitemap
1. Go to Google Search Console
2. Add property: `https://www.poain30.ae`
3. Verify via HTML tag or DNS
4. Submit sitemap: `https://www.poain30.ae/sitemap.xml`

### 5. Set up Google Business Profile
1. Go to business.google.com
2. Create profile for "POA in 30"
3. Category: "Legal Services"
4. Add your WhatsApp number and website URL

---

## Environment

- **Node.js**: 20+ (set in package.json engines)
- **Framework**: Next.js 14.2.29 (App Router)
- **Deployment**: Vercel (recommended)
- **Regions**: dxb1 (Dubai), fra1 (Frankfurt) — set in vercel.json

## Key Files

| File | Purpose |
|------|---------|
| `data/content.json` | All site content — single source of truth |
| `data/content.json → site.ga` | GA4 Measurement ID |
| `data/content.json → site.phone` | Phone/WhatsApp number |
| `app/[lang]/layout.tsx` | Root layout, metadata, fonts |
| `lib/seo/schema-builder.ts` | All JSON-LD schema |
| `app/sitemap.ts` | Dynamic sitemap (reads content.json) |
| `app/robots.ts` | robots.txt |
| `next.config.mjs` | Redirects + security headers |
| `middleware.ts` | Rate limiting + bot filtering |

## Post-Launch Monitoring

- **Core Web Vitals**: [pagespeed.web.dev](https://pagespeed.web.dev)
- **Schema validation**: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- **Search Console**: [search.google.com/search-console](https://search.google.com/search-console)
- **Indexing status**: `site:poain30.ae` in Google
