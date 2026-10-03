import { withSocial } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'
import { LANGS, type Lang, t, site, HREFLANG_MAP, getWaUrl } from '@/lib/i18n'
import { ContentPageSchema } from '@/components/SchemaMarkup'

interface Props { params: Promise<{ lang: Lang }> }
export async function generateStaticParams() { return LANGS.map((l) => ({ lang: l })) }

async function baseMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const titles: Record<string, string> = {
    en: 'About POA in 30 | Power of Attorney Specialists Dubai',
    ar: 'عن POA in 30 | متخصصون في الوكالات في دبي' }
  const descs: Record<string, string> = {
    en: 'POA in 30 is a Dubai service focused on Power of Attorney drafting and remote notarization coordination — from first WhatsApp message to notarized electronic POA in 30 minutes.',
    ar: 'POA in 30 خدمة في دبي متخصصة في صياغة الوكالات وتنسيق توثيقها عن بُعد — منذ أول رسالة عبر واتساب حتى استلام الوكالة الإلكترونية الموثقة خلال 30 دقيقة.' }
  return {
    title: titles[lang] || titles.en,
    description: descs[lang] || descs.en,
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/about/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/about/`])),
        'x-default': `https://www.poain30.ae/en/about/`,
      } },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descs[lang] || descs.en,
      url: `https://www.poain30.ae/${lang}/about/` } }
}

const L = {
  kicker:   { en: 'About POA in 30', ar: 'عن POA in 30' },
  h1_lead:  { en: "Dubai's Power of Attorney specialists,", ar: 'متخصصون في الوكالات القانونية في دبي،' },
  h1_em:    { en: 'in 30 minutes.', ar: 'في 30 دقيقة.' },
  sub:      { en: 'We focus on Power of Attorney: transaction-specific bilingual drafting, remote notarization coordination, and electronic delivery in 30 minutes. We are POA document specialists.', ar: 'نركز على الوكالات القانونية: صياغة ثنائية اللغة بحسب المعاملة، وتنسيق التوثيق عن بُعد، والتسليم الإلكتروني خلال 30 دقيقة. نحن متخصصون في إعداد الوكالات.' },
  what_kicker: { en: '— How We Help', ar: '— كيف نساعدك' },
  what_h:   { en: 'How We Help', ar: 'كيف نساعدك' },
  what_p:   { en: 'At POA in 30, we help you prepare the right Power of Attorney for the purpose you actually need, whether it is for a property, banking, business, court, or other transaction in the UAE.\n\nWe carefully review the details of the transaction and the required authorities, then draft the POA clearly and appropriately for the authority or institution where it will be used.\n\nOnce the document is ready, we help coordinate the appropriate notarization process, including electronic or remote procedures where available for the transaction.\n\nOur goal is to provide you with a Power of Attorney that is clear, accurate, and properly prepared from the start.', ar: 'في POA in 30 نساعدك على إعداد الوكالة المناسبة للغرض الذي تحتاجه فعليًا، سواء كانت لمعاملة عقارية، بنكية، تجارية، قضائية أو لأي إجراء آخر داخل الإمارات.\n\nنراجع تفاصيل المعاملة والصلاحيات المطلوبة بعناية، ثم نصيغ الوكالة بصورة واضحة ومناسبة للجهة التي ستُستخدم أمامها.\n\nوبعد تجهيز المستند، نساعدك في ترتيب خطوات التوثيق المناسبة، بما في ذلك الإجراءات الإلكترونية أو عن بُعد عندما تكون متاحة للمعاملة.\n\nهدفنا أن تحصل على وكالة واضحة، دقيقة، ومجهزة بشكل صحيح من البداية.' },
  why_kicker: { en: '— Why us', ar: '— لماذا نحن' },
  why_h:    { en: 'Built for speed, drafted for the receiving authority.', ar: 'مصممة للسرعة، ومصاغة وفق متطلبات الجهة المستلمة.' },
  cta_h:    { en: 'Ready when you are.', ar: 'جاهزون متى أردت.' },
  cta_p:    { en: 'Send a WhatsApp with what you need. We respond in minutes with cost and timeline.', ar: 'أرسل واتساب بما تحتاجه. نرد خلال دقائق بالتكلفة والجدول الزمني.' },
  wa_btn:   { en: 'Start on WhatsApp', ar: 'ابدأ عبر واتساب' },
  disclaim: { en: 'POA in 30 provides document preparation and coordination services. All notarization is performed by UAE-licensed Notary Public authorities.', ar: 'POA in 30 تقدم خدمات إعداد وتنسيق المستندات. يُنفَّذ التوثيق بواسطة كتّاب العدل المرخصين في الإمارات.' }
}
const WHY_POINTS = [
  { en: '30-minute POA service — from first WhatsApp message to notarized electronic POA', ar: 'خدمة وكالة خلال 30 دقيقة — منذ أول رسالة عبر واتساب حتى استلام الوكالة الإلكترونية الموثقة' },
  { en: 'Drafted to receiving authority specifications', ar: 'مصاغة وفق متطلبات الجهة المستلمة' },
  { en: 'Fully remote — notarization via video call, no office visits required', ar: 'عن بُعد بالكامل — التوثيق بمكالمة فيديو، بدون زيارات مكتبية' },
  { en: 'Bilingual Arabic and English drafting on every document', ar: 'صياغة ثنائية اللغة عربي وإنجليزي على كل وثيقة' },
  { en: 'Transaction-specific drafting for DLD, RTA, banks, courts, companies and other receiving authorities', ar: 'صياغة مخصصة للمعاملة لدى دائرة الأراضي وهيئة الطرق والبنوك والمحاكم والشركات وغيرها من الجهات المستلمة' },
  { en: 'WhatsApp first, talk to a person — no forms, no call-back queues', ar: 'واتساب أولاً، تحدث مع شخص — لا نماذج، لا قوائم انتظار' },
]

const SERVICES = [
  { en: 'General Power of Attorney',       ar: 'الوكالة العامة', href: 'power-of-attorney/general' },
  { en: 'Special Power of Attorney',       ar: 'الوكالة الخاصة', href: 'power-of-attorney/special' },
  { en: 'Real Estate POA',                 ar: 'الوكالة العقارية', href: 'power-of-attorney/real-estate' },
  { en: 'Bank POA',                        ar: 'الوكالة البنكية', href: 'power-of-attorney/bank' },
  { en: 'Court POA',                       ar: 'الوكالة القضائية', href: 'power-of-attorney/court' },
  { en: 'Vehicle POA',                     ar: 'وكالة المركبات', href: 'power-of-attorney/vehicle' },
  { en: 'Company Formation POA',           ar: 'وكالة تأسيس شركة', href: 'power-of-attorney/company-formation' },
  { en: 'Child Travel Authorization',      ar: 'إذن سفر الطفل', href: 'power-of-attorney/child-travel' },
  { en: 'POA Cancellation',                ar: 'إلغاء الوكالة', href: 'poa-cancellation' },
]
export default async function Page({ params }: Props) {
  const { lang } = await params
  const isRTL = lang === 'ar'
  const headingFont = isRTL ? "'IBM Plex Sans Arabic', sans-serif" : "'Plus Jakarta Sans', sans-serif"
  const waUrl = getWaUrl(t({ en: 'Hello POA in 30, I would like to know more.', ar: 'مرحبًا POA in 30، أريد معرفة المزيد.' }, lang))

  return (
    <>
      <ContentPageSchema lang={lang} path="/about" />

      {/* Masthead */}
      <div className="bg-cream border-b border-ink-100/60">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 py-3 flex items-center justify-between">
          <span className="text-[11px] tracking-[0.18em] uppercase text-ink-500 font-medium">{t(L.kicker, lang)}</span>
          <span className="text-[11px] tracking-[0.18em] uppercase text-ink-500 font-medium hidden sm:inline">Dubai · UAE</span>
        </div>
      </div>

      {/* Hero — centered editorial */}
      <section className="bg-cream pt-12 pb-10 lg:pt-20 lg:pb-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="block w-8 h-px bg-gold-500/60" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-gold-600 font-medium">
              {isRTL ? 'عن الشركة' : 'About'}
            </span>
            <span className="block w-8 h-px bg-gold-500/60" />
          </div>

          <h1
            className="text-ink-900 leading-[1.05] tracking-tight font-normal"
            style={{ fontFamily: headingFont, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.015em' }}
          >
            {t(L.h1_lead, lang)}
            <br/>
            <em className="text-gold-600 not-italic" style={{ fontStyle: 'italic' }}>
              {t(L.h1_em, lang)}
            </em>
          </h1>

          <p className="text-ink-600 mt-6 mx-auto leading-relaxed"
             style={{ fontFamily: headingFont, fontStyle: 'italic', fontSize: 'clamp(15px, 1.6vw, 18px)', maxWidth: '560px' }}>
            {t(L.sub, lang)}
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

      {/* What we do — magazine grid */}
      <section className="bg-cream py-14 lg:py-20 border-t border-ink-100/40">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="text-[11px] tracking-[0.18em] uppercase text-gold-600 font-medium mb-6">{t(L.what_kicker, lang)}</p>
          <div className="text-ink-700 leading-[1.85] text-base lg:text-[17px] mb-10 space-y-4"
               style={{ fontFamily: headingFont }}>
            {t(L.what_p, lang).split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Services list — editorial, no boxy cards */}
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 border-t border-ink-200 pt-8">
            {SERVICES.map((svc, i) => (
              <li key={i}>
                <Link href={`/${lang}/${svc.href}`}
                      className="group flex items-baseline gap-3 text-ink-700 hover:text-gold-600 transition-colors py-1"
                      style={{ fontFamily: headingFont, fontSize: '16px' }}>
                  <span className="text-gold-500 opacity-60 group-hover:opacity-100 shrink-0">→</span>
                  <span>{t(svc, lang)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-soft-sand py-14 lg:py-20 border-t border-ink-100/40">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="text-[11px] tracking-[0.18em] uppercase text-gold-600 font-medium mb-3">{t(L.why_kicker, lang)}</p>
          <h2 className="text-ink-900 font-normal mb-8"
              style={{ fontFamily: headingFont, fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.01em' }}>
            {t(L.why_h, lang)}
          </h2>
          <ol className="space-y-4 list-none">
            {WHY_POINTS.map((p, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-4 items-baseline">
                <span className="text-gold-500 font-normal text-2xl" style={{ fontFamily: headingFont }}>
                  {i + 1}.
                </span>
                <p className="text-ink-800 leading-relaxed text-base lg:text-lg" style={{ fontFamily: headingFont }}>
                  {t(p, lang)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-cream py-10 border-t border-ink-100/40">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="text-ink-500 text-sm leading-relaxed text-center" style={{ fontFamily: headingFont, fontStyle: 'italic' }}>
            {t(L.disclaim, lang)}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink-900 py-16 lg:py-20">
        <div className="mx-auto max-w-2xl px-4 lg:px-8 text-center">
          <h2 className="text-cream font-normal mb-4 leading-tight"
              style={{ fontFamily: headingFont, fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.01em' }}>
            {t(L.cta_h, lang)}
          </h2>
          <p className="text-ink-200 leading-relaxed mb-8 mx-auto max-w-md text-base"
             style={{ fontFamily: headingFont, fontStyle: 'italic' }}>
            {t(L.cta_p, lang)}
          </p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-cream font-medium text-sm rounded-full px-7 py-3.5 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
            </svg>
            {t(L.wa_btn, lang)}
          </a>
        </div>
      </section>
    </>
  )
}

export async function generateMetadata(...args: Parameters<typeof baseMetadata>): Promise<Metadata> {
  return withSocial(await baseMetadata(...args))
}
