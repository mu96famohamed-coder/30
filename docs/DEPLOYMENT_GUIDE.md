# DEPLOYMENT GUIDE — POA in 30

Step-by-step from "I just decided to buy the domain" to "the site is
live at `https://www.poain30.ae`". Estimated wall-clock time: **2–4 hours**
(most of which is DNS propagation, which you can't speed up).

---

## STEP 1 — Buy the domain (`poain30.ae`)

`.ae` domains are managed by **AEDA** (TDRA's Domain Authority) and can
only be sold through accredited registrars.

### Recommended registrars (any of these is fine):

| Registrar | Notes |
|---|---|
| **AEserver** | UAE-based, well-known, supports card + bank transfer |
| **GoDaddy** | International, easy if you already have an account |
| **Etisalat Domains** | Direct, but slower interface |
| **Public Domain Registry (PDR)** | Cheapest, supports bulk |

### What you'll need to provide:

- **Trade license** OR **Emirates ID** (individual `.ae` ownership)
- Working email + UAE phone number
- Payment: ~AED 100–300 / year typical retail

### Process:

1. Search for `poain30.ae`. If available, add to cart.
2. Choose **2-year minimum** (`.ae` registrations are cheap and reduce
   admin overhead).
3. Skip privacy/proxy add-ons — `.ae` whois is already restricted.
4. Skip "Premium DNS" / "Email hosting" — Vercel handles DNS, and you
   have your own email already (`info@poain30.ae` can be configured later
   via Zoho / Google Workspace / Forwardmail).
5. Pay. Wait for confirmation email (usually 5–30 minutes).

---

## STEP 2 — Set up Vercel

If you don't already have a Vercel account, sign up at vercel.com using
your GitHub account.

### 2a — Push the project to GitHub (if not already)

```bash
cd /path/to/poain30
git init
git add -A
git commit -m "Initial commit — POA in 30 v2 with SEO + ProfessionalService schema"
git branch -M main

# Create a NEW empty repo on GitHub named "poain30" (private)
git remote add origin git@github.com:<your-handle>/poain30.git
git push -u origin main
```

### 2b — Import the repo into Vercel

1. https://vercel.com/new → "Import Git Repository" → select `poain30`.
2. Framework: should auto-detect **Next.js**. Build command:
   `npm run build`. Output: `.next` (default).
3. Environment variables: none required for initial deploy.
4. Click **Deploy**. First build takes ~2–4 minutes.
5. Vercel will give you a `*.vercel.app` URL — visit it, confirm the
   site loads. (It will load on the placeholder domain until DNS is set
   up next.)

---

## STEP 3 — Connect `poain30.ae` to Vercel

### 3a — Add the domain in Vercel

1. In your Vercel project → **Settings → Domains**.
2. Add `poain30.ae` (without `www.`). Vercel will show DNS records to
   set up.
3. Add `www.poain30.ae` as a second domain. Vercel will mark one as
   "Redirects to" the other. **Pick `www.poain30.ae` as canonical**
   (this matches `next.config.mjs` and the schema URLs).

### 3b — Configure DNS at your registrar

Vercel will display **specific** DNS records based on your account.
The standard setup is:

| Record type | Host | Value | TTL |
|---|---|---|---|
| `A` | `@` (apex) | `76.76.21.21` | 3600 |
| `CNAME` | `www` | `cname.vercel-dns.com` | 3600 |

(If your registrar doesn't allow CNAME on root `@`, use Vercel's
nameservers instead — `ns1.vercel-dns.com` / `ns2.vercel-dns.com` —
configured at the registrar level. This delegates ALL DNS to Vercel,
which is fine.)

**At your registrar's control panel** (the exact UI varies):
1. Find "DNS Management" / "DNS Zone" / "Name servers".
2. Add the records above.
3. Save.

### 3c — Wait for DNS propagation

- Typical: **5–30 minutes** for Vercel to detect the records.
- Worst case: **48 hours** if you went the nameserver route.
- Check status: `dig +short poain30.ae` → should return `76.76.21.21`
  (or similar Vercel anycast IP).
- In Vercel → Domains, the status will flip from "Invalid Configuration"
  to "Valid Configuration" once DNS is correct.

### 3d — SSL certificate

Vercel issues Let's Encrypt SSL automatically once DNS is valid. No
action needed. Visit `https://www.poain30.ae` after ~5 minutes — you
should see a green padlock.

---

## STEP 4 — Verify the live site

Run through `PRE_LAUNCH_CHECKLIST.md`. The minimum smoke test:

```bash
# 1. HTTPS works
curl -I https://www.poain30.ae/en/ | grep "HTTP/"
# expect: HTTP/2 200

# 2. Apex redirects to www
curl -I https://poain30.ae/ | grep -i location
# expect: location: https://www.poain30.ae/...

# 3. Sitemap is accessible
curl -s https://www.poain30.ae/sitemap.xml | grep -c '<url>'
# expect: 98

# 4. Robots.txt is correct
curl -s https://www.poain30.ae/robots.txt | head -3
# expect: User-Agent: *  / Allow: /

# 5. Schema is rendered on a page
curl -s https://www.poain30.ae/en/power-of-attorney/ \
  | grep -c 'application/ld+json'
# expect: ≥1

# 6. No LegalService leakage
curl -s https://www.poain30.ae/en/ | grep -c '"LegalService"'
# expect: 0

# 7. ProfessionalService is present
curl -s https://www.poain30.ae/en/ | grep -c '"ProfessionalService"'
# expect: ≥1
```

If any of those fail, do NOT proceed to Step 5. Investigate first.

---

## STEP 5 — Search Console & Analytics

### Search Console (Google)

1. https://search.google.com/search-console → **Add Property** → URL prefix
2. Enter `https://www.poain30.ae/`.
3. Verify via **DNS TXT record** (most reliable). Add the TXT record at
   your registrar's DNS panel. Wait 5 min. Click Verify.
4. Once verified → **Sitemaps** → submit
   `https://www.poain30.ae/sitemap.xml`.
5. Wait 24 hours, then check **Pages → Indexed**.

### Bing Webmaster Tools

1. https://www.bing.com/webmasters → Add site.
2. **Easiest**: import from Google Search Console (one click).
3. Submit the same sitemap.

### Google Analytics (GA4)

1. https://analytics.google.com → Admin → Create new property.
   Name: `POA in 30`. Time zone: `Asia/Dubai`. Currency: `AED`.
2. Create a Web data stream for `https://www.poain30.ae`.
3. Copy the **Measurement ID** (`G-XXXXXXXXXX`).
4. Update `data/content.json`:
   ```json
   "site": {
     ...
     "ga": "G-XXXXXXXXXX",
     ...
   }
   ```
5. Commit + push. Vercel auto-deploys. The `<Script>` tag in
   `app/[lang]/layout.tsx` will start firing analytics.

### Google Business Profile

1. https://www.google.com/business/ → Manage now.
2. Create a **new** profile (do NOT reuse `enotarydubai.ae`'s).
   Business name: `POA in 30`.
3. Category: `Notary public` (closest match) or `Legal services`.
4. Service area: Dubai.
5. Verify via postcard / phone (takes ~1 week for postcard).

---

## STEP 6 — Post-launch monitoring (first 30 days)

| Day | Action | Where |
|---|---|---|
| 0 | Deploy + submit sitemap | Vercel + GSC |
| 1–3 | Check GSC indexing status — pillars first | Search Console |
| 7 | Should see ≥10 pages indexed | Search Console |
| 14 | Lighthouse audit on 3 pages | DevTools |
| 21 | Should see ≥30 pages indexed | Search Console |
| 30 | Should see ≥40 pages indexed; review queries | Search Console |

If indexing stalls below 20 by day 30 → check schema validation,
internal linking depth, and orphan-page detector.

---

## ROLLBACK PLAN

If something goes catastrophically wrong post-launch:

1. **Site is unreachable**: revert the last deploy in Vercel
   (Deployments → previous → "Promote to Production"). Takes ~30 sec.
2. **Domain points wrong**: revert DNS at registrar to the old A/CNAME
   values. Wait DNS TTL (3600 sec).
3. **Schema is breaking SERP**: temporarily set `<meta name="robots"
   content="noindex">` in `app/[lang]/layout.tsx`, redeploy, fix the
   schema, remove noindex.
