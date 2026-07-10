import type { Metadata } from 'next'
import Script from 'next/script'
import '../globals.css'
import { notFound } from 'next/navigation'
import { isValidLang, getDir, getFontClass, LANGS, type Lang, site } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWA from '@/components/FloatingWA'
import ContentProtection from '@/components/ContentProtection'
import { LocalBusinessSchema } from '@/components/SchemaMarkup'

interface Props {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params

  const titles: Record<string, string> = {
    en: 'POA in 30 — Power of Attorney Drafted & Notarized Remotely in 30 Minutes',
    ar: 'POA in 30 — إصدار وتوثيق وكالتك عن بُعد في 30 دقيقة' }
  const descs: Record<string, string> = {
    en: 'Your Power of Attorney drafted and delivered in 30 minutes, with no office visits. Notarization happens through Dubai Courts or the UAE Ministry of Justice via a video call. All POA types, legal notices, and eviction notices.',
    ar: 'وكالتك تُصاغ وتُسلَّم في 30 دقيقة دون زيارات مكتبية. يتم التوثيق عبر محاكم دبي أو وزارة العدل الإماراتية من خلال مكالمة فيديو. جميع أنواع الوكالات والإنذارات القانونية.' }

  return {
    title: titles[lang] || titles.en,
    description: descs[lang] || descs.en,
    robots: 'index, follow',
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/`,
      languages: {
        'en-AE': 'https://www.poain30.ae/en/',
        'ar-AE': 'https://www.poain30.ae/ar/',
        'x-default': 'https://www.poain30.ae/en/' } },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descs[lang] || descs.en,
      url: `https://www.poain30.ae/${lang}/`,
      siteName: 'POA in 30',
      locale: lang === 'ar' ? 'ar_AE' : 'en_AE',
      type: 'website',
      images: [{ url: 'https://www.poain30.ae/og-default.png', width: 1200, height: 630, alt: 'POA in 30 — Power of Attorney Dubai' }] },
    twitter: { card: 'summary_large_image', images: ['https://www.poain30.ae/og-default.png'] } }
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params

  if (!isValidLang(lang)) notFound()

  const dir = getDir(lang)
  const fontClass = getFontClass(lang)

  return (
    <html lang={lang} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
        />
        <meta name="theme-color" content="#0F2137" />
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai, UAE" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
        <LocalBusinessSchema />
      </head>
      <body className={`${fontClass} antialiased`} style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
        {/* Google Analytics — only loaded when a GA4 ID is configured */}
        {site.ga && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${site.ga}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.ga}');`}
            </Script>
          </>
        )}
        {/* Canary: per-render fingerprint for plagiarism detection.
            If our content shows up on another site verbatim with these
            data attributes intact, we have evidence of direct scraping. */}
        <div
          aria-hidden="true"
          style={{ display: 'none' }}
          data-owner="poain30.ae"
          data-ref="POA30-2026"
          data-canary={`POA30-${lang}-${new Date().toISOString().slice(0, 10)}`}
        />
        {/* Honeypot link — invisible to humans, irresistible to crawlers.
            Edge middleware bans any IP that touches /honeypot/ for 1 hour. */}
        <a
          href="/honeypot/"
          rel="nofollow"
          aria-hidden="true"
          tabIndex={-1}
          className="honeypot-trap"
        >
          .
        </a>
        {/* Anti-copy keyboard / right-click protection (client component) */}
        <ContentProtection />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:bg-ink-700 focus:text-white focus:px-3 focus:py-2 focus:rounded-lg focus:z-50">
          {lang === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}
        </a>
        <Navbar lang={lang as Lang} />
        <main id="main-content">{children}</main>
        <Footer lang={lang as Lang} />
        <FloatingWA lang={lang as Lang} />
      </body>
    </html>
  )
}
