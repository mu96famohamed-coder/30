import content from '@/data/content.json'

// ─────────────────────────────────────────────────────────────────────────────
// POA in 30 — i18n (EN + AR only)
// Simplified from E-Notary Dubai's 5-language setup: RU, ZH, ES removed.
// ─────────────────────────────────────────────────────────────────────────────

export type Lang = 'en' | 'ar'
export const LANGS: Lang[] = ['en', 'ar']
export const DEFAULT_LANG: Lang = 'en'

export function isValidLang(lang: string): lang is Lang {
  return LANGS.includes(lang as Lang)
}

export function getDir(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr'
}

export function getFontClass(lang: Lang): string {
  return lang === 'ar' ? 'font-arab' : 'font-sans'
}

/** Get text in the current language, fall back to EN, then AR */
export function t(obj: Record<string, string> | undefined, lang: Lang): string {
  if (!obj) return ''
  return obj[lang] || obj['en'] || obj['ar'] || ''
}

export function getWaUrl(message: string): string {
  return `https://wa.me/${content.site.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}

export function generateLangParams() {
  return LANGS.map((lang) => ({ lang }))
}

// ─────────────────────────────────────────────────────────────────────────────
// Hreflang — EN and AR targeted at UAE + x-default
// ─────────────────────────────────────────────────────────────────────────────
export const HREFLANG_MAP: Record<Lang, string> = {
  en: 'en-AE',
  ar: 'ar-AE',
}

export function getHreflang(lang: Lang): string {
  return HREFLANG_MAP[lang]
}

/** Build alternates.languages for a URL path. Path must start and end with '/'. */
export function buildHreflangAlternates(path: string): Record<string, string> {
  const base = 'https://www.poain30.ae'
  const alternates: Record<string, string> = {}
  for (const l of LANGS) {
    alternates[HREFLANG_MAP[l]] = `${base}/${l}${path}`
  }
  // x-default points to English as the canonical fallback
  alternates['x-default'] = `${base}/en${path}`
  return alternates
}

// ─────────────────────────────────────────────────────────────────────────────
// RichBlock — union type for all rich-content blocks used in pages
// ─────────────────────────────────────────────────────────────────────────────
export type RichBlock =
  | { type: 'heading';   text: Record<string, string> }
  | { type: 'para';      text: Record<string, string>; accent?: boolean }
  | { type: 'warning';   text: Record<string, string>; title?: Record<string, string> }
  | { type: 'info';      text: Record<string, string>; title?: Record<string, string> }
  | { type: 'success';   text: Record<string, string>; title?: Record<string, string> }
  | { type: 'law';       ref: string; text: Record<string, string> }
  | { type: 'checklist'; title?: Record<string, string>; items: Array<Record<string, string>> }
  | { type: 'steps';     items: Array<{ title: Record<string, string>; body: Record<string, string> }> }
  | { type: 'process';   items: Array<{ icon: string; title: Record<string, string>; body: Record<string, string> }> }
  | { type: 'compare';   left: { title: Record<string, string>; items: Array<Record<string, string>> }; right: { title: Record<string, string>; items: Array<Record<string, string>> } }
  | { type: 'stats';     items: Array<{ value: string; label: Record<string, string>; sub?: Record<string, string> }> }
  | { type: 'table';     headers: Array<Record<string, string>>; rows: Array<Array<Record<string, string>>> }
  | { type: 'divider' }

// ─────────────────────────────────────────────────────────────────────────────
// FaqItem (EN + AR only)
// ─────────────────────────────────────────────────────────────────────────────
export interface FaqItem {
  q: { en: string; ar: string }
  a: { en: string; ar: string }
}

export function normalizeFaqItem(item: {
  q: Record<string, string>
  a: Record<string, string>
}): FaqItem {
  return {
    q: {
      en: item.q['en'] || '',
      ar: item.q['ar'] || '',
    },
    a: {
      en: item.a['en'] || '',
      ar: item.a['ar'] || '',
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PageContent shape (matches content.json)
// ─────────────────────────────────────────────────────────────────────────────
interface PageContent {
  h1_en?: string
  h1_ar?: string
  title_en?: string
  meta_en?: string
  sections?: Array<Record<string, string>>
  subsections?: Array<Record<string, string>>
  content?: Array<Record<string, string>>
  list_items?: Array<Record<string, string>>
  rich_blocks?: RichBlock[]
  faq?: Array<{ q: Record<string, string>; a: Record<string, string> }>
  [key: string]: unknown
}

export function getPageContent(url: string): PageContent | null {
  const pc = content.page_content as Record<string, PageContent>
  return pc[url] ?? pc[url + '/'] ?? null
}

export function getPageFaq(url: string): FaqItem[] {
  const pc = getPageContent(url)
  return (pc?.faq ?? []).map(normalizeFaqItem)
}

export function getServiceFaq(key: string): FaqItem[] {
  const map = content.faq_services as Record<
    string,
    Array<{ q: Record<string, string>; a: Record<string, string> }>
  >
  return (map[key] ?? []).map(normalizeFaqItem)
}

export function getRequiredDocs(key: string): Array<Record<string, string>> {
  const map = content.required_docs as Record<string, Array<Record<string, string>>>
  return map[key] ?? []
}

export function getPageBlocks(url: string): RichBlock[] {
  const pc = getPageContent(url)
  return (pc?.rich_blocks ?? []) as RichBlock[]
}

export function getPageMeta(
  slug: string,
  lang: string,
): { title: string; description: string } {
  const pc = getPageContent(slug)
  if (!pc) return { title: '', description: '' }
  const title = ((pc[`title_${lang}`] as string | undefined) || pc.title_en || '') as string
  const description = ((pc[`meta_${lang}`] as string | undefined) || pc.meta_en || '') as string
  return { title, description }
}

// ─────────────────────────────────────────────────────────────────────────────
// Typed top-level exports
// ─────────────────────────────────────────────────────────────────────────────
export const site         = content.site
export const languages    = content.languages
export const nav          = content.nav
export const footer       = content.footer
export const cta          = content.cta
export const steps        = content.steps
export const services     = content.services
export const trust_badges = content.trust_badges
export const faq          = content.faq

export const ui_buttons = content.ui_buttons as Record<string, Record<string, string>>

// NOTE: POA in 30 does NOT display prices anywhere — pricing is quote-based.
// The pricing export is kept for backwards compatibility but intentionally
// unused on any rendered page. Do not surface this in UI.
export const pricing = content.pricing as Record<
  string,
  Array<{ service: Record<string, string>; href: string }>
>
