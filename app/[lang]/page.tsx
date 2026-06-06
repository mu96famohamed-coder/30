import Link from 'next/link'
import type { Metadata } from 'next'
import { type Lang, t, site, LANGS, getPageFaq } from '@/lib/i18n'
import FAQSection from '@/components/FAQSection'
import { FAQSchema, ServiceSchema } from '@/components/SchemaMarkup'
import { buildWebsiteSchema } from '@/lib/seo/schema-builder'

// ─────────────────────────────────────────────────────────────────────────────
// Homepage — POA in 30 (Editorial Serif · Concept 1)
// Single-column hero with Instrument Serif headline + coral italic accent.
// No right-column graphic, no trust-logos row beneath the hero.
// Below the fold: editorial 6-tile service grid, 3-step process with serif
// numerals, 2 support cards, FAQ accordion, final dark CTA.
// No prices anywhere — lead capture is via WhatsApp.
// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }): Promise<Metadata> {
  const { lang } = await params
  const titles: Record<string, string> = {
    en: 'Power of Attorney Dubai | Online in 30 Min | POA in 30',
    ar: 'وكالة قانونية دبي أونلاين | توثيق في 30 دقيقة | POA in 30',
  }
  const descs: Record<string, string> = {
    en: 'Draft and notarize your Dubai Power of Attorney online in 30 minutes via Dubai Courts video call. No office visit. WhatsApp us to start.',
    ar: 'صياغة وتوثيق وكالتك القانونية في دبي أونلاين خلال 30 دقيقة عبر مكالمة فيديو مع محاكم دبي. بدون زيارة مكتب.',
  }
  return {
    title: titles[lang] || titles.en,
    description: descs[lang] || descs.en,
    robots: 'index, follow',
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/`,
      languages: {
        'en-AE': 'https://www.poain30.ae/en/',
        'ar-AE': 'https://www.poain30.ae/ar/',
        'x-default': 'https://www.poain30.ae/en/',
      },
    },
  }
}

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

interface Props { params: Promise<{ lang: Lang }> }

// ─── localized strings ─────────────────────────────────────────────────────
const S = {
  // Hero
  hero_kicker: {
    en: 'Power of Attorney · Dubai',
    ar: 'وكالة رسمية · دبي',
  },
  h1_lead: {
    en: 'Your power of attorney,',
    ar: 'وكالتك الرسمية،',
  },
  h1_em: {
    en: 'notarized in 30 minutes.',
    ar: 'مصدّقة في 30 دقيقة.',
  },
  sub: {
    en: 'Drafted by legal experts. Notarized through Dubai Courts or the UAE Ministry of Justice via video call. No office visits.',
    ar: 'صياغة بواسطة خبراء قانونيين. التوثيق عبر محاكم دبي أو وزارة العدل الإماراتية بمكالمة فيديو. بدون زيارات مكتبية.',
  },
  cta_primary: {
    en: 'Start on WhatsApp',
    ar: 'ابدأ عبر واتساب',
  },
  cta_secondary: {
    en: 'How it works',
    ar: 'كيف يعمل',
  },

  // Services section
  services_kicker: {
    en: 'What we draft',
    ar: 'ما نصيغه',
  },
  services_heading: {
    en: 'Every POA, every authority',
    ar: 'كل الوكالات، كل الجهات',
  },
  services_sub: {
    en: 'Pick what you need — we take care of the drafting, the notarization, and the delivery.',
    ar: 'اختر ما تحتاجه — نتولى الصياغة والتوثيق والتسليم.',
  },

  // Process section
  process_kicker: {
    en: 'The process',
    ar: 'الخطوات',
  },
  steps_heading: {
    en: 'Three steps. Thirty minutes.',
    ar: 'ثلاث خطوات. ثلاثون دقيقة.',
  },

  // Support section
  support_heading: {
    en: 'Find the support that fits you',
    ar: 'اختر الدعم المناسب لك',
  },
  support_sub: {
    en: 'Simple case or complex one.',
    ar: 'سواء كانت معاملتك بسيطة أو معقدة.',
  },
  guided_title: { en: 'Guided online service', ar: 'خدمة موجهة أونلاين' },
  guided_sub: {
    en: 'Tell us what you need. We draft it, you review it, we notarize it.',
    ar: 'أخبرنا ما تحتاجه. نقوم بصياغته، تقوم بمراجعته، ونقوم بتصديقه.',
  },
  specialist_title: { en: 'Talk to a bilingual specialist', ar: 'تحدّث مع مختص ثنائي اللغة' },
  specialist_sub: {
    en: 'Complex or multi-party POA? Get direct guidance in English or Arabic within minutes.',
    ar: 'وكالة معقدة أو متعددة الأطراف؟ احصل على إرشاد مباشر بالعربية أو الإنجليزية في دقائق.',
  },

  // FAQ
  faq_kicker: {
    en: 'Asked often',
    ar: 'الأسئلة الشائعة',
  },
  faq_heading: {
    en: 'Questions, answered plainly',
    ar: 'أسئلة بإجابات واضحة',
  },

  // Final CTA
  final_heading: {
    en: 'Ready when you are.',
    ar: 'جاهزون متى أردت.',
  },
  final_sub: {
    en: 'Send us a WhatsApp message with what you need. We respond in minutes.',
    ar: 'أرسل لنا رسالة واتساب بما تحتاجه. نرد في دقائق.',
  },

  // Support CTA text (specialist card)
  specialist_cta: {
    en: 'Talk to a specialist',
    ar: 'تحدّث مع مختص',
  },
}

// ─── service tiles (6) — editorial style ──────────────────────────────────
// Each tile has a serif title and a coral small-caps subtitle. No icons.
// 6 pillars from docs/INTERNAL_LINKING_MAP.md.
// These match the pillar map used by lib/seo/internal-linking.ts so the
// homepage acts as the canonical entry-point for every service cluster.
const TILES: Array<{
  href: string
  title: { en: string; ar: string }
  sub: { en: string; ar: string }
}> = [
  {
    href: '/power-of-attorney',
    title: { en: 'Power of Attorney', ar: 'الوكالات الرسمية' },
    sub: {
      en: 'General · Special · Court · Real Estate',
      ar: 'عامة · خاصة · قضائية · عقارية',
    },
  },
  {
    href: '/power-of-attorney/real-estate',
    title: { en: 'Real Estate POA', ar: 'وكالة عقارية' },
    sub: {
      en: 'Sale · Purchase · Management · Gifting',
      ar: 'بيع · شراء · إدارة · هبة',
    },
  },
  {
    href: '/power-of-attorney/vehicle',
    title: { en: 'Vehicle POA', ar: 'وكالة مركبة' },
    sub: {
      en: 'Sale · Export · Management',
      ar: 'بيع · تصدير · إدارة',
    },
  },
  {
    href: '/legal-notice',
    title: { en: 'Legal Notices', ar: 'الإنذارات العدلية' },
    sub: {
      en: 'Eviction · Cancellation · Tableegh',
      ar: 'إخلاء · إلغاء وكالة · تبليغ',
    },
  },
  {
    href: '/e-notary',
    title: { en: 'E-Notary', ar: 'التوثيق الإلكتروني' },
    sub: {
      en: 'Video call · Mobile · Same-day urgent',
      ar: 'مكالمة فيديو · متنقل · توثيق عاجل',
    },
  },
  {
    href: '/poa-cancellation',
    title: { en: 'POA Cancellation', ar: 'إلغاء الوكالة' },
    sub: {
      en: 'Revoke · Notify · Same-day',
      ar: 'سند الإلغاء · تبليغ الوكيل · نفس اليوم',
    },
  },
]

// ─── how-it-works steps ────────────────────────────────────────────────────
const STEPS: Array<{ title: { en: string; ar: string }; body: { en: string; ar: string } }> = [
  {
    title: { en: 'You send the details', ar: 'ترسل لنا التفاصيل' },
    body: {
      en: 'A WhatsApp message describing what the POA should authorize and which authority will receive it.',
      ar: 'رسالة واتساب تصف ما تريد أن تفوّضه الوكالة والجهة التي ستستلمها.',
    },
  },
  {
    title: { en: 'We draft in English and Arabic', ar: 'نصيغ بالإنجليزية والعربية' },
    body: {
      en: "Drafted to the receiving authority's requirements. You review and approve before notarization.",
      ar: 'صياغة وفق متطلبات الجهة المستلمة. تقوم بالمراجعة والموافقة قبل التوثيق.',
    },
  },
  {
    title: { en: 'Video call to notarize', ar: 'مكالمة فيديو للتوثيق' },
    body: {
      en: 'Dubai Courts or the UAE Ministry of Justice — both available by video call.',
      ar: 'محاكم دبي أو وزارة العدل الإماراتية — كلاهما متاح بمكالمة فيديو.',
    },
  },
]

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  const faqItems = getPageFaq('/')
  const isRTL = lang === 'ar'
  const serifFontStack = isRTL ? 'Amiri, serif' : 'Cormorant Garamond, Georgia, serif'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebsiteSchema(lang)),
        }}
      />
      <ServiceSchema lang={lang} path="/" />
      {faqItems.length > 0 && <FAQSchema items={faqItems} lang={lang} />}

      {/* ══════════════════════════════════════════════════════════════════
          HERO — Single column, editorial serif, left-aligned
          Typography-first. No imagery. Gold kicker. Midnight CTA.
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-hero-warm">
        <div className="wrap py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <span className="kicker">{t(S.hero_kicker, lang)}</span>

            <h1 className="h-serif-hero mb-7">
              <span className="block mb-2">{t(S.h1_lead, lang)}</span>
              <span className="block h-serif-em">{t(S.h1_em, lang)}</span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed max-w-xl mb-10" style={{ color: 'var(--text-muted)' }}>
              {t(S.sub, lang)}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${site.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {/* WhatsApp icon */}
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                </svg>
                {t(S.cta_primary, lang)}
              </a>
              <Link href={`/${lang}#how-it-works`} className="btn-outline">
                {t(S.cta_secondary, lang)} ↓
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TRUST STRIP — "Accepted by" authority logos
          ══════════════════════════════════════════════════════════════════ */}
      <div className="trust-strip border-y" style={{ borderColor: 'var(--border-default)' }}>
        <div className="wrap">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <span
              className="text-xs font-medium shrink-0"
              style={{ fontFamily: 'DM Sans, system-ui, sans-serif', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              {lang === 'ar' ? 'مقبولة لدى:' : 'Accepted by:'}
            </span>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {['Dubai Courts', 'DLD', 'RTA', 'MOFA', 'MOHRE', 'MOJ', 'RDC'].map((name) => (
                <span
                  key={name}
                  className="text-xs font-semibold tracking-wide transition-colors"
                  style={{
                    fontFamily: 'DM Sans, system-ui, sans-serif',
                    color: 'var(--text-muted)',
                    opacity: 0.6,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SERVICE GRID — white cards, gold hover border, DM Sans titles
          ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--bg-base)' }} className="py-20 sm:py-28">
        <div className="wrap">
          <div className="text-center mb-14">
            <span className="kicker kicker-dash">{t(S.services_kicker, lang)}</span>
            <h2 className="h-serif-section mb-4">{t(S.services_heading, lang)}</h2>
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              {t(S.services_sub, lang)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {TILES.map((tile) => (
              <Link
                key={tile.href}
                href={`/${lang}${tile.href}`}
                className="tile-editorial group"
              >
                <h3 className="tile-editorial-title">{t(tile.title, lang)}</h3>
                <div className="tile-editorial-sub">{t(tile.sub, lang)}</div>
                <span className="text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--brand-gold)' }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          HOW IT WORKS — 3 steps, large light-gold numerals (01 · 02 · 03)
          ══════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="bg-soft-sand py-20 sm:py-28">
        <div className="wrap">
          <div className="text-center mb-14">
            <span className="kicker kicker-dash">{t(S.process_kicker, lang)}</span>
            <h2 className="h-serif-section">{t(S.steps_heading, lang)}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 max-w-5xl mx-auto">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`flex flex-col items-start gap-4 ${
                  i > 0
                    ? isRTL
                      ? 'md:pr-8 md:border-r'
                      : 'md:pl-8 md:border-l'
                    : ''
                }`}
                style={i > 0 ? { borderColor: 'var(--border-default)' } : {}}
              >
                <div className="step-serif">{String(i + 1).padStart(2, '0')}</div>
                <h3
                  className="text-xl sm:text-2xl font-semibold leading-tight"
                  style={{ fontFamily: 'DM Sans, system-ui, sans-serif', color: 'var(--text-primary)' }}
                >
                  {t(step.title, lang)}
                </h3>
                <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {t(step.body, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SUPPORT OPTIONS — 2-card layout
          ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--bg-base)' }} className="py-20 sm:py-28">
        <div className="wrap">
          <div className="text-center mb-14">
            <h2 className="h-serif-section mb-4">{t(S.support_heading, lang)}</h2>
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              {t(S.support_sub, lang)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <div className="support-tile-light">
              <h3
                className="text-xl sm:text-2xl font-semibold mb-2 leading-tight"
                style={{ fontFamily: 'DM Sans, system-ui, sans-serif', color: 'var(--text-primary)' }}
              >
                {t(S.guided_title, lang)}
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                {t(S.guided_sub, lang)}
              </p>
              <a
                href={`https://wa.me/${site.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary self-start"
                aria-label={lang === 'ar' ? 'ابدأ عبر واتساب — اسألنا الآن' : 'Start on WhatsApp — ask us now'}
              >
                {t(S.cta_primary, lang)}
              </a>
            </div>

            <div className="support-tile-dark">
              <h3
                className="text-xl sm:text-2xl font-semibold mb-2 leading-tight"
                style={{ fontFamily: 'DM Sans, system-ui, sans-serif', color: 'var(--text-inverse)' }}
              >
                {t(S.specialist_title, lang)}
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed mb-6" style={{ color: '#CBD5E1' }}>
                {t(S.specialist_sub, lang)}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="btn-gold self-start"
              >
                {t(S.specialist_cta, lang)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ — editorial accordion, borders only (no card backgrounds)
          ══════════════════════════════════════════════════════════════════ */}
      {faqItems.length > 0 && (
        <section className="bg-soft-sand py-20 sm:py-28">
          <div className="wrap max-w-3xl">
            <div className="text-center mb-12">
              <span className="kicker kicker-dash">{t(S.faq_kicker, lang)}</span>
              <h2 className="h-serif-section">{t(S.faq_heading, lang)}</h2>
            </div>
            <FAQSection items={faqItems} lang={lang} />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          FINAL CTA — midnight background, gold button, Cormorant headline
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-texture-dark py-24 sm:py-32" style={{ backgroundColor: 'var(--brand-midnight)' }}>
        <div className="wrap text-center">
          <h2
            className="font-light leading-tight mb-5"
            style={{
              fontFamily: serifFontStack,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--text-inverse)',
              fontWeight: 300,
            }}
          >
            {t(S.final_heading, lang)}
          </h2>
          <p
            className="max-w-xl mx-auto mb-10 leading-relaxed text-base sm:text-lg"
            style={{ color: '#9CA3AF' }}
          >
            {t(S.final_sub, lang)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
            <a
              href={`https://wa.me/${site.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              aria-label={lang === 'ar' ? 'ابدأ عبر واتساب — ابدأ الآن' : 'Start on WhatsApp — get started now'}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
              </svg>
              {t(S.cta_primary, lang)}
            </a>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 font-medium text-[15px] transition-colors"
              style={{
                padding: '0.875rem 2rem',
                border: '1.5px solid rgba(201,168,76,0.35)',
                borderRadius: '6px',
                color: '#D1D5DB',
                fontFamily: 'DM Sans, system-ui, sans-serif',
              }}
            >
              {t(S.specialist_cta, lang)}
            </Link>
          </div>
          <p className="text-sm" style={{ color: '#6B7280', fontFamily: 'DM Sans, system-ui, sans-serif' }}>
            {site.phone_display}
          </p>
        </div>
      </section>
    </>
  )
}
