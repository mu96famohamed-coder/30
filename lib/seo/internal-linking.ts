// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL LINKING — POA authority graph
//
// The primary authority flow is deliberately POA-only:
// Homepage → POA hub + Online POA → transaction-specific POA pages.
// Legacy non-POA pages remain live for URL preservation but are not promoted
// from the primary homepage/nav/footer authority graph.
// ─────────────────────────────────────────────────────────────────────────────

export const HOMEPAGE_PILLARS: ReadonlyArray<string> = [
  '/power-of-attorney',
  '/e-notary',
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
    '/power-of-attorney/company-management',
    '/power-of-attorney/child-travel',
  ],
  '/power-of-attorney/real-estate': [
    '/power-of-attorney/real-estate/sale',
    '/power-of-attorney/real-estate/purchase',
    '/power-of-attorney/real-estate/management',
    '/power-of-attorney/real-estate/handover',
    '/power-of-attorney/property-gifting',
  ],
  '/power-of-attorney/vehicle': [
    '/power-of-attorney/vehicle/sale',
    '/power-of-attorney/vehicle/export',
    '/power-of-attorney/vehicle/management',
  ],
  '/e-notary': [
    '/poa-cancellation',
    '/why-poa-rejected-dubai',
    '/document-rejection',
  ],
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

/** Transaction-specific related links for POA type pages. Every target is an
 *  existing content route; keys without an entry fall back to pillar siblings. */
const CONTEXTUAL_RELATED: Record<string, string[]> = {
  "/power-of-attorney/general": [
    "/power-of-attorney/special",
    "/power-of-attorney/bank",
    "/power-of-attorney/real-estate",
    "/poa-cancellation"
  ],
  "/power-of-attorney/special": [
    "/power-of-attorney/general",
    "/power-of-attorney/real-estate/sale",
    "/power-of-attorney/vehicle/sale",
    "/power-of-attorney/company-formation"
  ],
  "/power-of-attorney/bank": [
    "/power-of-attorney/special",
    "/power-of-attorney/company-formation",
    "/power-of-attorney/general",
    "/poa-cancellation"
  ],
  "/power-of-attorney/company-formation": [
    "/power-of-attorney/company-management",
    "/power-of-attorney/bank",
    "/power-of-attorney/mohre",
    "/power-of-attorney/special"
  ],
  "/power-of-attorney/company-management": [
    "/power-of-attorney/company-formation",
    "/power-of-attorney/bank",
    "/power-of-attorney/mohre",
    "/power-of-attorney/special"
  ],
  "/power-of-attorney/court": [
    "/power-of-attorney/special",
    "/poa-cancellation",
    "/e-notary",
    "/power-of-attorney/inheritance"
  ],
  "/power-of-attorney/child-travel": [
    "/power-of-attorney/special",
    "/e-notary",
    "/power-of-attorney/general"
  ],
  "/power-of-attorney/inheritance": [
    "/power-of-attorney/court",
    "/power-of-attorney/special",
    "/power-of-attorney/real-estate"
  ],
  "/power-of-attorney/mohre": [
    "/power-of-attorney/company-formation",
    "/power-of-attorney/court",
    "/power-of-attorney/special"
  ],
  "/power-of-attorney/real-estate/handover": [
    "/power-of-attorney/real-estate/purchase",
    "/power-of-attorney/real-estate/management",
    "/power-of-attorney/real-estate/sale",
    "/power-of-attorney/real-estate"
  ],
  "/power-of-attorney/property-gifting": [
    "/power-of-attorney/real-estate",
    "/power-of-attorney/real-estate/sale",
    "/power-of-attorney/real-estate/management"
  ]
}

/** Sibling pages — lateral links between same-tier service pages.
 *  Used in "Related services" rails on a page. */
export function siblingsOf(path: string): string[] {
  if (CONTEXTUAL_RELATED[path]) return CONTEXTUAL_RELATED[path].slice(0, 4)
  const pillar = pillarFor(path)
  if (!pillar) return []
  const siblings = (PILLAR_CHILDREN[pillar] || []).filter((p) => p !== path)
  return siblings.slice(0, 4) // cap at 4 to avoid link bloat
}
