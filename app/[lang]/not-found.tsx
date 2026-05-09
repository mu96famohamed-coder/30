'use client'
import { usePathname } from 'next/navigation'

const T = {
  en: { kicker: 'Page not found', lead: 'We couldn\'t find', em: 'what you were looking for.', sub: 'The page may have moved, or the link is incomplete.', btn: 'Back to home' },
  ar: { kicker: 'الصفحة غير موجودة', lead: 'لم نتمكن من إيجاد', em: 'ما كنت تبحث عنه.', sub: 'ربما تم نقل الصفحة، أو أن الرابط غير مكتمل.', btn: 'العودة للرئيسية' } }

export default function LangNotFound() {
  const pathname = usePathname()
  const lang = (pathname?.split('/')[1] as keyof typeof T) || 'en'
  const tx = T[lang] || T.en
  const homeHref = `/${lang in T ? lang : 'en'}`
  const isRTL = lang === 'ar'
  const serif = isRTL ? 'Amiri, serif' : 'Instrument Serif, serif'

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        minHeight: '70vh',
        background: '#FDF8F1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 2rem' }}
    >
      <div style={{ maxWidth: '560px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px' }}>
          <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(232, 90, 60, 0.6)' }} />
          <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E85A3C', fontWeight: 500 }}>
            404 · {tx.kicker}
          </span>
          <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(232, 90, 60, 0.6)' }} />
        </div>

        <h1 style={{
          fontFamily: serif,
          fontSize: 'clamp(32px, 5vw, 52px)',
          lineHeight: '1.05',
          color: '#1E3A52',
          margin: 0,
          fontWeight: 400,
          letterSpacing: '-0.015em' }}>
          {tx.lead}
          <br/>
          <em style={{ color: '#E85A3C', fontStyle: 'italic' }}>
            {tx.em}
          </em>
        </h1>

        <p style={{
          fontFamily: serif,
          fontStyle: 'italic',
          fontSize: '17px',
          lineHeight: '1.65',
          color: 'rgba(30, 58, 82, 0.7)',
          margin: '24px auto 32px',
          maxWidth: '460px' }}>
          {tx.sub}
        </p>

        <a
          href={homeHref}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#1E3A52',
            color: '#FDF8F1',
            padding: '12px 26px',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'none' }}
        >
          {tx.btn}
        </a>
      </div>
    </div>
  )
}
