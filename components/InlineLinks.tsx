import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Lang } from '@/lib/i18n'
import { ACTIVE_PATHS } from '@/lib/seo/routes'

const allowed = new Set<string>(ACTIVE_PATHS)
const token = /\[\[(\/[a-z0-9\-/]*)\|([^\]|]+)\]\]/g

export function stripLinks(text: string): string {
  return text.replace(token, (_match, _path, anchor) => anchor)
}

/** Only known site routes become links; React escapes all anchor text. */
export function inlineLinks(text: string, lang: Lang): ReactNode {
  if (!text.includes('[[')) return text
  const nodes: ReactNode[] = []
  let cursor = 0
  for (const match of text.matchAll(new RegExp(token))) {
    const index = match.index ?? 0
    const [full, path, anchor] = match
    nodes.push(text.slice(cursor, index))
    nodes.push(allowed.has(path)
      ? <Link key={index} href={`/${lang}${path === '/' ? '' : path}/`} className="underline underline-offset-4 decoration-[#C9A84C] hover:text-[#947529]">{anchor}</Link>
      : anchor)
    cursor = index + full.length
  }
  nodes.push(text.slice(cursor))
  return nodes
}
