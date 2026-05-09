import type { Metadata } from 'next'
import { LANGS, type Lang, t, getPageFaq, getServiceFaq, HREFLANG_MAP } from '@/lib/i18n'
import FAQSection from '@/components/FAQSection'

import { ServiceSchema } from '@/components/SchemaMarkup'
interface Props { params: Promise<{ lang: Lang }> }
export async function generateStaticParams() { return LANGS.map((lang) => ({ lang })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const titles: Record<string, string> = {
    en: 'FAQ — POA, Attestation & Notary Dubai 2026 | POA in 30',
    ar: 'الأسئلة الشائعة — التوثيق والوكالات في دبي | POA in 30' }
  return {
    title: titles[lang] || titles.en,
    description: ({
      en: 'Answers to everything about POA, attestation, eviction notices, and notarization in Dubai.',
      ar: 'إجابات على الوكالات والتصديق وإشعارات الإخلاء والتوثيق في دبي.' } as Record<string,string>)[lang] || 'FAQ about notary support in Dubai.',
    alternates: { canonical: `https://www.poain30.ae/${lang}/faq/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/faq/`])),
        'x-default': `https://www.poain30.ae/en/faq/`,
      }
    } }
}

const SECTIONS = [
  { key: 'faq_page', label: { en: 'General Questions', ar: 'أسئلة عامة' } },
  { key: 'poa_general', label: { en: 'Power of Attorney', ar: 'الوكالات الرسمية' } },
  { key: 'attestation_mofa', label: { en: 'MOFA Attestation', ar: 'تصديق MOFA' } },
  { key: 'eviction_notice', label: { en: 'Eviction Notices', ar: 'إشعارات الإخلاء' } },
  { key: 'legal_notice', label: { en: 'Legal Notices', ar: 'الإنذارات القانونية' } },
  { key: 'overseas_poa', label: { en: 'POA from Outside UAE', ar: 'وكالة من خارج الإمارات' } },
  { key: 'e_notary', label: { en: 'E-Notary & Remote Services', ar: 'التوثيق الإلكتروني والخدمات عن بُعد' } },
  { key: 'pricing_page', label: { en: 'Pricing & Fees', ar: 'الأسعار والرسوم' } },
]

export default async function FAQPage({ params }: Props) {
  const { lang } = await params
  const isRTL = lang === 'ar'
  const serif = isRTL ? 'Amiri, serif' : 'Instrument Serif, serif'

  return (
    <>
      <ServiceSchema lang={lang} path="/faq" />

      {/* Masthead */}
      <div className="bg-cream border-b border-ink-100/60">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 py-3 flex items-center justify-between">
          <span className="text-[11px] tracking-[0.18em] uppercase text-ink-500 font-medium">
            {isRTL ? 'الأسئلة الشائعة' : 'FAQ'}
          </span>
          <span className="text-[11px] tracking-[0.18em] uppercase text-ink-500 font-medium hidden sm:inline">Dubai · UAE</span>
        </div>
      </div>

      {/* Hero — centered editorial */}
      <section className="bg-cream pt-12 pb-10 lg:pt-20 lg:pb-12">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="block w-8 h-px bg-coral-500/60" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-coral-600 font-medium">
              {isRTL ? 'الأسئلة الشائعة' : 'Asked often'}
            </span>
            <span className="block w-8 h-px bg-coral-500/60" />
          </div>
          <h1 id="faq-heading"
              className="text-ink-900 leading-[1.05] tracking-tight font-normal"
              style={{ fontFamily: serif, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.015em' }}>
            {t({ en: 'Questions,', ar: 'أسئلة،' }, lang)}
            <br/>
            <em className="text-coral-600 not-italic" style={{ fontStyle: 'italic' }}>
              {t({ en: 'answered plainly.', ar: 'بإجابات واضحة.' }, lang)}
            </em>
          </h1>
          <p className="text-ink-600 mt-6 mx-auto leading-relaxed"
             style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(15px, 1.6vw, 18px)', maxWidth: '560px' }}>
            {t({
              en: 'Everything about Power of Attorney, attestation, eviction notices, and notarization in Dubai.',
              ar: 'كل شيء عن الوكالات الرسمية والتصديق وإشعارات الإخلاء والتوثيق في دبي.' }, lang)}
          </p>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="bg-cream py-10 lg:py-14 border-t border-ink-100/40">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 space-y-12">
          {SECTIONS.map(({ key, label }) => {
            const items = getServiceFaq(key)
            if (!items.length) return null
            return (
              <div key={key}>
                <p className="text-[11px] tracking-[0.18em] uppercase text-coral-600 font-medium mb-3">
                  — {t(label, lang)}
                </p>
                <FAQSection items={items} lang={lang} />
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
