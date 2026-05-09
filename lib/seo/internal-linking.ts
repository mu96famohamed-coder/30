// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL LINKING — Pillar Page Strategy
//
// Avoids "link soup" by enforcing a hierarchical link graph:
//
//   Homepage  →  6 pillar pages only
//
//   /power-of-attorney         (pillar)
//      ├── /power-of-attorney/general
//      ├── /power-of-attorney/special
//      ├── /power-of-attorney/real-estate    (sub-pillar)
//      │      ├── /power-of-attorney/real-estate/sale
//      │      ├── /power-of-attorney/real-estate/purchase
//      │      ├── /power-of-attorney/real-estate/management
//      │      └── /power-of-attorney/property-gifting
//      ├── /power-of-attorney/vehicle        (sub-pillar)
//      │      ├── /power-of-attorney/vehicle/sale
//      │      ├── /power-of-attorney/vehicle/export
//      │      └── /power-of-attorney/vehicle/management
//      ├── /power-of-attorney/bank
//      ├── /power-of-attorney/court
//      ├── /power-of-attorney/inheritance
//      ├── /power-of-attorney/mohre
//      ├── /power-of-attorney/company-formation
//      └── /power-of-attorney/child-travel
//
//   /e-notary                  (pillar)
//      ├── /mobile-notary
//      └── /emergency-notary
//
//   /attestation/mofa          (pillar)
//      ├── /attestation/embassy
//      ├── /attestation/degree
//      └── /attestation/marriage
//
//   /legal-notice              (pillar)
//      ├── /legal-notice/eviction
//      ├── /legal-notice/poa-cancellation
//      ├── /poa-cancellation
//      ├── /what-is-tableegh
//      └── /rdc-support
//
//   /corporate/moa             (pillar — corporate suite)
//      ├── /corporate/moa-amendment
//      ├── /corporate/board-resolution
//      ├── /corporate/share-transfer
//      ├── /corporate/shareholder-agreement
//      ├── /corporate/contract
//      └── /corporate/liquidation
//
//   /legal-translation         (utility)
//      └── /legal-translation/court
//
//   Standalone:
//      /affidavit, /certified-true-copy, /last-will-testament-dubai,
//      /document-rejection, /why-poa-rejected-dubai
//
// Every page also gets cross-links to /faq and /contact.
// ─────────────────────────────────────────────────────────────────────────────

export const HOMEPAGE_PILLARS: ReadonlyArray<string> = [
  '/power-of-attorney',
  '/e-notary',
  '/attestation/mofa',
  '/legal-notice',
  '/corporate/moa',
  '/legal-translation',
] as const

export const PILLAR_CHILDREN: Readonly<Record<string, string[]>> = {
  '/power-of-attorney': [
    '/power-of-attorney/general',
    '/power-of-attorney/special',
    '/power-of-attorney/real-estate',
    '/power-of-attorney/vehicle',
    '/power-of-attorney/bank',
    '/power-of-attorney/court',
    '/power-of-attorney/inheritance',
    '/power-of-attorney/mohre',
    '/power-of-attorney/company-formation',
    '/power-of-attorney/child-travel',
  ],
  '/power-of-attorney/real-estate': [
    '/power-of-attorney/real-estate/sale',
    '/power-of-attorney/real-estate/purchase',
    '/power-of-attorney/real-estate/management',
    '/power-of-attorney/property-gifting',
  ],
  '/power-of-attorney/vehicle': [
    '/power-of-attorney/vehicle/sale',
    '/power-of-attorney/vehicle/export',
    '/power-of-attorney/vehicle/management',
  ],
  '/e-notary': ['/mobile-notary', '/emergency-notary'],
  '/attestation/mofa': [
    '/attestation/embassy',
    '/attestation/degree',
    '/attestation/marriage',
  ],
  '/legal-notice': [
    '/legal-notice/eviction',
    '/legal-notice/poa-cancellation',
    '/poa-cancellation',
    '/what-is-tableegh',
    '/rdc-support',
  ],
  '/corporate/moa': [
    '/corporate/moa-amendment',
    '/corporate/board-resolution',
    '/corporate/share-transfer',
    '/corporate/shareholder-agreement',
    '/corporate/contract',
    '/corporate/liquidation',
  ],
  '/legal-translation': ['/legal-translation/court'],
} as const

/** Reverse lookup: which pillar (if any) a given path belongs under. */
export function pillarFor(path: string): string | null {
  for (const [pillar, children] of Object.entries(PILLAR_CHILDREN)) {
    if (children.includes(path)) return pillar
  }
  return null
}

/** Cross-links every service page should expose (faq + contact). */
export const UTILITY_LINKS: ReadonlyArray<string> = ['/faq', '/contact'] as const

/** Sibling pages — lateral links between same-tier service pages.
 *  Used in "Related services" rails on a page. */
export function siblingsOf(path: string): string[] {
  const pillar = pillarFor(path)
  if (!pillar) return []
  const siblings = (PILLAR_CHILDREN[pillar] || []).filter((p) => p !== path)
  return siblings.slice(0, 4) // cap at 4 to avoid link bloat
}
