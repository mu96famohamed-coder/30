# POA in 30 — Production Codebase

**Status:** SEO-finalized v2, schema migrated to ProfessionalService, ready
for design polish and deploy.

## What's in this build

- **49 pages** (EN + AR) — content drafted, reviewed, SEO-tightened
- **ProfessionalService schema** (replaces LegalService) — see
  `lib/seo/schema-builder.ts`
- **Pillar-pattern internal linking** — see
  `lib/seo/internal-linking.ts` and `docs/INTERNAL_LINKING_MAP.md`
- **Anti-duplicate measures** for sibling site `enotarydubai.ae` — see
  `docs/CHANGES_LOG.md` Section D and `docs/PRE_LAUNCH_CHECKLIST.md`

## Quick start

```bash
npm install
npm run dev               # http://localhost:3000/en/
```

## Build & verify

```bash
npx tsc --noEmit          # 0 errors expected
npx next build            # 104 static pages expected
python3 scripts/validate-seo.py  # all green expected
```

## Documentation

| File | Purpose |
|---|---|
| `docs/CHANGES_LOG.md` | All v1 → v2 changes |
| `docs/INTERNAL_LINKING_MAP.md` | Pillar-pattern link graph |
| `docs/PRE_LAUNCH_CHECKLIST.md` | Pre-deploy verification steps |
| `docs/DEPLOYMENT_GUIDE.md` | Domain purchase → live in 4 hours |

## Stack

- Next.js 14 App Router, TypeScript, Tailwind
- Static generation for all 98 routes (49 paths × 2 langs)
- Edge middleware for rate-limiting / bot-filter / CSP
- No client-side JS for SEO-critical content
