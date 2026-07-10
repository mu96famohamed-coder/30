import type { Metadata } from 'next'
import Link from 'next/link'
import { LANGS, type Lang, t, getBlogPosts, HREFLANG_MAP } from '@/lib/i18n'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() { return LANGS.map((lang) => ({ lang })) }

const BASE = 'https://www.poain30.ae'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const titles: Record<string, string> = {
    en: 'Blog — POA & Notarization Guides for Dubai | POA in 30',
    ar: 'المدونة — أدلة الوكالات والتوثيق في دبي | POA in 30',
  }
  const descs: Record<string, string> = {
    en: 'Practical guides on UAE powers of attorney: validity, cancellation, DLD requirements, and remote notarization. Notarization happens through Dubai Courts or the UAE Ministry of Justice via a video call.',
    ar: 'أدلة عملية عن الوكالات الإماراتية: الصلاحية والإلغاء ومتطلبات دائرة الأراضي. يتم التوثيق عبر محاكم دبي أو وزارة العدل الإماراتية من خلال مكالمة فيديو.',
  }
  return {
    title: titles[lang] || titles.en,
    description: descs[lang] || descs.en,
    alternates: {
      canonical: `${BASE}/${lang}/blog/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `${BASE}/${l}/blog/`])),
        'x-default': `${BASE}/en/blog/`,
      },
    },
  }
}

export default async function BlogIndexPage({ params }: Props) {
  const { lang } = await params
  const isRTL = lang === 'ar'
  const headingFont = isRTL ? "'IBM Plex Sans Arabic', sans-serif" : "'Plus Jakarta Sans', sans-serif"
  const posts = getBlogPosts()

  return (
    <main dir={isRTL ? 'rtl' : 'ltr'} style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Hero */}
      <section className="hero-navy">
        <div className="wrap py-16 sm:py-20 relative text-center">
          <p className="hero-kick mb-4">{isRTL ? 'المدونة' : 'Blog'}</p>
          <h1 className="hero-h1 mx-auto mb-4" style={{ maxWidth: '22ch' }}>
            {isRTL ? 'أدلة عملية للوكالات والتوثيق في دبي' : 'Practical guides to POAs and notarization in Dubai'}
          </h1>
          <p className="hero-sub mx-auto" style={{ maxWidth: '52ch' }}>
            {isRTL
              ? 'مقالات مبنية على الإجراءات الفعلية لدى الجهات الإماراتية — دون تسويق، ودون حشو.'
              : 'Articles built on the actual procedures of UAE authorities — no marketing, no filler.'}
          </p>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-16 sm:py-20">
        <div className="wrap">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
                className="tile-editorial group"
              >
                <time
                  className="text-xs font-semibold tracking-wide"
                  style={{ color: 'var(--gold)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  dateTime={post.updated}
                >
                  {new Date(post.updated + 'T00:00:00Z').toLocaleDateString(isRTL ? 'ar-AE' : 'en-GB', {
                    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
                  })}
                </time>
                <h2 className="tile-editorial-title" style={{ fontFamily: headingFont }}>
                  {t(post.title, lang)}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t(post.meta, lang)}
                </p>
                <span className="text-sm mt-1 font-bold" style={{ color: 'var(--navy)', borderBottom: '2px solid var(--gold)', alignSelf: 'flex-start' }}>
                  {isRTL ? 'اقرأ المقال' : 'Read the article'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
