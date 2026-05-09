'use client'

import { useState } from 'react'
import { type Lang } from '@/lib/i18n'

interface FAQItem {
  q: Record<string, string>
  a: Record<string, string>
}

interface Props {
  items: FAQItem[]
  lang: Lang
  variant?: 'default' | 'dark'
}

// Strict language picker — does NOT fall back across languages.
// Returns '' if the requested language isn't present, so the FAQ row
// can be safely skipped instead of leaking AR text into an EN page.
function strictPick(obj: Record<string, string> | undefined, lang: Lang): string {
  if (!obj) return ''
  return (obj[lang] || '').trim()
}

export default function FAQSection({ items, lang, variant = 'default' }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const isDark = variant === 'dark'
  const serifFont = lang === 'ar' ? 'Amiri, serif' : 'Instrument Serif, serif'

  // Filter out items missing a question in the current language.
  // This is the fix for AR questions appearing on EN pages.
  const visibleItems = items
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) => strictPick(item.q, lang).length > 0)

  if (visibleItems.length === 0) return null

  return (
    <section className="space-y-1" aria-labelledby="faq-heading">
      {visibleItems.map(({ item, originalIndex }) => {
        const isOpen = open === originalIndex
        const question = strictPick(item.q, lang)
        const answer = strictPick(item.a, lang) || (item.a?.en || '').trim()

        return (
          <div
            key={originalIndex}
            className={`border-t last:border-b transition-colors duration-200 ${
              isDark
                ? 'border-ink-700/60'
                : 'border-ink-200'
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : originalIndex)}
              className={`w-full flex items-center justify-between gap-4 py-4 lg:py-5 text-start transition-colors ${
                isDark ? 'hover:text-coral-400' : 'hover:text-coral-600'
              } ${isOpen ? (isDark ? 'text-coral-400' : 'text-coral-600') : (isDark ? 'text-cream' : 'text-ink-800')}`}
              aria-expanded={isOpen}
            >
              <span
                className="font-medium text-base leading-snug"
                style={{ fontFamily: serifFont }}
              >
                {question}
              </span>
              <span className={`flex-shrink-0 text-xl leading-none transition-transform duration-200 ${
                isOpen ? 'rotate-45' : ''
              }`} style={{ fontFamily: serifFont }}>
                +
              </span>
            </button>

            {/* CSS grid animation - no max-height hacks */}
            <div className={`faq-body ${isOpen ? 'open' : ''}`}>
              <div>
                <p
                  className={`pb-5 text-base leading-[1.85] ${
                    isDark ? 'text-ink-200' : 'text-ink-600'
                  }`}
                  style={{ fontFamily: serifFont }}
                >
                  {answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
