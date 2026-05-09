# Internal Linking Map — POA in 30

**Strategy:** Pillar Page Pattern with PageRank Sculpting.
The homepage links to **6 pillar pages only** (not all 49 service pages),
concentrating link equity on flagship landing pages. Sub-pages link upward
to their pillar and sideways to siblings — never directly to the homepage's
unrelated children.

The single source of truth in code is `lib/seo/internal-linking.ts`.
This document describes the same graph for human reference.

---

## Tier 0 — Homepage (`/`)

Links to **6 pillars** + 2 utility pages (`/faq`, `/contact`):

| # | Pillar | Path |
|---|---|---|
| 1 | Power of Attorney (master) | `/power-of-attorney` |
| 2 | E-Notary | `/e-notary` |
| 3 | MOFA Attestation | `/attestation/mofa` |
| 4 | Legal Notices | `/legal-notice` |
| 5 | Corporate (MOA hub) | `/corporate/moa` |
| 6 | Legal Translation | `/legal-translation` |
| — | FAQ | `/faq` |
| — | Contact | `/contact` |

---

## Tier 1 — Pillar pages

### `/power-of-attorney`
Children (10):
- `/power-of-attorney/general`
- `/power-of-attorney/special`
- `/power-of-attorney/real-estate`  (sub-pillar)
- `/power-of-attorney/vehicle`  (sub-pillar)
- `/power-of-attorney/bank`
- `/power-of-attorney/court`
- `/power-of-attorney/inheritance`
- `/power-of-attorney/mohre`
- `/power-of-attorney/company-formation`
- `/power-of-attorney/child-travel`

### `/e-notary`
Children (2):
- `/mobile-notary`
- `/emergency-notary`

### `/attestation/mofa`
Children (3):
- `/attestation/embassy`
- `/attestation/degree`
- `/attestation/marriage`

### `/legal-notice`
Children (5):
- `/legal-notice/eviction`
- `/legal-notice/poa-cancellation`
- `/poa-cancellation`
- `/what-is-tableegh`
- `/rdc-support`

### `/corporate/moa`
Children (6):
- `/corporate/moa-amendment`
- `/corporate/board-resolution`
- `/corporate/share-transfer`
- `/corporate/shareholder-agreement`
- `/corporate/contract`
- `/corporate/liquidation`

### `/legal-translation`
Children (1):
- `/legal-translation/court`

---

## Tier 2 — Sub-pillars (under `/power-of-attorney`)

### `/power-of-attorney/real-estate`
- `/power-of-attorney/real-estate/sale`
- `/power-of-attorney/real-estate/purchase`
- `/power-of-attorney/real-estate/management`
- `/power-of-attorney/property-gifting`

### `/power-of-attorney/vehicle`
- `/power-of-attorney/vehicle/sale`
- `/power-of-attorney/vehicle/export`
- `/power-of-attorney/vehicle/management`

---

## Standalone pages (no pillar parent)

These are linked from `/faq` and the footer only — they do not draw from
homepage equity, by design (low search volume, supporting content):

- `/affidavit`
- `/certified-true-copy`
- `/last-will-testament-dubai`
- `/document-rejection`
- `/why-poa-rejected-dubai`

---

## Cross-linking rules (every service page)

Every Tier-1 / Tier-2 / Tier-3 page must link to:
1. **Its parent pillar** (breadcrumb + in-content link)
2. **Up to 4 sibling pages** in a "Related services" rail
3. **`/faq`** + **`/contact`** (footer / sidebar)

These links satisfy three SEO goals at once:
- Distribute internal PageRank evenly across the cluster
- Reinforce topical authority on the parent pillar
- Reduce orphan pages (every page is reachable in ≤2 clicks from `/`)

---

## What we DO NOT do (anti-patterns)

- ❌ Link from `/` to all 49 pages (link soup → diluted equity)
- ❌ Link from any leaf page to siblings outside its pillar
- ❌ Reciprocal links between unrelated services
- ❌ "Related" rails with 8+ links (cap at 4)
- ❌ Hreflang chains to `enotarydubai.ae` — internal hreflang ONLY

---

## Implementation surface

| File | Role |
|---|---|
| `lib/seo/internal-linking.ts` | Source of truth — pillar → children map |
| `components/Footer.tsx` | Renders pillar links, not full sitemap |
| `components/ServicePage.tsx` | Renders breadcrumb + Related Services rail |
| `app/[lang]/page.tsx` | Homepage — links only to 6 pillars + utility |
