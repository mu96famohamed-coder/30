// ─────────────────────────────────────────────────────────────────────────────
// SchemaMarkup — backwards-compatible facade.
//
// All schema generation logic now lives in lib/seo/schema-builder.ts.
// This file exists to keep existing imports working without route changes.
//
// Key change from previous version: every schema type is now backed by
// ProfessionalService (not LegalService). POA in 30 is a legal-document
// drafting + notarization-facilitation agency — NOT a law firm. Using
// LegalService risked Google misclassification and potential conflict with
// UAE Bar / Ministry of Justice rules.
// ─────────────────────────────────────────────────────────────────────────────

import { type Lang } from '@/lib/i18n'
import {
  buildProfessionalServiceSchema,
  buildServiceSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
  buildArticleSchema,
} from '@/lib/seo/schema-builder'

interface BreadcrumbItem {
  name: string
  url: string
}

interface FAQItem {
  q: Record<string, string>
  a: Record<string, string>
}

function emit(schema: unknown) {
  if (!schema) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BreadcrumbSchema — accepts either explicit items OR a path (preferred).
// ─────────────────────────────────────────────────────────────────────────────

export function BreadcrumbSchema({
  items,
  lang,
  path,
}: {
  items?: BreadcrumbItem[]
  lang?: Lang
  path?: string
}) {
  if (lang && path) {
    return emit(buildBreadcrumbSchema(lang, path))
  }
  if (items && items.length > 0) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    }
    return emit(schema)
  }
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQSchema — emits FAQPage schema in the active language.
// ─────────────────────────────────────────────────────────────────────────────

export function FAQSchema({ items, lang }: { items: FAQItem[]; lang: Lang }) {
  return emit(buildFAQSchema(items, lang))
}

// ─────────────────────────────────────────────────────────────────────────────
// ServiceSchema — emits Service schema for a given path.
// ─────────────────────────────────────────────────────────────────────────────

export function ServiceSchema(
  props:
    | { lang: Lang; path: string }
    | { name: string; url: string; description: string },
) {
  if ('path' in props) {
    return emit(buildServiceSchema(props.lang, props.path))
  }
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: props.name,
    url: props.url,
    description: props.description,
    provider: {
      '@type': 'ProfessionalService',
      name: 'POA in 30',
      url: 'https://www.poain30.ae',
    },
    areaServed: { '@type': 'City', name: 'Dubai' },
  }
  return emit(schema)
}

// ─────────────────────────────────────────────────────────────────────────────
// ArticleSchema — for explainer / blog-style pages.
// ─────────────────────────────────────────────────────────────────────────────

export function ArticleSchema(props: {
  lang?: Lang
  path?: string
  headline?: string
  url?: string
  datePublished?: string
  dateModified?: string
  description?: string
}) {
  if (props.lang && props.path) {
    const schema = buildArticleSchema(props.lang, props.path) as Record<
      string,
      unknown
    >
    if (props.datePublished) schema.datePublished = props.datePublished
    if (props.dateModified) schema.dateModified = props.dateModified
    return emit(schema)
  }
  if (props.headline && props.url) {
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: props.headline,
      url: props.url,
      mainEntityOfPage: props.url,
      author: {
        '@type': 'Organization',
        name: 'POA in 30',
        url: 'https://www.poain30.ae',
      },
      publisher: { '@id': 'https://www.poain30.ae/#business' },
    }
    if (props.description) schema.description = props.description
    if (props.datePublished) schema.datePublished = props.datePublished
    if (props.dateModified) schema.dateModified = props.dateModified
    return emit(schema)
  }
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// LocalBusinessSchema — emits the global ProfessionalService schema.
// Kept under this name for backwards-compat with imports in [lang]/layout.tsx.
// (POA in 30 is a ProfessionalService, not a LegalService — see schema-builder.)
// ─────────────────────────────────────────────────────────────────────────────

export function LocalBusinessSchema({
  lang = 'en' as Lang,
}: { lang?: Lang } = {}) {
  return emit(buildProfessionalServiceSchema(lang))
}
