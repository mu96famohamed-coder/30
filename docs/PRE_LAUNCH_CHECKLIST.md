# PRE-LAUNCH CHECKLIST — POA in 30

Run this checklist top-to-bottom before pointing the `poain30.ae` domain
at production. Do **not** skip steps marked **P0** — they directly affect
Google's perception of the site relative to the sibling `enotarydubai.ae`.

---

## P0 — Domain & DNS

- [ ] **Buy `poain30.ae`** through an AEDA-accredited registrar
      (e.g. AEserver, GoDaddy AE reseller, Etisalat). Personal trade
      license / Emirates ID required.
- [ ] Point DNS to **Vercel** (do NOT use the same Cloudflare account /
      Cloudflare proxy as `enotarydubai.ae`). Use Vercel's nameservers OR
      `A` / `CNAME` records to Vercel's anycast IPs.
- [ ] Verify the public IP for `poain30.ae` differs from
      `enotarydubai.ae` (`dig +short poain30.ae` and compare).
- [ ] HSTS will be applied automatically by Vercel; confirm
      `Strict-Transport-Security` header in production response.

## P0 — Vercel project setup

- [ ] Create a fresh Vercel project (do not fork `enotarydubai.ae`'s
      project). Connect to the `poain30` GitHub repo.
- [ ] Set production domain to `poain30.ae` (and the canonical alias to
      `www.poain30.ae` — confirm `next.config.mjs` redirects naked → www).
- [ ] Trigger first build, confirm exit code 0.
- [ ] Confirm 98 routes prerendered in build output
      (49 paths × 2 langs).

## P0 — Search Console & Analytics (separate properties)

- [ ] Add `poain30.ae` to Google Search Console as a **new property**
      (different from `enotarydubai.ae`). Verify via DNS TXT or HTML tag.
- [ ] Submit `https://www.poain30.ae/sitemap.xml` in Search Console.
- [ ] Add `poain30.ae` to Bing Webmaster Tools (separate property).
- [ ] Create a separate **Google Analytics 4** property (do NOT reuse
      enotarydubai's). Paste the Measurement ID into
      `data/content.json` → `site.ga`.
- [ ] Add `poain30.ae` to Google Business Profile (separate listing).
      Use a distinct display address suffix or suite number if practical.

## P1 — Site disambiguation from enotarydubai.ae

- [ ] **No hreflang alternates** point from `poain30.ae` to
      `enotarydubai.ae` (verified — internal-only HREFLANG_MAP).
- [ ] Footer link from `poain30.ae` to `enotarydubai.ae` (if any) is a
      single, plain anchor — not present in every page's footer.
- [ ] The two sites use **distinct** brand names (POA in 30 vs E-Notary
      Dubai) in `<title>`, schema `name`, OG `siteName`. (Verified.)
- [ ] (Recommended) Distinct customer phone / WhatsApp display number.
      The functional WhatsApp can be the same backend, but the displayed
      number on the site should differ to avoid duplicate-business
      signals.
- [ ] (Recommended) Distinct support email
      (`info@poain30.ae` not `info@enotarydubai.ae`).

## P1 — Schema markup validation

- [ ] Test 5 representative URLs in Google Rich Results Test:
      `/`, `/power-of-attorney`, `/power-of-attorney/real-estate/sale`,
      `/legal-notice`, `/faq`. Each should report:
      - 1 × `ProfessionalService` (global)
      - 1 × `BreadcrumbList` (sub-pages)
      - 1 × `Service` OR `Article` (depending on path)
      - 1 × `FAQPage` (where applicable)
- [ ] Run all 49 paths through Schema.org Validator
      (`https://validator.schema.org/`) — must report **0 errors**.
- [ ] Confirm no remaining `LegalService` types are emitted to HTML
      (`curl -s https://www.poain30.ae/en/ | grep -i 'LegalService'`
      should return nothing).

## P1 — On-page SEO

- [ ] All 49 EN titles are ≤60 chars and contain `POA in 30`. ✅ verified
- [ ] All 49 EN H1s contain `Dubai` (or brand). ✅ verified
- [ ] All 49 AR H1s contain `دبي` (or brand). ✅ verified
- [ ] All meta descriptions are 120–165 chars. ✅ verified
- [ ] No price strings appear in production HTML. (Verify by
      `curl ... | grep -E 'AED [0-9]'` — should return only government
      fees: `AED 150` for MOFA and `3.5%` for RDC, which are educational
      not service prices.)

## P1 — Sitemap & robots

- [ ] `https://www.poain30.ae/sitemap.xml` returns 98 `<url>` entries.
- [ ] `https://www.poain30.ae/robots.txt` references the sitemap and
      disallows AI scrapers.
- [ ] No `/api/` paths appear in the sitemap.
- [ ] Hreflang per URL points only to `poain30.ae` alternates
      (`en-AE`, `ar-AE`, `x-default` → `/en/...`).

## P2 — Performance

- [ ] Run a Lighthouse audit (mobile + desktop) on 3 pages:
      `/`, `/power-of-attorney`, `/power-of-attorney/real-estate/sale`.
      Target: Performance ≥ 85, SEO = 100, Accessibility ≥ 90.
- [ ] Verify no flash-of-unstyled-Arabic (font preconnect already in
      `app/[lang]/layout.tsx`).
- [ ] Verify CSP header still present (Edge middleware emits it).

## P2 — Content QA

- [ ] No `Apostille` mentioned anywhere as a service. (Verified —
      removed in earlier batch.)
- [ ] No "VIP" language in `/mobile-notary`. (Verified — replaced with
      "discreet on-site service".)
- [ ] The unified notarization sentence is present where relevant:
      "Notarization happens through Dubai Courts or the UAE Ministry of
      Justice via a video call".
- [ ] No "إبرام" used in conjunction with وكالة (it's reserved for
      contracts; we use "إصدار" / "توثيق").

## P2 — Indexing rollout (after launch)

- [ ] Day 0: deploy + submit sitemap. Do NOT request indexing for all
      49 URLs at once.
- [ ] Day 0–7: request indexing only for 6 pillars + `/`.
- [ ] Day 7–30: monitor Search Console "Pages → Indexed". Expect ≥40
      indexed by day 30. Below 20 indicates a schema/internal-linking
      problem worth investigating.
- [ ] Day 0–14: do **not** start backlink building. Let Google index
      organically first.
- [ ] After 30 days: review Search Console queries → identify lowest CTR
      titles → iterate.

---

## Helper commands

```bash
# Verify build is reproducible
cd poain30 && npm ci && npx tsc --noEmit && npx next build

# Verify sitemap
curl -s https://www.poain30.ae/sitemap.xml | grep -c '<url>'   # → 98

# Verify schema on a sample page
curl -s https://www.poain30.ae/en/power-of-attorney/real-estate/sale/ \
  | grep -A 2 'application/ld+json' | head -20

# Confirm domains have distinct IPs
dig +short poain30.ae       # Vercel anycast
dig +short enotarydubai.ae  # Whatever sibling host uses
```
