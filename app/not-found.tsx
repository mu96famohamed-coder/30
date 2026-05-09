'use client'
import { usePathname } from 'next/navigation'

const T = {
  en: { h: 'Page not found', p: "The page you're looking for doesn't exist.", btn: 'Back to home' },
  ar: { h: 'الصفحة غير موجودة', p: 'الصفحة التي تبحث عنها غير موجودة.', btn: 'العودة للرئيسية' } }

export default function NotFound() {
  const pathname = usePathname()
  const lang = (pathname?.split('/')[1] as keyof typeof T) || 'en'
  const tx = T[lang] || T.en
  const homeHref = `/${lang in T ? lang : 'en'}`
  const isRTL = lang === 'ar'

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        minHeight: '100vh',
        background: '#FDF8F1',
        color: '#14293C',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: isRTL
          ? "'IBM Plex Sans Arabic', system-ui, sans-serif"
          : "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        padding: '2rem' }}
    >
      <div>
        <div
          style={{
            fontSize: '6rem',
            fontWeight: 800,
            color: '#E85A3C',
            marginBottom: '1rem',
            lineHeight: 1,
            letterSpacing: '-0.04em' }}
        >
          404
        </div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', fontWeight: 700 }}>{tx.h}</h1>
        <p style={{ color: '#5E7D8F', marginBottom: '2rem', fontSize: '1rem' }}>{tx.p}</p>
        <a
          href={homeHref}
          style={{
            display: 'inline-block',
            background: '#E85A3C',
            color: '#ffffff',
            padding: '0.85rem 2rem',
            borderRadius: '9999px',
            fontWeight: 600,
            fontSize: '0.95rem',
            textDecoration: 'none' }}
        >
          {tx.btn}
        </a>
      </div>
    </div>
  )
}
