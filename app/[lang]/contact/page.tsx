import type { Metadata } from 'next'
import Link from 'next/link'
import { LANGS, type Lang, t, site, HREFLANG_MAP, getWaUrl } from '@/lib/i18n'
import { ServiceSchema } from '@/components/SchemaMarkup'

interface Props { params: Promise<{ lang: Lang }> }
export async function generateStaticParams() { return LANGS.map((l) => ({ lang: l })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const titles: Record<string, string> = {
    en: 'Contact POA in 30 | Dubai POA & Notary on WhatsApp',
    ar: 'تواصل مع POA in 30 | واتساب وهاتف' }
  const descs: Record<string, string> = {
    en: 'Contact POA in 30 by WhatsApp, phone, or email for power of attorney drafting, attestation, and notarization in Dubai. Fast bilingual response.',
    ar: 'تواصل مع POA in 30 عبر واتساب أو الهاتف أو البريد الإلكتروني للوكالات والتصديق والتوثيق في دبي. رد سريع ثنائي اللغة.' }
  return {
    title: titles[lang] || titles.en,
    description: descs[lang] || descs.en,
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/contact/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/contact/`])),
        'x-default': `https://www.poain30.ae/en/contact/`,
      } },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descs[lang] || descs.en,
      url: `https://www.poain30.ae/${lang}/contact/` } }
}

const L = {
  kicker:    { en: 'Contact', ar: 'التواصل' },
  h1_lead:   { en: 'Start on WhatsApp,', ar: 'ابدأ بواتساب،' },
  h1_em:     { en: 'finish in 30 minutes.', ar: 'انتهِ في 30 دقيقة.' },
  sub:       { en: 'Two or three sentences are enough to scope the work, give a flat-fee quote, and confirm whether your timeline is realistic.', ar: 'جملتان أو ثلاث تكفي لتحديد نطاق العمل، إعطاء عرض سعر مقطوع، وتأكيد إذا كان جدولك الزمني واقعياً.' },
  ways_kicker: { en: '— Ways to reach us', ar: '— طرق التواصل' },
  what_we_need: { en: 'What we need from your first message', ar: 'ما نحتاجه من رسالتك الأولى' },
  hint_p:    { en: 'The most useful information: what document type you need, the receiving authority (a specific bank, the DLD, the RTA, a court), and any deadline you are working against. With those three details we can usually confirm scope, timeline, and fee in one or two replies.', ar: 'المعلومات الأكثر فائدة: نوع الوثيقة التي تحتاجها، الجهة المستلمة (بنك محدد، دائرة الأراضي، هيئة الطرق، محكمة)، وأي موعد نهائي تعمل ضده. مع هذه التفاصيل الثلاثة، يمكننا عادةً تأكيد النطاق والجدول الزمني والرسم في رد أو ردين.' },
  hours_h:   { en: 'Hours', ar: 'ساعات العمل' },
  hours_wd:  { en: 'Sunday – Thursday: 9:00 – 18:00', ar: 'الأحد – الخميس: 9:00 – 18:00' },
  hours_sat: { en: 'Saturday: 10:00 – 15:00', ar: 'السبت: 10:00 – 15:00' },
  hours_fri: { en: 'Friday: WhatsApp only', ar: 'الجمعة: واتساب فقط' },
  area_h:    { en: 'Service area', ar: 'منطقة الخدمة' },
  area_p:    { en: 'Dubai. Notarization for documents going to UAE authorities, banks, and courts.', ar: 'دبي. التوثيق للوثائق المتجهة إلى الجهات الإماراتية والبنوك والمحاكم.' },
  wa_btn:    { en: 'Start on WhatsApp', ar: 'ابدأ عبر واتساب' } }

export default async function Page({ params }: Props) {
  const { lang } = await params
  const isRTL = lang === 'ar'
  const serif = isRTL ? 'Amiri, serif' : 'Instrument Serif, serif'
  const waUrl = getWaUrl(t({ en: 'Hi POA in 30, I have a question about a Dubai POA / notarization.', ar: 'مرحباً POA in 30، عندي سؤال عن وكالة/توثيق في دبي.' }, lang))

  return (
    <>
      <ServiceSchema lang={lang} path="/contact" />

      <div className="bg-cream border-b border-ink-100/60">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 py-3 flex items-center justify-between">
          <span className="text-[11px] tracking-[0.18em] uppercase text-ink-500 font-medium">{t(L.kicker, lang)}</span>
          <span className="text-[11px] tracking-[0.18em] uppercase text-ink-500 font-medium hidden sm:inline">Dubai · UAE</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-cream pt-12 pb-10 lg:pt-20 lg:pb-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="block w-8 h-px bg-coral-500/60" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-coral-600 font-medium">
              {isRTL ? 'تواصل معنا' : 'Get in touch'}
            </span>
            <span className="block w-8 h-px bg-coral-500/60" />
          </div>
          <h1 className="text-ink-900 leading-[1.05] tracking-tight font-normal"
              style={{ fontFamily: serif, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.015em' }}>
            {t(L.h1_lead, lang)}
            <br/>
            <em className="text-coral-600 not-italic" style={{ fontStyle: 'italic' }}>
              {t(L.h1_em, lang)}
            </em>
          </h1>
          <p className="text-ink-600 mt-6 mx-auto leading-relaxed"
             style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(15px, 1.6vw, 18px)', maxWidth: '560px' }}>
            {t(L.sub, lang)}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-ink-900 text-cream font-medium text-sm rounded-full px-6 py-3 hover:bg-ink-800 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
              </svg>
              {t(L.wa_btn, lang)}
            </a>
            <a href={`tel:${site.phone}`}
               className="inline-flex items-center text-sm font-medium text-ink-700 rounded-full px-6 py-3 border border-ink-200 hover:border-ink-400 hover:text-ink-900 transition-colors">
              {site.phone_display}
            </a>
          </div>
        </div>
      </section>

      {/* Contact details + tip */}
      <section className="bg-cream py-14 lg:py-20 border-t border-ink-100/40">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-coral-600 font-medium mb-3">{t(L.ways_kicker, lang)}</p>
            <ul className="space-y-3 mt-6">
              <li>
                <p className="text-[10px] tracking-[0.14em] uppercase text-ink-500 mb-1">WhatsApp</p>
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                   className="text-ink-800 hover:text-coral-600" style={{ fontFamily: serif, fontSize: '20px' }}>
                  {site.phone_display}
                </a>
              </li>
              <li>
                <p className="text-[10px] tracking-[0.14em] uppercase text-ink-500 mb-1 mt-4">Phone</p>
                <a href={`tel:${site.phone}`}
                   className="text-ink-800 hover:text-coral-600" style={{ fontFamily: serif, fontSize: '20px' }}>
                  {site.phone_display}
                </a>
              </li>
              <li>
                <p className="text-[10px] tracking-[0.14em] uppercase text-ink-500 mb-1 mt-4">Email</p>
                <a href={`mailto:${site.email}`}
                   className="text-ink-800 hover:text-coral-600" style={{ fontFamily: serif, fontSize: '20px' }}>
                  {site.email}
                </a>
              </li>
            </ul>

            <div className="mt-10 pt-8 border-t border-ink-200">
              <p className="text-[10px] tracking-[0.14em] uppercase text-ink-500 mb-2">{t(L.hours_h, lang)}</p>
              <p className="text-ink-700" style={{ fontFamily: serif, fontSize: '15px', lineHeight: '1.85' }}>
                {t(L.hours_wd, lang)}<br/>
                {t(L.hours_sat, lang)}<br/>
                {t(L.hours_fri, lang)}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-[10px] tracking-[0.14em] uppercase text-ink-500 mb-2">{t(L.area_h, lang)}</p>
              <p className="text-ink-700" style={{ fontFamily: serif, fontSize: '15px', lineHeight: '1.7' }}>
                {t(L.area_p, lang)}
              </p>
            </div>
          </div>

          {/* Right column — what we need from you */}
          <div className="border-s-2 border-coral-500 ps-8">
            <h2 className="text-ink-900 font-normal mb-4"
                style={{ fontFamily: serif, fontSize: '24px', letterSpacing: '-0.01em' }}>
              {t(L.what_we_need, lang)}
            </h2>
            <p className="text-ink-700 leading-[1.85] text-base"
               style={{ fontFamily: serif }}>
              {t(L.hint_p, lang)}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
