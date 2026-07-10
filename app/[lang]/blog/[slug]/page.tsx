import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LANGS, type Lang, t, getBlogPosts, getBlogPost, site, HREFLANG_MAP } from '@/lib/i18n'
import { FAQSchema } from '@/components/SchemaMarkup'

interface Props { params: Promise<{ lang: Lang; slug: string }> }

const BASE = 'https://www.poain30.ae'

export async function generateStaticParams() {
  return LANGS.flatMap((lang) => getBlogPosts().map((p) => ({ lang, slug: p.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${t(post.title, lang)} | POA in 30`,
    description: t(post.meta, lang),
    alternates: {
      canonical: `${BASE}/${lang}/blog/${post.slug}/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `${BASE}/${l}/blog/${post.slug}/`])),
        'x-default': `${BASE}/en/blog/${post.slug}/`,
      },
    },
  }
}

function articleSchema(lang: Lang, post: NonNullable<ReturnType<typeof getBlogPost>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t(post.title, lang),
    description: t(post.meta, lang),
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: lang === 'ar' ? 'ar-AE' : 'en-AE',
    mainEntityOfPage: `${BASE}/${lang}/blog/${post.slug}/`,
    author: { '@type': 'Organization', name: 'POA in 30', url: BASE },
    publisher: { '@type': 'Organization', name: 'POA in 30', url: BASE },
  }
}

function breadcrumbSchema(lang: Lang, post: NonNullable<ReturnType<typeof getBlogPost>>) {
  const blogLabel = lang === 'ar' ? 'المدونة' : 'Blog'
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'ar' ? 'الرئيسية' : 'Home', item: `${BASE}/${lang}/` },
      { '@type': 'ListItem', position: 2, name: blogLabel, item: `${BASE}/${lang}/blog/` },
      { '@type': 'ListItem', position: 3, name: t(post.title, lang), item: `${BASE}/${lang}/blog/${post.slug}/` },
    ],
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const isRTL = lang === 'ar'
  const headingFont = isRTL ? "'IBM Plex Sans Arabic', sans-serif" : "'Plus Jakarta Sans', sans-serif"
  const waHref = `https://wa.me/${site.phone.replace(/\D/g, '')}`
  const faqItems = (post.faq ?? []).map((f) => ({ q: f.q, a: f.a }))

  return (
    <main dir={isRTL ? 'rtl' : 'ltr'} style={{ backgroundColor: 'var(--bg-base)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(lang, post)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(lang, post)) }} />
      {faqItems.length > 0 && <FAQSchema items={faqItems} lang={lang} />}

      {/* Article hero */}
      <section className="hero-navy">
        <div className="wrap py-14 sm:py-16 relative">
          <nav aria-label="Breadcrumb" className="mb-5 text-[13px]" style={{ color: 'var(--text-inverse-2)' }}>
            <Link href={`/${lang}`} className="hover:text-white">{isRTL ? 'الرئيسية' : 'Home'}</Link>
            <span className="mx-2 opacity-60">/</span>
            <Link href={`/${lang}/blog`} className="hover:text-white">{isRTL ? 'المدونة' : 'Blog'}</Link>
          </nav>
          <h1 className="hero-h1 mb-4" style={{ maxWidth: '26ch' }}>{t(post.title, lang)}</h1>
          <p className="text-[13.5px]" style={{ color: 'var(--text-inverse-2)' }}>
            {isRTL ? 'آخر تحديث: ' : 'Last updated: '}
            <time dateTime={post.updated}>
              {new Date(post.updated + 'T00:00:00Z').toLocaleDateString(isRTL ? 'ar-AE' : 'en-GB', {
                year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
              })}
            </time>
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="py-14 sm:py-16">
        <div className="wrap" style={{ maxWidth: '780px' }}>
          {post.sections.map((sec, i) => (
            <section key={i} className="mb-10">
              <h2
                className="mb-4"
                style={{
                  fontFamily: headingFont,
                  fontWeight: 700,
                  fontSize: 'clamp(20px, 2.6vw, 26px)',
                  color: 'var(--navy-ink)',
                  lineHeight: isRTL ? 1.5 : 1.25,
                }}
              >
                {t(sec.h2, lang)}
              </h2>
              {sec.paras.map((p, j) => (
                <p key={j} className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)', fontSize: '16.5px' }}>
                  {t(p, lang)}
                </p>
              ))}
              {sec.list && (
                sec.list.ordered ? (
                  <ol className={`${isRTL ? 'pr-5' : 'pl-5'} list-decimal space-y-2 mb-4`} style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                    {sec.list.items.map((it, k) => <li key={k}>{t(it, lang)}</li>)}
                  </ol>
                ) : (
                  <ul className={`${isRTL ? 'pr-5' : 'pl-5'} list-disc space-y-2 mb-4`} style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                    {sec.list.items.map((it, k) => <li key={k}>{t(it, lang)}</li>)}
                  </ul>
                )
              )}
            </section>
          ))}

          {/* FAQ */}
          {faqItems.length > 0 && (
            <section className="mb-10">
              <h2
                className="mb-5"
                style={{ fontFamily: headingFont, fontWeight: 700, fontSize: 'clamp(20px, 2.6vw, 26px)', color: 'var(--navy-ink)' }}
              >
                {isRTL ? 'أسئلة شائعة' : 'Frequently asked questions'}
              </h2>
              {faqItems.map((f, i) => (
                <details key={i} className="mb-3 rounded-xl border bg-white" style={{ borderColor: 'var(--border-default)' }}>
                  <summary
                    className="cursor-pointer px-5 py-4 font-semibold"
                    style={{ color: 'var(--navy-ink)', fontFamily: headingFont, fontSize: '15.5px', listStyle: 'none' }}
                  >
                    {t(f.q, lang)}
                  </summary>
                  <p className="px-5 pb-5 text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {t(f.a, lang)}
                  </p>
                </details>
              ))}
            </section>
          )}

          {/* Related services */}
          {post.related.length > 0 && (
            <aside className="rounded-card border p-6 mb-10" style={{ backgroundColor: 'var(--bg-raised)', borderColor: 'var(--border-default)' }}>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>
                {isRTL ? 'خدمات ذات صلة' : 'Related services'}
              </h2>
              <ul className="space-y-2">
                {post.related.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={`/${lang}${r.href}`}
                      className="text-[15px] font-semibold"
                      style={{ color: 'var(--navy)', borderBottom: '2px solid var(--gold)' }}
                    >
                      {t(r.label, lang)}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* WhatsApp CTA — one, restrained */}
          <div className="warn-block mx-auto text-center" style={{ maxWidth: '100%' }}>
            <h3 className="mb-2.5">
              {isRTL ? 'جاهز للبدء؟' : 'Ready to start?'}
            </h3>
            <p className="mb-5">
              {isRTL
                ? 'أرسل متطلبك عبر واتساب — يتم التوثيق عبر محاكم دبي أو وزارة العدل الإماراتية من خلال مكالمة فيديو.'
                : 'Send your requirement on WhatsApp — Notarization happens through Dubai Courts or the UAE Ministry of Justice via a video call.'}
            </p>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-wa">
              {isRTL ? 'ابدأ عبر واتساب' : 'Start on WhatsApp'}
            </a>
          </div>
        </div>
      </article>
    </main>
  )
}
