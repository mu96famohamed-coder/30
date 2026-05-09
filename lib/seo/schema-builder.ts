// ─────────────────────────────────────────────────────────────────────────────
// SCHEMA BUILDER — POA in 30
//
// Single source of truth for all JSON-LD schema generation.
// Pure server-side, prop-driven, statically rendered.
//
// Schema strategy (DRY pattern):
//
//   1. ProfessionalService (global)    — emitted once in app/[lang]/layout.tsx
//      Why ProfessionalService and not LegalService:
//      POA in 30 is a legal-document drafting + notarization-facilitation
//      agency. It is NOT a law firm and does NOT provide legal advice. Using
//      LegalService risks misclassification by Google (as a law firm) and
//      potential conflict with UAE Bar / Ministry of Justice rules. The
//      Schema.org type "ProfessionalService" is the correct, safer parent.
//
//   2. Service (per service page)      — emitted by ServicePage component
//   3. FAQPage (per page with FAQs)    — emitted by every page that has FAQs
//   4. BreadcrumbList (every sub-page) — emitted by ServicePage component
//   5. WebSite (homepage only)         — adds SearchAction sitelinks searchbox
//
// All schema is per-language (lang-specific @id, name, description). FAQPage
// emits the FAQ in the active language only — Google indexes per-URL.
// ─────────────────────────────────────────────────────────────────────────────

import { type Lang, t, getPageContent } from '@/lib/i18n'
import content from '@/data/content.json'

const BRAND = 'POA in 30'
const BRAND_URL = 'https://www.poain30.ae'
const BRAND_LOGO = 'https://www.poain30.ae/logo.png'
const BRAND_TELEPHONE = '+971509982268'
const BRAND_EMAIL = 'info@poain30.ae'

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function canonicalUrl(lang: Lang, path: string): string {
  const cleanPath = path === '/' ? '' : path
  return `${BRAND_URL}/${lang}${cleanPath}/`
}

function nameFor(path: string, lang: Lang): string {
  const pc = getPageContent(path) as Record<string, unknown> | null
  if (!pc) return BRAND
  const h1 =
    (pc[`h1_${lang}`] as string | undefined) ||
    (pc.h1_en as string | undefined)
  return h1 || BRAND
}

function descFor(path: string, lang: Lang): string {
  const pc = getPageContent(path) as Record<string, unknown> | null
  if (!pc) return ''
  const meta =
    (pc[`meta_${lang}`] as string | undefined) ||
    (pc.meta_en as string | undefined)
  return meta || ''
}

interface FAQItem {
  q: Record<string, string>
  a: Record<string, string>
}

interface BreadcrumbItem {
  name: string
  url: string
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. PROFESSIONAL SERVICE — Global schema (emitted in layout.tsx)
//    Uses ProfessionalService type to avoid LegalService misclassification.
// ─────────────────────────────────────────────────────────────────────────────

export function buildProfessionalServiceSchema(lang: Lang) {
  const name =
    lang === 'ar'
      ? 'POA in 30 — صياغة وتوثيق الوكالات في دبي'
      : 'POA in 30 — Power of Attorney Drafting & Notarization in Dubai'

  const description =
    lang === 'ar'
      ? 'خدمة تسهيل الصياغة والتوثيق القانوني في دبي. وكالات رسمية، تصديق وزارة الخارجية، إنذارات عدلية، وثائق شركات — أونلاين خلال 30 دقيقة عبر مكالمة فيديو من محاكم دبي أو وزارة العدل.'
      : 'Legal document drafting and notarization facilitation in Dubai. Power of Attorney, MOFA attestation, legal notices, corporate documents — online in 30 minutes via Dubai Courts or UAE Ministry of Justice video call.'

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BRAND_URL}/#business`,
    name,
    description,
    url: BRAND_URL,
    logo: BRAND_LOGO,
    image: BRAND_LOGO,
    telephone: BRAND_TELEPHONE,
    email: BRAND_EMAIL,
    priceRange: 'AED',
    inLanguage: lang,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Business Bay',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.185,
      longitude: 55.259,
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
      sameAs: 'https://www.wikidata.org/wiki/Q612',
    },
    serviceType: 'Legal Document Drafting and Notarization Facilitation',
    knowsAbout: [
      'Power of Attorney Drafting',
      'Online Notarization through Dubai Courts',
      'MOFA Attestation',
      'Embassy Attestation',
      'Legal Translation Arabic English',
      'Eviction Notices and Tableegh Service',
      'Rental Dispute Center (RDC) Filings',
      'Dubai Land Department (DLD) Procedures',
      'Last Will and Testament for Expats',
      'Corporate Documentation (MOA, Board Resolutions)',
      'Affidavits and Sworn Statements',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BRAND_TELEPHONE,
      email: BRAND_EMAIL,
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
      areaServed: 'AE',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '15:00',
      },
    ],
    sameAs: [`https://wa.me/${BRAND_TELEPHONE.replace(/\D/g, '')}`],
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SERVICE SCHEMA — per service page
// ─────────────────────────────────────────────────────────────────────────────

export function buildServiceSchema(lang: Lang, path: string) {
  const url = canonicalUrl(lang, path)
  const name = nameFor(path, lang)
  const description = descFor(path, lang)

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    inLanguage: lang,
    serviceType: 'Legal Document Drafting',
    provider: {
      '@type': 'ProfessionalService',
      '@id': `${BRAND_URL}/#business`,
      name: BRAND,
      url: BRAND_URL,
    },
    areaServed: {
      '@type': 'City',
      name: 'Dubai',
      sameAs: 'https://www.wikidata.org/wiki/Q612',
    },
    audience: {
      '@type': 'Audience',
      audienceType:
        lang === 'ar'
          ? 'الأفراد، المغتربون، الشركات، والمستثمرون في الإمارات'
          : 'Individuals, expats, businesses, and investors in the UAE',
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. FAQ PAGE SCHEMA — per page with FAQs
// ─────────────────────────────────────────────────────────────────────────────

export function buildFAQSchema(faqs: FAQItem[], lang: Lang) {
  if (!faqs || faqs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: t(f.q, lang),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(f.a, lang),
      },
    })),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. BREADCRUMB SCHEMA — per page
//    Builds from the URL path automatically.
// ─────────────────────────────────────────────────────────────────────────────

const BREADCRUMB_LABELS: Record<string, Record<Lang, string>> = {
  '/': { en: 'Home', ar: 'الرئيسية' },
  '/power-of-attorney': { en: 'Power of Attorney', ar: 'الوكالات الرسمية' },
  '/power-of-attorney/real-estate': {
    en: 'Real Estate POA',
    ar: 'وكالة العقارات',
  },
  '/power-of-attorney/vehicle': { en: 'Vehicle POA', ar: 'وكالة المركبات' },
  '/corporate': { en: 'Corporate', ar: 'الشركات' },
  '/attestation': { en: 'Attestation', ar: 'التصديق' },
  '/legal-notice': { en: 'Legal Notice', ar: 'الإنذارات العدلية' },
  '/legal-translation': { en: 'Legal Translation', ar: 'الترجمة القانونية' },
}

function breadcrumbLabel(segment: string, lang: Lang): string {
  if (BREADCRUMB_LABELS[segment]) {
    return BREADCRUMB_LABELS[segment][lang]
  }
  // Try to get from page content H1
  const pc = getPageContent(segment) as Record<string, unknown> | null
  if (pc) {
    const h1 = pc[`h1_${lang}`] as string | undefined
    if (h1) {
      // Take part before " — " or " | "
      return h1.split(/\s—\s|\s\|\s/)[0]
    }
  }
  // Fallback: titlecase the last segment
  const last = segment.split('/').filter(Boolean).pop() || ''
  return last
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function buildBreadcrumbSchema(lang: Lang, path: string) {
  if (path === '/') return null

  const segments = path.split('/').filter(Boolean)
  const items: BreadcrumbItem[] = [
    { name: BREADCRUMB_LABELS['/'][lang], url: canonicalUrl(lang, '/') },
  ]

  let current = ''
  for (const seg of segments) {
    current += `/${seg}`
    items.push({
      name: breadcrumbLabel(current, lang),
      url: canonicalUrl(lang, current),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. WEBSITE SCHEMA — homepage only, enables Google sitelinks searchbox
// ─────────────────────────────────────────────────────────────────────────────

export function buildWebsiteSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BRAND_URL}/#website`,
    url: BRAND_URL,
    name: BRAND,
    description:
      lang === 'ar'
        ? 'صياغة وتوثيق الوكالات الرسمية في دبي خلال 30 دقيقة'
        : 'Power of Attorney drafting and notarization in Dubai in 30 minutes',
    inLanguage: lang,
    publisher: { '@id': `${BRAND_URL}/#business` },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. ARTICLE SCHEMA — for explainer pages (FAQ, document-rejection,
//    why-poa-rejected-dubai, what-is-tableegh)
// ─────────────────────────────────────────────────────────────────────────────

const EXPLAINER_PATHS = new Set([
  '/faq',
  '/document-rejection',
  '/why-poa-rejected-dubai',
  '/what-is-tableegh',
  '/about',
])

export function isExplainerPath(path: string): boolean {
  return EXPLAINER_PATHS.has(path)
}

export function buildArticleSchema(lang: Lang, path: string) {
  const url = canonicalUrl(lang, path)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: nameFor(path, lang),
    description: descFor(path, lang),
    url,
    mainEntityOfPage: url,
    inLanguage: lang,
    author: {
      '@type': 'Organization',
      '@id': `${BRAND_URL}/#business`,
      name: BRAND,
    },
    publisher: { '@id': `${BRAND_URL}/#business` },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. UNIFIED PAGE SCHEMA BUILDER — call this once per page to get the full
//    @graph block of all relevant schema types.
// ─────────────────────────────────────────────────────────────────────────────

export function buildPageSchemaGraph(
  lang: Lang,
  path: string,
  faqs?: FAQItem[]
): Record<string, unknown> {
  const graph: unknown[] = []

  // Always include the global business
  graph.push(buildProfessionalServiceSchema(lang))

  // Homepage gets WebSite
  if (path === '/') {
    graph.push(buildWebsiteSchema(lang))
  }

  // Breadcrumbs for sub-pages
  const breadcrumb = buildBreadcrumbSchema(lang, path)
  if (breadcrumb) graph.push(breadcrumb)

  // Service vs Article — explainer paths get Article, the rest get Service
  if (isExplainerPath(path) || path === '/contact') {
    if (path !== '/contact') {
      graph.push(buildArticleSchema(lang, path))
    }
  } else {
    graph.push(buildServiceSchema(lang, path))
  }

  // FAQ if present
  if (faqs && faqs.length > 0) {
    const faqSchema = buildFAQSchema(faqs, lang)
    if (faqSchema) graph.push(faqSchema)
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// React component — drop-in replacement that emits the full graph as a single
// <script type="application/ld+json"> tag, which is the recommended pattern.
// ─────────────────────────────────────────────────────────────────────────────

export interface PageSchemaProps {
  lang: Lang
  path: string
  faqs?: FAQItem[]
}
