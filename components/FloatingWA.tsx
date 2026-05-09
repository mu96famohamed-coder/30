'use client'

import { useEffect, useState } from 'react'
import { type Lang, t, site } from '@/lib/i18n'

interface Props {
  lang: Lang
  message?: string
}

const DEFAULT_MSG = {
  en: 'I need notary support in Dubai',
  ar: 'أحتاج مساعدة في التوثيق بدبي' }

const TOOLTIP = {
  en: 'Reply in 5 min',
  ar: 'رد خلال 5 دقائق' }

const WA_SVG = (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function FloatingWA({ lang, message }: Props) {
  const [showScroll, setShowScroll] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const handler = () => setShowScroll(window.scrollY > 400)
    window.addEventListener('scroll', handler, { passive: true })

    // Show tooltip after 3s to draw attention
    const timer = setTimeout(() => {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 4000)
    }, 3000)

    return () => {
      window.removeEventListener('scroll', handler)
      clearTimeout(timer)
    }
  }, [])

  const msg = message || DEFAULT_MSG[lang] || DEFAULT_MSG.en
  const waUrl = `https://wa.me/${site.phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`
  const tooltip = TOOLTIP[lang] || TOOLTIP.en
  const isRtl = lang === 'ar'

  return (
    <>
      {/* WhatsApp float button with tooltip */}
      <div
        className="fixed z-50"
        style={{ bottom: '1.5rem', insetInlineEnd: '1.5rem' }}
      >
        {/* Tooltip bubble */}
        <div
          className={`absolute bottom-full mb-2 whitespace-nowrap transition-all duration-300 ${
            showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
          }`}
          style={{ insetInlineEnd: 0 }}
        >
          <div className="bg-ink-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg relative">
            ⚡ {tooltip}
            <div
              className="absolute top-full"
              style={{ insetInlineEnd: '1rem', width: 0, height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid #0C1A27'
              }}
            />
          </div>
        </div>

        {/* Button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-float"
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {WA_SVG}
        </a>
      </div>

      {/* Scroll to top */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed z-40 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-ink-700"
          style={{
            bottom: '5.5rem',
            insetInlineEnd: '1.5rem',
            width: '2.5rem',
            height: '2.5rem',
            background: '#0C1A27',
            border: '1px solid #1E3A52',
            color: 'white',
            boxShadow: '0 2px 12px rgba(0,0,0,.3)' }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </>
  )
}
