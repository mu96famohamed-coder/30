// ─────────────────────────────────────────────────────────────────────────────
// PageSchema — single drop-in component that emits the full schema graph
// for a given page (ProfessionalService + Service/Article + Breadcrumb + FAQ).
//
// Usage from any page:
//
//   <PageSchema lang={lang} path="/power-of-attorney/real-estate" faqs={faqs} />
//
// Pure server component, statically rendered, zero runtime cost.
// ─────────────────────────────────────────────────────────────────────────────

import { type Lang } from '@/lib/i18n'
import { buildPageSchemaGraph } from '@/lib/seo/schema-builder'

interface FAQItem {
  q: Record<string, string>
  a: Record<string, string>
}

interface Props {
  lang: Lang
  path: string
  faqs?: FAQItem[]
}

export default function PageSchema({ lang, path, faqs }: Props) {
  const graph = buildPageSchemaGraph(lang, path, faqs)
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
