import { withSocial } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import { LANGS, type Lang, t, getServiceFaq, HREFLANG_MAP } from '@/lib/i18n'
import FAQSection from '@/components/FAQSection'

import { ContentPageSchema } from '@/components/SchemaMarkup'
interface Props { params: Promise<{ lang: Lang }> }
export async function generateStaticParams() { return LANGS.map((lang) => ({ lang })) }

async function baseMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const titles: Record<string, string> = {
    en: 'Power of Attorney Dubai FAQ | POA in 30',
    ar: 'الأسئلة الشائعة عن الوكالات في دبي | POA in 30' }
  return {
    title: titles[lang] || titles.en,
    description: ({
      en: 'Answers about Power of Attorney in Dubai: types, requirements, remote notarization, property, bank, court, company and overseas POAs.',
      ar: 'إجابات عملية عن الوكالات في دبي: الأنواع والمتطلبات والتوثيق عن بُعد والوكالات العقارية والبنكية والقضائية ووكالات الشركات والوكالات من خارج الإمارات.' } as Record<string,string>)[lang] || 'FAQ about notary support in Dubai.',
    alternates: { canonical: `https://www.poain30.ae/${lang}/faq/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/faq/`])),
        'x-default': `https://www.poain30.ae/en/faq/`,
      }
    } }
}

const SECTIONS = [
  { key: 'faq_page', label: { en: 'Power of Attorney — General', ar: 'الوكالات — أسئلة عامة' } },
  { key: 'poa_general', label: { en: 'General Power of Attorney', ar: 'الوكالة العامة' } },
  { key: 'poa_real_estate', label: { en: 'Real Estate POA', ar: 'الوكالة العقارية' } },
  { key: 'poa_bank', label: { en: 'Bank POA', ar: 'الوكالة البنكية' } },
  { key: 'poa_court', label: { en: 'Court POA', ar: 'الوكالة القضائية' } },
  { key: 'poa_company_formation', label: { en: 'Company Formation POA', ar: 'وكالة تأسيس شركة' } },
  { key: 'poa_child_travel', label: { en: 'Child Travel Authorization', ar: 'إذن سفر الطفل' } },
  { key: 'overseas_poa', label: { en: 'POA from Outside UAE', ar: 'وكالة من خارج الإمارات' } },
  { key: 'e_notary', label: { en: 'Remote POA Notarization', ar: 'توثيق الوكالة عن بُعد' } },
]
export default async function FAQPage({ params }: Props) {
  const { lang } = await params
  const isRTL = lang === 'ar'
  const headingFont = isRTL ? "'IBM Plex Sans Arabic', sans-serif" : "'Plus Jakarta Sans', sans-serif"

  return (
    <>
      <ContentPageSchema lang={lang} path="/faq" />

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
            <span className="block w-8 h-px bg-gold-500/60" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-gold-600 font-medium">
              {isRTL ? 'الأسئلة الشائعة' : 'Asked often'}
            </span>
            <span className="block w-8 h-px bg-gold-500/60" />
          </div>
          <h1 id="faq-heading"
              className="text-ink-900 leading-[1.05] tracking-tight font-normal"
              style={{ fontFamily: headingFont, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.015em' }}>
            {t({ en: 'Questions,', ar: 'أسئلة،' }, lang)}
            <br/>
            <em className="text-gold-600 not-italic" style={{ fontStyle: 'italic' }}>
              {t({ en: 'answered plainly.', ar: 'بإجابات واضحة.' }, lang)}
            </em>
          </h1>
          <p className="text-ink-600 mt-6 mx-auto leading-relaxed"
             style={{ fontFamily: headingFont, fontStyle: 'italic', fontSize: 'clamp(15px, 1.6vw, 18px)', maxWidth: '560px' }}>
            {t({
              en: 'Everything about Power of Attorney in Dubai — types, requirements, remote notarization and transaction-specific POAs.',
              ar: 'كل ما تحتاج معرفته عن الوكالات في دبي — الأنواع والمتطلبات والتوثيق عن بُعد والوكالات المخصصة للمعاملات.' }, lang)}
          </p>
          {/* Notarization path — compliance rule 0.1-1, verbatim */}
          <p className="mt-4 mx-auto flex items-start justify-center gap-2 text-sm text-ink-600" style={{ maxWidth: '620px' }}>
            <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="9" stroke="#C9A84C" strokeWidth="1.5" />
              <path d="M6 10.2l2.6 2.6L14 7.5" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span>
              {lang === 'ar'
                ? 'يتم التوثيق عبر محاكم دبي أو وزارة العدل الإماراتية من خلال مكالمة فيديو.'
                : 'Notarization happens through Dubai Courts or the UAE Ministry of Justice via a video call.'}
            </span>
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
                <p className="text-[11px] tracking-[0.18em] uppercase text-gold-600 font-medium mb-3">
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

export async function generateMetadata(...args: Parameters<typeof baseMetadata>): Promise<Metadata> {
  return withSocial(await baseMetadata(...args))
}
