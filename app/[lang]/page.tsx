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
    en: 'Complex POA or corporate matter? Get direct guidance in English or Arabic within minutes.',
    ar: 'معاملة وكالة معقدة أو شأن شركات؟ احصل على إرشاد مباشر بالعربية أو الإنجليزية في دقائق.',
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
    href: '/e-notary',
    title: { en: 'E-Notary', ar: 'الكاتب العدل الإلكتروني' },
    sub: {
      en: 'Online · Mobile · Same-day urgent',
      ar: 'أونلاين · متنقل · توثيق عاجل',
    },
  },
  {
    href: '/attestation/mofa',
    title: { en: 'MOFA Attestation', ar: 'تصديق وزارة الخارجية' },
    sub: {
      en: 'Embassy · Degree · Marriage',
      ar: 'سفارات · شهادات · عقود زواج',
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
    href: '/corporate/moa',
    title: { en: 'Corporate', ar: 'الشركات' },
    sub: {
      en: 'MOA · Resolutions · Share transfer',
      ar: 'عقد تأسيس · قرارات · نقل أسهم',
    },
  },
  {
    href: '/legal-translation',
    title: { en: 'Legal Translation', ar: 'الترجمة القانونية' },
    sub: {
      en: 'Court-certified · Arabic ↔ English',
      ar: 'معتمدة من المحاكم · عربي وإنجليزي',
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
  const serifFontStack = isRTL ? 'Amiri, serif' : 'Instrument Serif, serif'

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
          No right column. No trust row underneath. Just the idea itself.
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-hero-warm">
        <div className="wrap py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            <span className="kicker">{t(S.hero_kicker, lang)}</span>

            <h1 className="h-serif-hero mb-7">
              <span className="block mb-2">{t(S.h1_lead, lang)}</span>
              <span className="block h-serif-em">{t(S.h1_em, lang)}</span>
            </h1>

            <p className="text-base sm:text-lg text-ink-600 leading-relaxed max-w-xl mb-9">
              {t(S.sub, lang)}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${site.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t(S.cta_primary, lang)}
              </a>
              <Link href={`/${lang}#how-it-works`} className="btn-outline">
                {t(S.cta_secondary, lang)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SERVICE GRID — editorial 6-tile, serif names + coral subs, no icons
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="wrap">
          <div className="text-center mb-12">
            <span className="kicker kicker-dash">{t(S.services_kicker, lang)}</span>
            <h2 className="h-serif-section mb-4">{t(S.services_heading, lang)}</h2>
            <p className="text-base sm:text-lg text-ink-500 leading-relaxed max-w-2xl mx-auto">
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          HOW IT WORKS — 3 steps with large serif numerals (01. 02. 03.)
          ══════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="bg-soft-sand py-16 sm:py-24">
        <div className="wrap">
          <div className="text-center mb-12">
            <span className="kicker kicker-dash">{t(S.process_kicker, lang)}</span>
            <h2 className="h-serif-section">{t(S.steps_heading, lang)}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-5xl mx-auto">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`flex flex-col items-start gap-3 ${
                  i > 0
                    ? isRTL
                      ? 'md:pr-6 md:border-r md:border-ink-100'
                      : 'md:pl-6 md:border-l md:border-ink-100'
                    : ''
                }`}
              >
                <div className="step-serif">{String(i + 1).padStart(2, '0')}.</div>
                <h3
                  className="text-xl sm:text-2xl font-normal text-ink-700 mt-2 leading-tight"
                  style={{ fontFamily: serifFontStack }}
                >
                  {t(step.title, lang)}
                </h3>
                <p className="text-sm sm:text-base text-ink-500 leading-relaxed">
                  {t(step.body, lang)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SUPPORT OPTIONS — 2-card layout, editorial styling
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="wrap">
          <div className="text-center mb-12">
            <h2 className="h-serif-section mb-4">{t(S.support_heading, lang)}</h2>
            <p className="text-base sm:text-lg text-ink-500 leading-relaxed max-w-2xl mx-auto">
              {t(S.support_sub, lang)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <div className="support-tile-light">
              <h3
                className="text-xl sm:text-2xl font-normal text-ink-700 mb-2 leading-tight"
                style={{ fontFamily: serifFontStack }}
              >
                {t(S.guided_title, lang)}
              </h3>
              <p className="text-sm sm:text-base text-ink-600 leading-relaxed mb-5">
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
                className="text-xl sm:text-2xl font-normal text-white mb-2 leading-tight"
                style={{ fontFamily: serifFontStack }}
              >
                {t(S.specialist_title, lang)}
              </h3>
              <p className="text-sm sm:text-base text-ink-100 leading-relaxed mb-5">
                {t(S.specialist_sub, lang)}
              </p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-coral-500 hover:bg-coral-600 text-white text-sm font-medium transition-colors self-start"
              >
                {t(S.specialist_cta, lang)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ — editorial section, keeping existing FAQSection component
          ══════════════════════════════════════════════════════════════════ */}
      {faqItems.length > 0 && (
        <section className="bg-soft-sand py-16 sm:py-24">
          <div className="wrap max-w-3xl">
            <div className="text-center mb-10">
              <span className="kicker kicker-dash">{t(S.faq_kicker, lang)}</span>
              <h2 className="h-serif-section">{t(S.faq_heading, lang)}</h2>
            </div>
            <FAQSection items={faqItems} lang={lang} />
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          FINAL CTA — dark navy, serif headline
          ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-ink-800 py-20 sm:py-24">
        <div className="wrap text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-4 leading-tight"
            style={{ fontFamily: serifFontStack }}
          >
            {t(S.final_heading, lang)}
          </h2>
          <p className="text-base sm:text-lg text-ink-200 max-w-xl mx-auto mb-9 leading-relaxed">
            {t(S.final_sub, lang)}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <a
              href={`https://wa.me/${site.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              aria-label={lang === 'ar' ? 'ابدأ عبر واتساب — ابدأ الآن مجاناً' : 'Start on WhatsApp — get started now'}
            >
              {t(S.cta_primary, lang)}
            </a>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-pill border border-cream-400/40 text-cream-100 font-medium text-sm hover:bg-cream-50/10 transition-colors"
            >
              {t(S.specialist_cta, lang)}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
