# CHANGES LOG — content.json v1 → v2 + Schema refactor

This release implements the Gemini SEO audit recommendations, plus 3
strategic additions (ProfessionalService schema, pillar-page linking,
site-disambiguation).

---

## SECTION A — Content fixes (`data/content.json`)

### A.1 — H1 updates (78 fields, 39 pages)

**Why:** Every H1 must contain the primary geo-keyword ("Dubai" / "دبي")
and stay under 70 chars. Three pages were missing the geo-keyword
entirely; 34 were over the length cap and were tightened.

#### Pages where "Dubai" / "دبي" was added

| Path | Field | Before | After |
|---|---|---|---|
| `/about` | `h1_en` | About POA in 30 — power of attorney drafting and notarization in 30 minutes | About POA in 30 — Power of Attorney Specialists in Dubai |
| `/about` | `h1_ar` | عن POA in 30 — صياغة وتوثيق الوكالات الرسمية في 30 دقيقة | عن POA in 30 — متخصصو الوكالات الرسمية في دبي |
| `/contact` | `h1_en` | Contact POA in 30 — start on WhatsApp, finish in 30 minutes | Contact POA in 30 in Dubai — start on WhatsApp, finish in 30 minutes |
| `/contact` | `h1_ar` | تواصل مع POA in 30 — ابدأ بواتساب، انتهِ في 30 دقيقة | تواصل مع POA in 30 في دبي — ابدأ بواتساب، انتهِ في 30 دقيقة |
| `/faq` | `h1_en` | Frequently Asked Questions — POA in 30 | POA Dubai FAQ — Frequently Asked Questions |
| `/faq` | `h1_ar` | الأسئلة الشائعة — POA in 30 | الأسئلة الشائعة عن الوكالات في دبي |

Plus 6 Arabic H1s on power-of-attorney sub-pages and others where "في دبي"
was missing (e.g. `/power-of-attorney/special`, `/power-of-attorney/vehicle`,
`/poa-cancellation`, `/legal-notice/eviction`, `/corporate/liquidation`,
`/power-of-attorney/mohre`).

#### Pages where the H1 was shortened to ≤70 chars

34 H1s were tightened. Pattern: `Service Name in Dubai — primary value-prop`.
Example representative diffs:

| Path | Before (chars) | After (chars) |
|---|---|---|
| `/e-notary` | E-Notary in Dubai — notarization by video call through Dubai Courts and the UAE Ministry of Justice (99) | E-Notary in Dubai — video-call notarization through Dubai Courts (64) |
| `/mobile-notary` | Mobile Notary in Dubai — in-person notarization at your location when video call is not enough (94) | Mobile Notary in Dubai — in-person notarization at your location (65) |
| `/attestation/mofa` | MOFA Attestation in Dubai — Ministry of Foreign Affairs certification for UAE and overseas use (94) | MOFA Attestation in Dubai — Ministry of Foreign Affairs certification (68) |
| `/power-of-attorney/vehicle/management` | Vehicle Management Power of Attorney in Dubai — registration, fines, salik, and day-to-day matters (98) | Vehicle Management POA in Dubai — registration, fines, day-to-day (66) |

The full list is canonical in the code: `data/content.json` v2.

### A.2 — Title updates (69 fields, 34 pages)

**Why:** Every title must contain the brand `POA in 30` for brand recall in
SERP, and stay under 60 chars. 34 titles were missing the brand.

Pattern adopted: `[Primary KW] | [Differentiator] | POA in 30`.

Sample diffs:

| Path | Before (chars) | After (chars) |
|---|---|---|
| `/attestation/mofa` | MOFA Attestation Dubai \| Ministry of Foreign Affairs (52) | MOFA Attestation Dubai \| UAE Foreign Affairs \| POA in 30 (56) |
| `/legal-notice/eviction` | Eviction Notice Dubai \| Article 25 Notice via Tableegh (54) | Eviction Notice Dubai \| Article 25 Notice \| POA in 30 (54) |
| `/power-of-attorney/real-estate/sale` | Property Sale Power of Attorney Dubai \| Sell from Abroad (56) | Property Sale POA Dubai \| Sell Remote \| POA in 30 (50) |
| `/power-of-attorney/real-estate` | Property Power of Attorney Dubai \| DLD-Compliant POA (52) | Real Estate POA Dubai \| DLD-Compliant \| POA in 30 (50) |
| `/corporate/shareholder-agreement` | Shareholder Agreement Dubai \| SHA Drafting \| POA in 30 (54) | (unchanged in v2 — already at 54 chars; verified) |

### A.3 — Validation results

After v2 applied:

- ✅ 49/49 pages have `Dubai` (or `دبي`) in `h1_en`/`h1_ar`
- ✅ 49/49 pages have `POA in 30` in `title_en`
- ✅ 0/49 titles exceed 60 chars
- ✅ 0/49 H1s exceed 70 chars
- ✅ 0/49 meta descriptions exceed 165 chars

`seo.h1.{en,ar}` and `seo.meta_title.{en,ar}` mirror the top-level fields.

---

## SECTION B — Schema markup refactor

### B.1 — Schema type change: `LegalService` → `ProfessionalService`

**Why:** POA in 30 is a legal-document drafting + notarization-facilitation
agency. It is **not** a law firm. Using `LegalService` risks Google
misclassifying the site as a law firm (placing it against major Dubai law
firms in SERP) and is a regulatory grey area under UAE Bar / Ministry of
Justice rules.

`ProfessionalService` is the correct, safer parent type for facilitation
work. Per-page `Service` schemas now have a `provider` of type
`ProfessionalService` (linked by `@id` to the global node).

### B.2 — Schema graph emitted per page

Single `<script type="application/ld+json">` per page, containing a
`@graph` of:

| Type | Where | When |
|---|---|---|
| `ProfessionalService` | `app/[lang]/layout.tsx` (global) | Every page |
| `WebSite` | Homepage | `/` only |
| `BreadcrumbList` | All sub-pages | When `path` is set on `<ServicePage>` |
| `Service` | Service pages | All paths NOT in `EXPLAINER_PATHS` |
| `Article` | Explainer pages | `/about`, `/faq`, `/document-rejection`, `/why-poa-rejected-dubai`, `/what-is-tableegh` |
| `FAQPage` | Pages with FAQs | When `faqItems` is supplied |

Schema language follows the URL: `/en/...` emits `inLanguage: "en"` schemas;
`/ar/...` emits `inLanguage: "ar"`.

### B.3 — Files

| File | Role |
|---|---|
| `lib/seo/schema-builder.ts` | NEW — pure functions, single source of truth for all schema |
| `components/PageSchema.tsx` | NEW — drop-in `<PageSchema lang path faqs />` for any page |
| `components/SchemaMarkup.tsx` | REFACTORED — now a backwards-compat facade that delegates to schema-builder. All previous exports preserved. The deprecated `LegalServiceSchema` export now emits a `Service` (provider: ProfessionalService) — kept for source compatibility, do not use in new code. |
| `app/[lang]/layout.tsx` | UPDATED — emits `ProfessionalService` global schema |

### B.4 — Per-page application

For each `<ServicePage>` call site (32 pages), a `path={'/...'}` prop was
added. This causes `ServicePage` to emit a richer `Service` schema (with
provider link, audience, areaServed) instead of the legacy 3-field shape.

For pages that do NOT use `<ServicePage>` (`/`, `/about`, `/contact`,
`/faq`), the explicit `<LegalServiceSchema lang path>` JSX was swapped to
`<ServiceSchema lang path>` — which now routes through the new
ProfessionalService-backed builder.

---

## SECTION C — Internal linking (Pillar Page Pattern)

### C.1 — New module

`lib/seo/internal-linking.ts` defines:

- `HOMEPAGE_PILLARS` — 6 paths (the only paths the homepage links to deeply)
- `PILLAR_CHILDREN` — Tier-1 → Tier-2 → Tier-3 mapping
- `siblingsOf(path)` — for "Related services" rails
- `pillarFor(path)` — reverse lookup

### C.2 — Why a pillar pattern

The previous build risked "link soup" — every page potentially linkable
from every other page through the global footer. Pillar-pattern linking:

1. Concentrates PageRank on 6 flagship landing pages
2. Builds topical authority for each pillar's keyword cluster
3. Avoids competing internal pages for the same keyword (cannibalization)
4. Keeps every page reachable in ≤2 clicks from `/`

Detailed graph in `docs/INTERNAL_LINKING_MAP.md`.

---

## SECTION D — Site disambiguation (anti-duplicate measures)

These are infrastructure-level guardrails to prevent Google from treating
`enotarydubai.ae` and `poain30.ae` as a duplicate-site network:

### D.1 — `lib/i18n.ts` HREFLANG_MAP

Hreflang remains internal-only (`en-AE` and `ar-AE` pointing to
`poain30.ae` paths only). **Never** reference enotarydubai.ae in any
hreflang alternate.

### D.2 — Sitemap & robots

- `app/sitemap.ts` — emits exactly 98 URLs (49 paths × 2 langs); zero
  references to the sister domain.
- `app/robots.ts` — disallows AI scrapers (`GPTBot`, `Google-Extended`,
  `CCBot`, `anthropic-ai`, `Claude-Web`); points to internal sitemap only.

### D.3 — Schema disambiguation

The `ProfessionalService` global schema uses a unique `@id`
(`https://www.poain30.ae/#business`) and a distinct `name` (`POA in 30 —
Power of Attorney Drafting & Notarization in Dubai`) — different from any
schema that may be deployed on `enotarydubai.ae`.

### D.4 — Operational separation (must be done at deploy time)

These are NOT in code; see `PRE_LAUNCH_CHECKLIST.md`:
- Vercel project for `poain30.ae` (different from enotarydubai's host)
- Different Google Search Console / Analytics property
- Different Google Business Profile
- (Recommended) Different display WhatsApp number / email

---

## SECTION E — Build verification

- `npx tsc --noEmit`: **0 errors**
- `npx next build`: **succeeds**, 98 static pages prerendered
- `sitemap.xml.body`: **98 `<url>` entries**, all internal hreflang
- `robots.txt`: clean
- TypeScript pre-existing bug in `middleware.ts` fixed
  (`Array.from(rateStore.entries())` instead of bare iterator)
- Pre-existing bug in 37 `page.tsx` files fixed
  (`'x-default'` moved INTO `alternates.languages`, not as sibling)
