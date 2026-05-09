// ─────────────────────────────────────────────────────────────────────────────
// RelatedServicesRail — pillar-pattern sibling links
//
// Renders up to N sibling pages from the same pillar cluster + a link
// upward to the parent pillar. Intentionally minimal markup — the SKILL
// will refine the visual presentation.
//
// Usage:
//   <RelatedServicesRail lang={lang} path={path} />
//
// Behavior:
//   - If `path` belongs to a pillar cluster, shows up to 4 siblings.
//   - Always exposes a link back to the parent pillar.
//   - If `path` is itself a pillar, lists its top children instead.
//   - If `path` is standalone (no pillar), renders nothing.
//
// The component only emits links — no tile imagery, no descriptions.
// Page-level data resolution stays inside the component so callers don't
// have to wire up children/siblings logic.
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link'
import { type Lang, t, getPageContent } from '@/lib/i18n'
import {
  PILLAR_CHILDREN,
  pillarFor,
  siblingsOf,
} from '@/lib/seo/internal-linking'

interface Props {
  lang: Lang
  path: string
  /** Heading override. Defaults to "Related services" / "خدمات ذات صلة". */
  heading?: { en: string; ar: string }
  /** Cap on number of links rendered. Default 4. */
  limit?: number
}

const DEFAULT_HEADING = {
  en: 'Related services',
  ar: 'خدمات ذات صلة',
}

const PARENT_LABEL = {
  en: 'Back to',
  ar: 'العودة إلى',
}

/** Best-effort short label for a path: prefers the part before " — "
 *  in the H1, falling back to the path slug titlecased. */
function shortLabel(path: string, lang: Lang): string {
  const pc = getPageContent(path) as Record<string, unknown> | null
  if (pc) {
    const h1 = (pc[`h1_${lang}`] as string | undefined) || (pc.h1_en as string | undefined)
    if (h1) {
      // Take part before em-dash or pipe
      return h1.split(/\s—\s|\s\|\s/)[0]
    }
  }
  // Fallback: slug → Title Case
  const last = path.split('/').filter(Boolean).pop() || ''
  return last.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export default function RelatedServicesRail({
  lang,
  path,
  heading = DEFAULT_HEADING,
  limit = 4,
}: Props) {
  // Decide what to show:
  //   1. If `path` is a known pillar parent → show its first `limit` children
  //   2. Else if `path` has a parent pillar → show up to `limit` siblings + link up to pillar
  //   3. Else → nothing

  const isPillar = Object.prototype.hasOwnProperty.call(PILLAR_CHILDREN, path)
  const parent = pillarFor(path)

  let links: Array<{ href: string; label: string }> = []
  let parentLink: { href: string; label: string } | null = null

  if (isPillar) {
    const children = PILLAR_CHILDREN[path] || []
    links = children.slice(0, limit).map((p) => ({
      href: p,
      label: shortLabel(p, lang),
    }))
  } else if (parent) {
    links = siblingsOf(path)
      .slice(0, limit)
      .map((p) => ({ href: p, label: shortLabel(p, lang) }))
    parentLink = { href: parent, label: shortLabel(parent, lang) }
  }

  if (links.length === 0 && !parentLink) return null

  const headingText = t(heading, lang)
  const parentLabelText = t(PARENT_LABEL, lang)

  return (
    <nav
      aria-label={headingText}
      className="related-services-rail mt-12 pt-8 border-t border-ink-100/60"
    >
      <h2 className="text-sm uppercase tracking-[0.18em] text-ink-500 mb-4">
        {headingText}
      </h2>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base">
        {parentLink && (
          <li>
            <Link
              href={`/${lang}${parentLink.href}`}
              className="text-coral hover:underline"
            >
              ↑ {parentLabelText} {parentLink.label}
            </Link>
          </li>
        )}
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={`/${lang}${link.href}`}
              className="text-ink-700 hover:text-coral hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
