import type { Metadata } from 'next'
import Link from 'next/link'
import { LANGS, type Lang, t, site, HREFLANG_MAP, getWaUrl } from '@/lib/i18n'
import { ServiceSchema } from '@/components/SchemaMarkup'

interface Props { params: Promise<{ lang: Lang }> }
export async function generateStaticParams() { return LANGS.map((l) => ({ lang: l })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const titles: Record<string, string> = {
    en: 'About POA in 30 | Private Notary Support Dubai',
    ar: 'عن POA in 30 دبي | دعم التوثيق الخاص' }
  const descs: Record<string, string> = {
    en: 'POA in 30 is Dubai\'s private notary support service. We prepare and coordinate POAs and legal documents — same day, fully online.',
    ar: 'POA in 30 خدمة دعم التوثيق الخاصة في دبي. نُعِدّ وننسق الوكالات والمستندات القانونية — في نفس اليوم، أونلاين بالكامل.' }
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
  h1_lead:  { en: "Dubai's private notary support service,", ar: 'خدمة دعم التوثيق الخاصة في دبي،' },
  h1_em:    { en: 'in 30 minutes.', ar: 'في 30 دقيقة.' },
  sub:      { en: 'We prepare and coordinate POAs, attestations, and legal documents — fully online via Dubai Courts video call. Not a law firm. We are document specialists.', ar: 'نُعِدّ وننسق الوكالات والتصديق والمستندات القانونية — أونلاين بالكامل عبر مكالمة فيديو محاكم دبي. لسنا مكتب محاماة. نحن متخصصو إعداد المستندات.' },
  what_kicker: { en: '— What we do', ar: '— ما نفعله' },
  what_h:   { en: 'Document preparation, drafted right.', ar: 'إعداد مستندات، مصاغة بالشكل الصحيح.' },
  what_p:   { en: 'POA in 30 prepares and coordinates document notarizations across the UAE. The notarization itself is performed by licensed UAE Notary Public authorities — Dubai Courts or the UAE Ministry of Justice — via secure video call. Our value is the precision: correct format, correct authority, accepted on first review.', ar: 'POA in 30 تُعد وتنسق توثيقات المستندات في الإمارات. التوثيق الفعلي يُنفَّذ بواسطة كتّاب العدل المرخصين — محاكم دبي أو وزارة العدل الاتحادية — عبر مكالمة فيديو آمنة. قيمتنا في الدقة: الصيغة الصحيحة، الجهة الصحيحة، تُقبل من أول مرة.' },
  why_kicker: { en: '— Why us', ar: '— لماذا نحن' },
  why_h:    { en: 'Built for speed, drafted for acceptance.', ar: 'مبنية على السرعة، مصاغة للقبول.' },
  cta_h:    { en: 'Ready when you are.', ar: 'جاهزون متى أردت.' },
  cta_p:    { en: 'Send a WhatsApp with what you need. We respond in minutes with cost and timeline.', ar: 'أرسل واتساب بما تحتاجه. نرد في دقائق بالتكلفة والجدول الزمني.' },
  wa_btn:   { en: 'Start on WhatsApp', ar: 'ابدأ عبر واتساب' },
  disclaim: { en: 'POA in 30 is a document preparation and coordination service — not a law firm. We do not provide legal advice. All notarization is performed by UAE-licensed Notary Public authorities.', ar: 'POA in 30 خدمة إعداد وتنسيق مستندات — وليست مكتب محاماة. لا نقدم استشارات قانونية. يُنفَّذ التوثيق بواسطة كتّاب العدل المرخصين في الإمارات.' } }

const WHY_POINTS = [
  { en: 'Same-day service — most documents notarized in hours, not days', ar: 'خدمة نفس اليوم — معظم المستندات تُوثَّق في ساعات لا أيام' },
  { en: 'Drafted to receiving authority specifications — accepted on first review', ar: 'مصاغة وفق متطلبات الجهة المستلمة — تُقبل من أول مراجعة' },
  { en: 'Fully remote — notarization via video call, no office visits required', ar: 'عن بُعد بالكامل — التوثيق بمكالمة فيديو، بدون زيارات مكتبية' },
  { en: 'Bilingual Arabic and English drafting on every document', ar: 'صياغة ثنائية اللغة عربي وإنجليزي على كل وثيقة' },
  { en: 'Recognized by all UAE authorities — DLD, RTA, MOFA, Dubai Courts, UAE banks', ar: 'معترف بها من جميع الجهات الإماراتية — دائرة الأراضي، RTA، الخارجية، محاكم دبي، البنوك' },
  { en: 'WhatsApp first, talk to a person — no forms, no call-back queues', ar: 'واتساب أولاً، تحدث مع شخص — لا نماذج، لا قوائم انتظار' },
]

const SERVICES = [
  { en: 'Power of Attorney (all types)', ar: 'الوكالات الرسمية (جميع الأنواع)', href: 'power-of-attorney' },
  { en: 'Affidavits and Sworn Statements',  ar: 'الإقرارات والتصريحات', href: 'affidavit' },
  { en: 'Certified True Copies',            ar: 'النسخ المصدّقة طبق الأصل', href: 'certified-true-copy' },
  { en: 'Last Will & Testament (DIFC)',     ar: 'الوصية الأخيرة (DIFC)', href: 'last-will-testament-dubai' },
  { en: 'MOFA & Embassy Attestation',       ar: 'تصديق الخارجية والسفارات', href: 'attestation/mofa' },
  { en: 'Legal Translation',                ar: 'الترجمة القانونية', href: 'legal-translation' },
  { en: 'Eviction Notices (Article 25)',    ar: 'إشعارات الإخلاء (المادة 25)', href: 'legal-notice/eviction' },
  { en: 'RDC Support',                      ar: 'دعم مركز فض النزاعات', href: 'rdc-support' },
  { en: 'Corporate Documents (MOA, BR, SHA)', ar: 'وثائق الشركات (عقد التأسيس، قرارات، اتفاقيات)', href: 'corporate/moa' },
]

export default async function Page({ params }: Props) {
  const { lang } = await params
  const isRTL = lang === 'ar'
  const serif = isRTL ? 'Amiri, serif' : 'Instrument Serif, serif'
  const waUrl = getWaUrl(t({ en: 'Hello POA in 30, I would like to know more.', ar: 'مرحبًا POA in 30، أريد معرفة المزيد.' }, lang))

  return (
    <>
      <ServiceSchema lang={lang} path="/about" />

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
            <span className="block w-8 h-px bg-coral-500/60" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-coral-600 font-medium">
              {isRTL ? 'عن الشركة' : 'About'}
            </span>
            <span className="block w-8 h-px bg-coral-500/60" />
          </div>

          <h1
            className="text-ink-900 leading-[1.05] tracking-tight font-normal"
            style={{ fontFamily: serif, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.015em' }}
          >
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
        </div>
      </section>

      {/* What we do — magazine grid */}
      <section className="bg-cream py-14 lg:py-20 border-t border-ink-100/40">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="text-[11px] tracking-[0.18em] uppercase text-coral-600 font-medium mb-3">{t(L.what_kicker, lang)}</p>
          <h2 className="text-ink-900 font-normal mb-5"
              style={{ fontFamily: serif, fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.01em' }}>
            {t(L.what_h, lang)}
          </h2>
          <p className="text-ink-700 leading-[1.85] text-base lg:text-[17px] mb-10"
             style={{ fontFamily: serif }}>
            {t(L.what_p, lang)}
          </p>

          {/* Services list — editorial, no boxy cards */}
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 border-t border-ink-200 pt-8">
            {SERVICES.map((svc, i) => (
              <li key={i}>
                <Link href={`/${lang}/${svc.href}`}
                      className="group flex items-baseline gap-3 text-ink-700 hover:text-coral-600 transition-colors py-1"
                      style={{ fontFamily: serif, fontSize: '16px' }}>
                  <span className="text-coral-500 opacity-60 group-hover:opacity-100 shrink-0">→</span>
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
          <p className="text-[11px] tracking-[0.18em] uppercase text-coral-600 font-medium mb-3">{t(L.why_kicker, lang)}</p>
          <h2 className="text-ink-900 font-normal mb-8"
              style={{ fontFamily: serif, fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.01em' }}>
            {t(L.why_h, lang)}
          </h2>
          <ol className="space-y-4">
            {WHY_POINTS.map((p, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-4 items-baseline">
                <span className="text-coral-500 font-normal text-2xl" style={{ fontFamily: serif }}>
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <p className="text-ink-800 leading-relaxed text-base lg:text-lg" style={{ fontFamily: serif }}>
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
          <p className="text-ink-500 text-sm leading-relaxed text-center" style={{ fontFamily: serif, fontStyle: 'italic' }}>
            {t(L.disclaim, lang)}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink-900 py-16 lg:py-20">
        <div className="mx-auto max-w-2xl px-4 lg:px-8 text-center">
          <h2 className="text-cream font-normal mb-4 leading-tight"
              style={{ fontFamily: serif, fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.01em' }}>
            {t(L.cta_h, lang)}
          </h2>
          <p className="text-ink-200 leading-relaxed mb-8 mx-auto max-w-md text-base"
             style={{ fontFamily: serif, fontStyle: 'italic' }}>
            {t(L.cta_p, lang)}
          </p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-coral-500 hover:bg-coral-600 text-cream font-medium text-sm rounded-full px-7 py-3.5 transition-colors">
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
