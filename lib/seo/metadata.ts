import type { Metadata } from 'next'

// ─────────────────────────────────────────────────────────────────────────────
// Per-page social metadata (Open Graph + Twitter).
//
// Next.js does not merge openGraph/twitter across layout → page: a page that
// omits them inherits the layout's values, which are the homepage's title and
// URL. This helper copies the page's OWN title, description and canonical URL
// into openGraph/twitter so a shared link (WhatsApp, LinkedIn, X) shows the
// page itself. It never changes title, description, canonical or hreflang.
// ─────────────────────────────────────────────────────────────────────────────

const OG_IMAGE = {
  url: 'https://www.poain30.ae/og-default.png',
  width: 1200,
  height: 630,
  alt: 'POA in 30 — Power of Attorney Dubai',
}

function asText(value: unknown): string | undefined {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'absolute' in value) {
    const abs = (value as { absolute?: unknown }).absolute
    return typeof abs === 'string' ? abs : undefined
  }
  return undefined
}

export function withSocial(meta: Metadata): Metadata {
  const canonical = asText(meta.alternates?.canonical as unknown)
  const title = asText(meta.title as unknown)
  const description = typeof meta.description === 'string' ? meta.description : undefined
  if (!canonical || !title) return meta

  const isAr = canonical.includes('/ar/')
  return {
    ...meta,
    openGraph: {
      siteName: 'POA in 30',
      type: 'website',
      locale: isAr ? 'ar_AE' : 'en_AE',
      images: [OG_IMAGE],
      ...(meta.openGraph || {}),
      title,
      ...(description ? { description } : {}),
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      images: [OG_IMAGE.url],
      ...(meta.twitter || {}),
      title,
      ...(description ? { description } : {}),
    },
  }
}
