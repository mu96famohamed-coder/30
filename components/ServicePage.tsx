import Link from 'next/link'
import FAQSection from './FAQSection'
import RichContent, { type RichBlock } from './RichContent'
import { FAQSchema, BreadcrumbSchema, ServiceSchema } from './SchemaMarkup'
import { type Lang, t, site, getWaUrl, getPageContent } from '@/lib/i18n'
import { siblingsOf, pillarFor } from '@/lib/seo/internal-linking'

// ─────────────────────────────────────────────────────────────────────────────
// ServicePage — Magazine Editorial style (Concept C)
//
// Visual DNA:
//   • Cream background (#FDF8F1) — same as homepage, no dark navy hero
//   • Instrument Serif (LTR) / Amiri (RTL) for headings
//   • Coral accent (#E85A3C) for italic phrases + kickers
//   • Asymmetric magazine grid: lead column + sidebar pull quote
//   • No "500+ Documents", no "100% First-Try", no QR-Verified, no "No hidden fees"
//   • No "Accepted by" logo marquee (deliberate — homepage handles trust)
//   • No POA mockup image (was a copy-paste from old E-Notary brand)
//   • FAQ accordion is collapsed by default (handled by FAQSection)
// ─────────────────────────────────────────────────────────────────────────────

export interface FAQItem {
  q: Record<string, string>
  a: Record<string, string>
}
export interface ContentSection {
  [key: string]: string | undefined
  en: string
  ar: string
}
export interface ServicePageProps {
  lang: Lang
  title: Record<string, string>
  subtitle?: Record<string, string>
  description: Record<string, string>
  authority?: string | Record<string,string>
  waMessage: string
  bullets?: Array<Record<string, string>>
  sections?: Array<ContentSection>
  subsections?: Array<ContentSection>
  bodyContent?: Array<ContentSection>
  requiredDocs?: Array<Record<string, string>>
  faqItems?: FAQItem[]
  extraButtons?: Array<{ label: Record<string,string>; href: string; variant?: 'primary'|'secondary' }>
  isTableegh?: boolean
  breadcrumb?: Array<{ label: string; href: string }>
  relatedServices?: Array<{ label: Record<string,string>; href: string }>
  richBlocks?: RichBlock[]
  /** Canonical SITE path (e.g. '/power-of-attorney/real-estate'). When
   *  provided, the page emits a richer schema graph (ProfessionalService
   *  provider + audience + serviceType) via lib/seo/schema-builder. */
  path?: string
  children?: React.ReactNode
}

const WA_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
  </svg>
)

const L = {
  start_wa:    { en:'Start on WhatsApp', ar:'ابدأ عبر واتساب' },
  reply_min:   { en:'We reply in minutes during business hours.', ar:'نرد في دقائق خلال ساعات العمل.' },
  faq_h:       { en:'Frequently asked', ar:'الأسئلة الشائعة' },
  faq_sub:     { en:'Plain answers to the questions we hear most.', ar:'إجابات واضحة على الأسئلة الأكثر شيوعاً.' },
  req_docs_h:  { en:'Documents we will ask you for', ar:'المستندات التي سنطلبها منك' },
  related_h:   { en:'Related services', ar:'خدمات ذات صلة' },
  tableegh:    { en:'Tableegh delivery is required for legal validity in Dubai Courts.', ar:'التسليم عبر التبليغ مطلوب للصلاحية القانونية في محاكم دبي.' },
  pull_quote:  { en:'If the receiving authority is named on the face of the document, the first draft is usually the only draft.', ar:'إذا ذُكرت الجهة المستلمة على وجه الوثيقة، فإن المسودة الأولى عادة ما تكون المسودة الوحيدة.' },
  pull_attrib: { en:'— Note from counsel', ar:'— ملاحظة من المستشار' },
  home:        { en:'Home', ar:'الرئيسية' },
  ready:       { en:'Ready when you are.', ar:'جاهزون متى أردت.' },
  ready_sub:   { en:'Send a WhatsApp with the details. We respond in minutes.', ar:'أرسل واتساب بالتفاصيل. نرد في دقائق.' } }

function ts(s: ContentSection, lang: Lang): string {
  return s[lang] || s.en || s.ar || ''
}
const SKIP_PHRASES = ['ready to get','whatsapp','contact us','get started','frequently asked','how it works']
function shouldSkip(section: ContentSection): boolean {
  const enText = (section.en || '').toLowerCase()
  return SKIP_PHRASES.some(s => enText.includes(s))
}

export default function ServicePage({
  lang, title, subtitle, description, authority, waMessage,
  bullets, sections, subsections, bodyContent, requiredDocs,
  faqItems, extraButtons, isTableegh, breadcrumb, relatedServices, richBlocks, path, children
}: ServicePageProps) {
  const waUrl = getWaUrl(waMessage)
  const isRTL = lang === 'ar'
  const serifFont = isRTL ? 'Amiri, serif' : 'Instrument Serif, serif'

  // ───────────────────────────────────────────────────────────────────────
  // Auto-derive sibling links from the path when caller didn't pass any.
  // This implements the pillar-pattern related-services rail without
  // requiring every page.tsx to wire it up by hand.
  // ───────────────────────────────────────────────────────────────────────
  const autoRelated: Array<{ label: Record<string,string>; href: string }> = []
  if ((!relatedServices || relatedServices.length === 0) && path) {
    const sibs = siblingsOf(path).slice(0, 4)
    for (const sib of sibs) {
      const pc = getPageContent(sib) as Record<string, unknown> | null
      const h1_en = (pc?.h1_en as string | undefined) || ''
      const h1_ar = (pc?.h1_ar as string | undefined) || ''
      const labelEn = h1_en.split(/\s—\s|\s\|\s/)[0] || sib
      const labelAr = h1_ar.split(/\s—\s|\s\|\s/)[0] || sib
      autoRelated.push({
        href: sib,
        label: { en: labelEn, ar: labelAr },
      })
    }
    // If we found a parent pillar, surface it as the first item with a "↑" hint
    const parent = pillarFor(path)
    if (parent) {
      const pcp = getPageContent(parent) as Record<string, unknown> | null
      const parentH1En = (pcp?.h1_en as string | undefined) || parent
      const parentH1Ar = (pcp?.h1_ar as string | undefined) || parent
      const parentEn = parentH1En.split(/\s—\s|\s\|\s/)[0]
      const parentAr = parentH1Ar.split(/\s—\s|\s\|\s/)[0]
      autoRelated.unshift({
        href: parent,
        label: { en: `↑ ${parentEn}`, ar: `↑ ${parentAr}` },
      })
    }
  }
  const effectiveRelated = (relatedServices && relatedServices.length > 0)
    ? relatedServices
    : autoRelated

  const visSections = (sections || []).filter(s => {
    const tx = ts(s, lang)
    return tx && !shouldSkip(s)
  })
  const paragraphs = (bodyContent || []).filter(p => {
    const tx = ts(p, lang)
    return tx && tx.length > 20 && !tx.startsWith('⚡') && !shouldSkip(p)
  })
  const visSubs = (subsections || []).filter(s => {
    const tx = ts(s, lang)
    return tx && !shouldSkip(s)
  })

  // Split title around an em-dash or comma so we can italicize the second half (editorial accent)
  const titleText = t(title, lang)
  let titleLead = titleText
  let titleEm = ''
  const dashSplit = titleText.split(/\s+—\s+/)
  if (dashSplit.length === 2) {
    titleLead = dashSplit[0]
    titleEm = dashSplit[1]
  } else {
    const commaSplit = titleText.split(/,\s+/)
    if (commaSplit.length === 2 && commaSplit[1].length < 60) {
      titleLead = commaSplit[0] + ','
      titleEm = commaSplit[1]
    }
  }

  const breadcrumbSchemaItems =
    breadcrumb && breadcrumb.length > 0
      ? [
          { name: t(L.home, lang), url: `https://www.poain30.ae/${lang}/` },
          ...breadcrumb.map((crumb) => ({
            name: crumb.label,
            url: `https://www.poain30.ae/${lang}${crumb.href}/`.replace(/\/+$/, '/') })),
        ]
      : []

  return (
    <>
      {breadcrumbSchemaItems.length > 0 && <BreadcrumbSchema items={breadcrumbSchemaItems}/>}
      {faqItems && faqItems.length > 0 && <FAQSchema items={faqItems} lang={lang}/>}
      {path
        ? <ServiceSchema lang={lang} path={path} />
        : <ServiceSchema
            name={t(title, lang)}
            url={breadcrumbSchemaItems.length > 0
              ? breadcrumbSchemaItems[breadcrumbSchemaItems.length - 1].url
              : `https://www.poain30.ae/${lang}/`}
            description={t(description, lang)}
          />
      }

      {/* ═══ MASTHEAD ROW (magazine-style date/section) ═══ */}
      <div className="bg-cream border-b border-ink-100/60">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 py-3 flex items-center justify-between">
          <span className="text-[11px] tracking-[0.18em] uppercase text-ink-500 font-medium">
            {subtitle ? t(subtitle, lang) : 'POA in 30 · Dubai'}
          </span>
          <span className="text-[11px] tracking-[0.18em] uppercase text-ink-500 font-medium hidden sm:inline">
            Dubai · UAE
          </span>
        </div>
      </div>

      {/* ═══ BREADCRUMB ═══ */}
      {breadcrumb && breadcrumb.length > 0 && (
        <div className="bg-cream">
          <nav className="mx-auto max-w-6xl px-4 lg:px-8 py-4 flex flex-wrap items-center gap-1.5 text-xs text-ink-500">
            <Link href={`/${lang}`} className="hover:text-coral-600 transition-colors">{t(L.home, lang)}</Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="text-ink-300">/</span>
                {i === breadcrumb.length - 1
                  ? <span className="text-ink-700 font-medium">{crumb.label}</span>
                  : <Link href={`/${lang}${crumb.href}`} className="hover:text-coral-600 transition-colors">{crumb.label}</Link>
                }
              </span>
            ))}
          </nav>
        </div>
      )}

      {/* ═══ HERO — centered editorial headline ═══ */}
      <section className="bg-cream pt-12 pb-10 lg:pt-20 lg:pb-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="block w-8 h-px bg-coral-500/60" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-coral-600 font-medium">
              {subtitle ? t(subtitle, lang) : (lang === 'ar' ? 'خدمة قانونية' : 'Legal service')}
            </span>
            <span className="block w-8 h-px bg-coral-500/60" />
          </div>

          <h1
            className="text-ink-900 leading-[1.05] tracking-tight font-normal"
            style={{
              fontFamily: serifFont,
              fontSize: 'clamp(32px, 5vw, 52px)',
              letterSpacing: '-0.015em' }}
          >
            {titleLead}
            {titleEm && (
              <>
                <br />
                <em className="text-coral-600 not-italic" style={{ fontStyle: 'italic' }}>
                  {titleEm}
                </em>
              </>
            )}
          </h1>

          <p
            className="text-ink-600 mt-6 mx-auto leading-relaxed"
            style={{
              fontFamily: serifFont,
              fontStyle: 'italic',
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              maxWidth: '560px' }}
          >
            {t(description, lang)}
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink-900 text-cream font-medium text-sm rounded-full px-6 py-3 hover:bg-ink-800 transition-colors"
            >
              {WA_ICON} {t(L.start_wa, lang)}
            </a>
            {extraButtons?.map((btn) => (
              <Link
                key={btn.href}
                href={btn.href}
                className="inline-flex items-center text-sm font-medium text-ink-700 rounded-full px-6 py-3 border border-ink-200 hover:border-ink-400 hover:text-ink-900 transition-colors"
              >
                {t(btn.label, lang)}
              </Link>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-400">{t(L.reply_min, lang)}</p>
        </div>
      </section>

      {/* ═══ Tableegh notice ═══ */}
      {isTableegh && (
        <div className="bg-coral-50/70 border-y border-coral-200/50 py-3">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <p className="text-coral-800 text-xs lg:text-sm font-medium text-center"
               style={{ fontFamily: serifFont, fontStyle: 'italic' }}>
              {t(L.tableegh, lang)}
            </p>
          </div>
        </div>
      )}

      {/* ═══ MAIN BODY — magazine asymmetric grid ═══ */}
      <section className="bg-cream py-14 lg:py-20 border-t border-ink-100/40">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">

          {/* Body in a 2-col grid: lead + pull-quote sidebar */}
          <div className="lg:grid lg:grid-cols-[1.6fr_1fr] lg:gap-12">

            <article className="space-y-10 min-w-0" itemScope itemType="https://schema.org/Service">

              {/* Drop-cap intro (first paragraph or first body paragraph) */}
              {paragraphs.length > 0 && !richBlocks?.length && (
                <p
                  className="text-ink-800 leading-[1.85] text-base lg:text-[17px]"
                  style={{ fontFamily: serifFont }}
                >
                  <span
                    className="float-start font-normal text-coral-600 me-2"
                    style={{
                      fontFamily: serifFont,
                      fontSize: '3.4em',
                      lineHeight: '0.85',
                      paddingTop: '0.1em' }}
                  >
                    {(ts(paragraphs[0], lang) || '').charAt(0)}
                  </span>
                  {(ts(paragraphs[0], lang) || '').slice(1)}
                </p>
              )}

              {/* Remaining sections paired with paragraphs */}
              {!richBlocks?.length && visSections.length > 0 && paragraphs.length > 1 && (
                <div className="space-y-10">
                  {visSections.slice(paragraphs.length === visSections.length ? 1 : 0).map((section, i) => {
                    const idx = paragraphs.length === visSections.length ? i + 1 : i + 1
                    const heading = ts(section, lang)
                    const para = paragraphs[idx] ? ts(paragraphs[idx], lang) : ''
                    return (
                      <div key={i}>
                        <h2
                          className="text-ink-900 font-normal mb-4"
                          style={{
                            fontFamily: serifFont,
                            fontSize: 'clamp(22px, 2.6vw, 28px)',
                            letterSpacing: '-0.01em' }}
                        >
                          {heading}
                        </h2>
                        {para && (
                          <p className="text-ink-700 leading-[1.85] text-base lg:text-[17px]"
                             style={{ fontFamily: serifFont }}>
                            {para}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Fallback for when sections/paragraphs don't pair cleanly */}
              {!richBlocks?.length && (visSections.length === 0 || paragraphs.length <= 1) && paragraphs.length > 0 && (
                <div className="space-y-6">
                  {paragraphs.slice(1).map((p, i) => {
                    const txt = ts(p, lang)
                    if (!txt) return null
                    return (
                      <p key={i} className="text-ink-700 leading-[1.85] text-base lg:text-[17px]"
                         style={{ fontFamily: serifFont }}>
                        {txt}
                      </p>
                    )
                  })}
                </div>
              )}

              {/* Generic bullets fallback */}
              {!richBlocks?.length && bullets && bullets.length > 0 && !visSections.length && (
                <ul className="space-y-3">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-ink-700 leading-relaxed text-base"
                        style={{ fontFamily: serifFont }}>
                      <span className="text-coral-500 mt-1.5 shrink-0">·</span>
                      <span>{t(b, lang)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Subsections — categories. Numbered editorial list. */}
              {!richBlocks?.length && visSubs.length > 0 && (
                <div className="border-t border-ink-200 pt-8">
                  <p className="text-[11px] tracking-[0.18em] uppercase text-coral-600 font-medium mb-4">
                    {lang === 'ar' ? `الفئات · ${visSubs.length}` : `Categories · ${visSubs.length}`}
                  </p>
                  <ol className="space-y-4">
                    {visSubs.map((sub, i) => {
                      const subText = ts(sub, lang)
                      if (!subText) return null
                      return (
                        <li key={i} className="grid grid-cols-[auto_1fr] gap-4 items-baseline">
                          <span className="text-coral-500 font-normal text-2xl"
                                style={{ fontFamily: serifFont }}>
                            {String(i + 1).padStart(2, '0')}.
                          </span>
                          <p className="text-ink-800 leading-relaxed text-base lg:text-lg"
                             style={{ fontFamily: serifFont }}>
                            {subText}
                          </p>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              )}

              {/* Rich content blocks */}
              {richBlocks && richBlocks.length > 0 && (
                <RichContent blocks={richBlocks} lang={lang} />
              )}

              {/* Required docs */}
              {requiredDocs && requiredDocs.length > 0 && (
                <div className="border-t border-ink-200 pt-8">
                  <h2
                    className="text-ink-900 font-normal mb-5"
                    style={{
                      fontFamily: serifFont,
                      fontSize: 'clamp(22px, 2.6vw, 28px)',
                      letterSpacing: '-0.01em' }}
                  >
                    {t(L.req_docs_h, lang)}
                  </h2>
                  <ul className="space-y-3">
                    {requiredDocs.map((doc, i) => (
                      <li key={i} className="flex items-start gap-3 text-ink-700 leading-relaxed text-base"
                          style={{ fontFamily: serifFont }}>
                        <span className="text-coral-500 font-normal mt-0.5 shrink-0"
                              style={{ fontFamily: serifFont }}>·</span>
                        <span>{t(doc, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {children}

              {/* FAQ */}
              {faqItems && faqItems.length > 0 && (
                <div className="border-t border-ink-200 pt-8">
                  <p className="text-[11px] tracking-[0.18em] uppercase text-coral-600 font-medium mb-3">
                    — {t(L.faq_h, lang)}
                  </p>
                  <h2
                    id="faq-heading"
                    className="text-ink-900 font-normal mb-3"
                    style={{
                      fontFamily: serifFont,
                      fontSize: 'clamp(22px, 2.6vw, 28px)',
                      letterSpacing: '-0.01em' }}
                  >
                    {t(L.faq_sub, lang)}
                  </h2>
                  <FAQSection items={faqItems} lang={lang}/>
                </div>
              )}

            </article>

            {/* ═══ SIDEBAR — pull quote + related services ═══ */}
            <aside className="hidden lg:block">
              <div className="sticky top-20 space-y-8">

                {/* Pull quote */}
                <div className="border-s-2 border-coral-500 ps-6">
                  <p
                    className="text-ink-700 leading-relaxed mb-3"
                    style={{
                      fontFamily: serifFont,
                      fontStyle: 'italic',
                      fontSize: '17px' }}
                  >
                    "{t(L.pull_quote, lang)}"
                  </p>
                  <p className="text-[11px] tracking-[0.14em] uppercase text-ink-500">
                    {t(L.pull_attrib, lang)}
                  </p>
                </div>

                {/* Related services — editorial list, no boxy card */}
                {effectiveRelated && effectiveRelated.length > 0 && (
                  <div className="border-t border-ink-200 pt-6">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-coral-600 font-medium mb-4">
                      — {t(L.related_h, lang)}
                    </p>
                    <ul className="space-y-3">
                      {effectiveRelated.map((svc, i) => (
                        <li key={i}>
                          <Link
                            href={`/${lang}${svc.href}`}
                            className="group inline-flex items-baseline gap-2 text-ink-700 hover:text-coral-600 transition-colors"
                            style={{ fontFamily: serifFont, fontSize: '16px' }}
                          >
                            <span className="text-coral-500 opacity-60 group-hover:opacity-100">→</span>
                            {t(svc.label, lang)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA — dark navy band, editorial ═══ */}
      <section className="bg-ink-900 py-16 lg:py-20">
        <div className="mx-auto max-w-2xl px-4 lg:px-8 text-center">
          <h2
            className="text-cream font-normal mb-4 leading-tight"
            style={{
              fontFamily: serifFont,
              fontSize: 'clamp(28px, 4vw, 40px)',
              letterSpacing: '-0.01em' }}
          >
            {t(L.ready, lang)}
          </h2>
          <p className="text-ink-200 leading-relaxed mb-8 mx-auto max-w-md text-base"
             style={{ fontFamily: serifFont, fontStyle: 'italic' }}>
            {t(L.ready_sub, lang)}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-coral-500 hover:bg-coral-600 text-cream font-medium text-sm rounded-full px-7 py-3.5 transition-colors"
          >
            {WA_ICON} {t(L.start_wa, lang)}
          </a>
        </div>
      </section>
    </>
  )
}
