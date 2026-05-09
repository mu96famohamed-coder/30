import { MetadataRoute } from 'next'
import { LANGS, HREFLANG_MAP } from '@/lib/i18n'
import content from '@/data/content.json'

const BASE = 'https://www.poain30.ae'

// ─────────────────────────────────────────────────────────────────────────────
// Path classification for SEO priority
// Single source of truth: every key under `page_content` in data/content.json
// is automatically included in the sitemap. New pages added to content.json
// appear in the sitemap without any code change here.
// ─────────────────────────────────────────────────────────────────────────────

/** 5 Main Hub pages — flagship landing pages that drive the bulk of organic
 *  traffic and act as parents in the internal-link graph. Priority 0.9. */
const MAIN_HUBS = new Set<string>([
  '/power-of-attorney',
  '/power-of-attorney/real-estate',
  '/power-of-attorney/vehicle',
  '/legal-notice',
  '/corporate/moa',
])

/** Informational / boilerplate pages. Priority 0.5. */
const INFO_PAGES = new Set<string>([
  '/faq',
  '/about',
  '/contact',
  '/what-is-tableegh',
  '/document-rejection',
  '/why-poa-rejected-dubai',
])

/** Paths served by a 301 redirect in next.config.mjs — must NOT appear in the
 *  sitemap. Search engines should only see the canonical destination.
 *  (Currently empty: the old /eviction-notice URL is no longer in content.json
 *  after the move to /legal-notice/eviction, so no filter is needed.) */
const REDIRECTED_PATHS = new Set<string>([])

/** Real routes that don't have a page_content entry (e.g. dynamically rendered
 *  index pages). Added to the sitemap alongside page_content keys. */
const EXTRA_PATHS: string[] = []

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function priorityFor(path: string): number {
  if (path === '/') return 1.0
  if (MAIN_HUBS.has(path)) return 0.9
  if (INFO_PAGES.has(path)) return 0.5
  return 0.8 // normal services
}

function changeFreqFor(path: string): 'weekly' | 'monthly' {
  if (path === '/') return 'weekly'
  return 'monthly'
}

/** Build the hreflang alternates map for a given site-relative path.
 *  `cleanPath` should be '' for the home page, otherwise start with '/'. */
function hreflangAlternates(cleanPath: string): Record<string, string> {
  return Object.fromEntries(
    LANGS.map((l) => [HREFLANG_MAP[l], `${BASE}/${l}${cleanPath}/`]),
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Sitemap
// ─────────────────────────────────────────────────────────────────────────────

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // 1. Pull every path directly from content.json — the single source of truth.
  const contentPaths = Object.keys(
    content.page_content as Record<string, unknown>,
  ).filter((p) => p.startsWith('/'))

  // 2. Merge in extras (routes that exist but have no page_content entry),
  //    dedupe, drop redirected paths, and sort for deterministic output.
  const allPaths = Array.from(new Set([...contentPaths, ...EXTRA_PATHS]))
    .filter((p) => !REDIRECTED_PATHS.has(p))
    .filter((p) => !p.includes('_old'))
    .sort()

  for (const path of allPaths) {
    const priority = priorityFor(path)
    const changeFrequency = changeFreqFor(path)
    const cleanPath = path === '/' ? '' : path

    for (const lang of LANGS) {
      entries.push({
        url: `${BASE}/${lang}${cleanPath}/`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: hreflangAlternates(cleanPath) } })
    }
  }

  return entries
}
