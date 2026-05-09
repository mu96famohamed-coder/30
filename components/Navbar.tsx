'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { type Lang, t, cta, site, languages } from '@/lib/i18n'

interface Props {
  lang: Lang
}

const CHEVRON = (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
  </svg>
)

const MENU = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CLOSE = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// Nav model — kept lean for POA in 30: 5 top-level groups
// ─────────────────────────────────────────────────────────────────────────────

function buildNav(lang: Lang) {
  const l = lang
  return [
    {
      key: 'poa',
      label: { en: 'Power of Attorney', ar: 'الوكالات الرسمية' },
      cols: [
        {
          heading: { en: 'Personal', ar: 'شخصية' },
          items: [
            { href: `/${l}/power-of-attorney/general`,      label: { en: 'General POA',      ar: 'وكالة عامة' } },
            { href: `/${l}/power-of-attorney/special`,      label: { en: 'Special POA',      ar: 'وكالة خاصة' } },
            { href: `/${l}/power-of-attorney/child-travel`, label: { en: 'Child Travel',     ar: 'إذن سفر طفل' } },
            { href: `/${l}/power-of-attorney/inheritance`,  label: { en: 'Inheritance POA', ar: 'وكالة ميراث' } },
            { href: `/${l}/power-of-attorney/court`,        label: { en: 'Court Case POA',   ar: 'وكالة قضائية' } },
          ],
        },
        {
          heading: { en: 'Property & Finance', ar: 'العقارات والمال' },
          items: [
            { href: `/${l}/power-of-attorney/real-estate`,          label: { en: 'Real Estate POA',      ar: 'وكالة عقارية' } },
            { href: `/${l}/power-of-attorney/real-estate/sale`,     label: { en: '↳ Sale',                ar: '↳ بيع عقار' } },
            { href: `/${l}/power-of-attorney/real-estate/purchase`, label: { en: '↳ Purchase',            ar: '↳ شراء عقار' } },
            { href: `/${l}/power-of-attorney/real-estate/management`, label: { en: '↳ Management',        ar: '↳ إدارة عقار' } },
            { href: `/${l}/power-of-attorney/bank`,                 label: { en: 'Bank POA',              ar: 'وكالة بنكية' } },
            { href: `/${l}/power-of-attorney/property-gifting`,     label: { en: 'Property Gifting',      ar: 'هبة عقار' } },
            { href: `/${l}/power-of-attorney/mohre`,                label: { en: 'MOHRE / Labour',        ar: 'وكالة MOHRE' } },
            { href: `/${l}/power-of-attorney/company-formation`,    label: { en: 'Company Formation',     ar: 'تأسيس شركة' } },
          ],
        },
        {
          heading: { en: 'Vehicle', ar: 'المركبات' },
          items: [
            { href: `/${l}/power-of-attorney/vehicle`,          label: { en: 'Vehicle POA',  ar: 'وكالة مركبة' } },
            { href: `/${l}/power-of-attorney/vehicle/sale`,     label: { en: '↳ Sale',        ar: '↳ بيع مركبة' } },
            { href: `/${l}/power-of-attorney/vehicle/export`,   label: { en: '↳ Export',      ar: '↳ تصدير مركبة' } },
            { href: `/${l}/power-of-attorney/vehicle/management`, label: { en: '↳ Management', ar: '↳ إدارة مركبة' } },
            { href: `/${l}/poa-cancellation`,                   label: { en: 'Cancel a POA',  ar: 'إلغاء وكالة' } },
          ],
        },
      ],
    },
    {
      key: 'attestation',
      label: { en: 'Attestation', ar: 'التصديقات' },
      cols: [
        {
          heading: { en: 'UAE attestation', ar: 'تصديق الإمارات' },
          items: [
            { href: `/${l}/attestation/mofa`,    label: { en: 'MOFA attestation',       ar: 'تصديق الخارجية' } },
            { href: `/${l}/attestation/embassy`, label: { en: 'Embassy attestation',    ar: 'تصديق السفارات' } },
          ],
        },
        {
          heading: { en: 'International', ar: 'دولي' },
          items: [
            { href: `/${l}/legal-translation`,     label: { en: 'Legal translation',  ar: 'ترجمة قانونية' } },
            { href: `/${l}/legal-translation/court`, label: { en: '↳ Court-certified', ar: '↳ ترجمة محكمة' } },
          ],
        },
      ],
    },
    {
      key: 'corporate',
      label: { en: 'Corporate', ar: 'الشركات' },
      cols: [
        {
          heading: { en: 'Resolutions & documents', ar: 'قرارات ووثائق' },
          items: [
            { href: `/${l}/corporate/board-resolution`,     label: { en: 'Board resolution',       ar: 'قرار مجلس إدارة' } },
            { href: `/${l}/corporate/shareholder-agreement`, label: { en: 'Shareholder agreement', ar: 'اتفاقية شركاء' } },
            { href: `/${l}/corporate/moa`,                  label: { en: 'MOA drafting',           ar: 'عقد تأسيس' } },
            { href: `/${l}/corporate/moa-amendment`,        label: { en: 'MOA amendment',          ar: 'تعديل عقد تأسيس' } },
          ],
        },
        {
          heading: { en: 'Transactions', ar: 'المعاملات' },
          items: [
            { href: `/${l}/corporate/share-transfer`, label: { en: 'Share transfer', ar: 'نقل أسهم' } },
            { href: `/${l}/corporate/contract`,       label: { en: 'Contract drafting', ar: 'صياغة عقود' } },
            { href: `/${l}/corporate/liquidation`,    label: { en: 'Liquidation',    ar: 'تصفية شركة' } },
          ],
        },
      ],
    },
    {
      key: 'other',
      label: { en: 'Other services', ar: 'خدمات أخرى' },
      cols: [
        {
          heading: { en: 'Notary & legal', ar: 'توثيق وقانوني' },
          items: [
            { href: `/${l}/e-notary`,                  label: { en: 'E-Notary (remote)',    ar: 'الكاتب الإلكتروني' } },
            { href: `/${l}/mobile-notary`,             label: { en: 'Mobile notary',         ar: 'كاتب عدل متنقل' } },
            { href: `/${l}/emergency-notary`,          label: { en: 'Emergency notary',      ar: 'كاتب عدل عاجل' } },
            { href: `/${l}/affidavit`,                 label: { en: 'Affidavit',             ar: 'إقرار مشفوع بيمين' } },
            { href: `/${l}/certified-true-copy`,       label: { en: 'Certified true copy',   ar: 'نسخة طبق الأصل' } },
            { href: `/${l}/last-will-testament-dubai`, label: { en: 'Last will & testament', ar: 'وصية' } },
          ],
        },
        {
          heading: { en: 'Notices & disputes', ar: 'إنذارات ونزاعات' },
          items: [
            { href: `/${l}/legal-notice`,                 label: { en: 'Legal notice',             ar: 'إنذار قانوني' } },
            { href: `/${l}/legal-notice/eviction`,        label: { en: '↳ Eviction notice',         ar: '↳ إنذار إخلاء' } },
            { href: `/${l}/legal-notice/poa-cancellation`,label: { en: '↳ POA cancellation notice', ar: '↳ إنذار إلغاء وكالة' } },
            { href: `/${l}/rdc-support`,                  label: { en: 'RDC filing support',       ar: 'دعم مركز الإيجارات' } },
            { href: `/${l}/what-is-tableegh`,             label: { en: 'What is Tableegh?',        ar: 'ما هو التبليغ؟' } },
          ],
        },
      ],
    },
    {
      key: 'about',
      label: { en: 'About', ar: 'عن الموقع' },
      cols: [
        {
          heading: { en: 'POA in 30', ar: 'POA in 30' },
          items: [
            { href: `/${l}/about`,  label: { en: 'About us',     ar: 'من نحن' } },
            { href: `/${l}/faq`,    label: { en: 'FAQ',          ar: 'الأسئلة الشائعة' } },
            { href: `/${l}/contact`, label: { en: 'Contact',     ar: 'تواصل معنا' } },
          ],
        },
      ],
    },
  ]
}

export default function Navbar({ lang }: Props) {
  const pathname = usePathname() || `/${lang}`
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navItems = buildNav(lang)

  function openDropdown(key: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveKey(key)
  }
  function scheduleClose() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setActiveKey(null), 150)
  }

  function switchLangPath(newLang: string) {
    const parts = pathname.split('/').filter(Boolean)
    parts[0] = newLang
    return '/' + parts.join('/') + (pathname.endsWith('/') && parts.length ? '/' : '')
  }

  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }, [pathname])

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }, [])

  const waHref = `https://wa.me/${site.phone.replace(/\D/g, '')}`

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-ink-100">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-18 py-3 items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="POA in 30"
          >
            <Image
              src={lang === 'ar' ? '/logo-ar.svg' : '/logo.svg'}
              alt="POA in 30"
              width={160}
              height={42}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => {
              const label = t(item.label, lang)
              const isActive = activeKey === item.key
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => openDropdown(item.key)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    className={`flex items-baseline gap-1.5 px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'text-coral-600'
                        : 'text-ink-700 hover:text-coral-600'
                    }`}
                    style={{
                      fontFamily: lang === 'ar' ? 'Amiri, serif' : 'Instrument Serif, serif',
                      fontStyle: isActive ? 'italic' : 'normal',
                      fontSize: '15px',
                      letterSpacing: '0.01em' }}
                  >
                    {label}
                    <span className={`transition-transform text-[10px] ${isActive ? 'rotate-180 text-coral-600' : 'text-ink-400'}`}>
                      {CHEVRON}
                    </span>
                  </button>

                  {isActive && (
                    <>
                      <div
                        className="absolute top-full left-0 right-0 h-3 z-40"
                        onMouseEnter={() => openDropdown(item.key)}
                      />
                      <div
                        className="absolute top-full mt-2 bg-cream rounded-2xl shadow-tile border border-ink-100/80 z-50 p-6"
                        style={{
                          width: item.cols.length >= 3
                            ? 'min(820px, calc(100vw - 2rem))'
                            : item.cols.length === 2
                              ? 'min(560px, calc(100vw - 2rem))'
                              : 'min(280px, calc(100vw - 2rem))',
                          left: '50%',
                          transform: 'translateX(-50%)',
                        }}
                        onMouseEnter={() => openDropdown(item.key)}
                        onMouseLeave={scheduleClose}
                      >
                        <div
                          className="grid gap-x-8"
                          style={{ gridTemplateColumns: `repeat(${item.cols.length}, minmax(0, 1fr))` }}
                        >
                          {item.cols.map((col, ci) => (
                            <div key={ci}>
                              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-coral-600 px-2 mb-3">
                                — {t(col.heading, lang)}
                              </p>
                              <div className="space-y-0.5">
                                {col.items.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className="flex items-baseline gap-2 px-2 py-1.5 text-ink-700 hover:text-coral-600 transition-colors"
                                    style={{
                                      fontFamily: lang === 'ar' ? 'Amiri, serif' : 'Instrument Serif, serif',
                                      fontSize: '15px' }}
                                    onClick={() => setActiveKey(null)}
                                  >
                                    {t(sub.label, lang)}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </nav>

          {/* ── Right side: lang switcher + CTA + mobile toggle ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center gap-0.5">
              {languages.map((l, i) => (
                <span key={l.code} className="flex items-center">
                  {i > 0 && <span className="text-ink-300 text-xs mx-1">|</span>}
                  <Link
                    href={switchLangPath(l.code)}
                    className={`text-xs font-semibold px-1.5 py-1 rounded transition-colors ${
                      lang === l.code
                        ? 'text-coral-600'
                        : 'text-ink-500 hover:text-coral-600'
                    }`}
                    title={l.title}
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
            </div>

            {/* Start-now pill CTA */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !py-2 !px-4 !text-sm"
            >
              {lang === 'ar' ? 'ابدأ الآن' : 'Start in 30 min'}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-ink-700 hover:bg-cream-300 transition-colors"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? CLOSE : MENU}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-ink-100 py-3 max-h-[75vh] overflow-y-auto">
            {/* Language row */}
            <div className="flex items-center gap-2 px-3 pb-3 mb-2 border-b border-ink-100">
              {languages.map((l, i) => (
                <span key={l.code} className="flex items-center">
                  {i > 0 && <span className="text-ink-300 text-xs mx-1">|</span>}
                  <Link
                    href={switchLangPath(l.code)}
                    className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
                      lang === l.code ? 'text-coral-600' : 'text-ink-500'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
              <a
                href={`tel:${site.phone}`}
                className="ms-auto text-xs font-semibold text-ink-700"
                dir="ltr"
              >
                {site.phone_display}
              </a>
            </div>

            {navItems.map((item) => (
              <div key={item.key} className="mb-0.5">
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-ink-700"
                >
                  <span>{t(item.label, lang)}</span>
                  <span className={`transition-transform ${mobileExpanded === item.key ? 'rotate-180' : 'opacity-60'}`}>
                    {CHEVRON}
                  </span>
                </button>
                {mobileExpanded === item.key && (
                  <div className="bg-cream-300 rounded-xl mx-3 mb-2 p-3 space-y-3">
                    {item.cols.map((col, ci) => (
                      <div key={ci}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-400 px-2 mb-1.5">
                          {t(col.heading, lang)}
                        </p>
                        <div className="space-y-0.5">
                          {col.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-2 py-1.5 text-sm text-ink-700 hover:text-coral-600"
                            >
                              {t(sub.label, lang)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTAs */}
            <div className="flex flex-col gap-2 px-4 pt-3 mt-2 border-t border-ink-100">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full !py-3"
                onClick={() => setMobileOpen(false)}
              >
                {lang === 'ar' ? 'ابدأ الآن على واتساب' : 'Start now on WhatsApp'}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
