import Link from 'next/link'
import Image from 'next/image'
import { type Lang, t, footer, site, cta } from '@/lib/i18n'

interface Props { lang: Lang }

// ─────────────────────────────────────────────────────────────────────────────
// Footer — POA in 30
// Attestation, Corporate, Legal Translation removed — POA-only site
// 4 columns: POA | Notarization | Tenancy & Legal | Resources
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_LINKS = {
  poa: [
    { href: '/power-of-attorney/general',           en: 'General POA',           ar: 'وكالة عامة' },
    { href: '/power-of-attorney/special',           en: 'Special POA',           ar: 'وكالة خاصة' },
    { href: '/power-of-attorney/real-estate',       en: 'Real Estate POA',       ar: 'وكالة عقارية' },
    { href: '/power-of-attorney/vehicle',           en: 'Vehicle POA',           ar: 'وكالة مركبة' },
    { href: '/power-of-attorney/bank',              en: 'Bank POA',              ar: 'وكالة بنكية' },
    { href: '/power-of-attorney/court',             en: 'Court POA',             ar: 'وكالة قضائية' },
    { href: '/power-of-attorney/company-formation', en: 'Company Formation POA', ar: 'وكالة تأسيس شركة' },
    { href: '/power-of-attorney/child-travel',      en: 'Child Travel Auth.',    ar: 'إذن سفر طفل' },
    { href: '/poa-cancellation',                    en: 'POA Cancellation',      ar: 'إلغاء الوكالة' },
  ],
  notarization: [
    { href: '/e-notary',              en: 'E-Notary (Video Call)',   ar: 'التوثيق الإلكتروني' },
    { href: '/mobile-notary',         en: 'Mobile Notary',          ar: 'كاتب عدل متنقل' },
    { href: '/emergency-notary',      en: 'Same-Day Urgent',        ar: 'توثيق عاجل نفس اليوم' },
    { href: '/why-poa-rejected-dubai',en: 'Why POA Gets Rejected',  ar: 'لماذا تُرفض الوكالة؟' },
    { href: '/document-rejection',    en: 'Document Returned?',     ar: 'وثيقة مُعادة؟' },
  ],
  tenancy: [
    { href: '/legal-notice/eviction',         en: 'Eviction Notice',         ar: 'إشعار الإخلاء' },
    { href: '/legal-notice',                  en: 'Legal Notice',            ar: 'إنذار قانوني' },
    { href: '/legal-notice/poa-cancellation', en: 'POA Cancellation Notice', ar: 'إنذار إلغاء وكالة' },
    { href: '/rdc-support',                   en: 'RDC Support',             ar: 'دعم مركز النزاعات' },
    { href: '/what-is-tableegh',              en: 'What is Tableegh?',       ar: 'ما هو التبليغ؟' },
    { href: '/last-will-testament-dubai',     en: 'Last Will & Testament',   ar: 'الوصية الأخيرة' },
  ],
  resources: [
    { href: '/faq',                    en: 'FAQ',                 ar: 'الأسئلة الشائعة' },
    { href: '/document-rejection',     en: 'Document Rejected?', ar: 'وثيقة مرفوضة؟' },
    { href: '/why-poa-rejected-dubai', en: 'Why POA Rejected?',  ar: 'لماذا رُفضت الوكالة؟' },
    { href: '/what-is-tableegh',       en: 'What is Tableegh?',  ar: 'ما هو التبليغ؟' },
    { href: '/about',                  en: 'About',              ar: 'عن الشركة' },
    { href: '/contact',                en: 'Contact',            ar: 'تواصل معنا' },
  ],
}

const HEADERS = {
  poa:          { en: 'Power of Attorney',  ar: 'الوكالات الرسمية' },
  notarization: { en: 'Notarization',       ar: 'التوثيق' },
  tenancy:      { en: 'Tenancy & Legal',    ar: 'الإيجار والقانون' },
  resources:    { en: 'Resources',          ar: 'الموارد' },
  contact:      { en: 'Contact',            ar: 'تواصل معنا' },
}

export default function Footer({ lang }: Props) {
  return (
    <footer style={{ backgroundColor: '#F2EFE9', borderTop: '1px solid #E5E0D8' }}>
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">

        {/* ── Main grid: Brand + 4 link columns ── */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">

          {/* Brand column — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <Link href={`/${lang}`} className="inline-flex items-center mb-4" aria-label="POA in 30">
              <Image
                src="/logo.svg"
                alt="POA in 30"
                width={180}
                height={48}
                className="h-11 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-sm" style={{ color: '#6B7280' }}>
              {t(footer.tagline, lang)}
            </p>
            <a
              href={`https://wa.me/${site.phone.replace(/\D/g, '')}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-[6px] transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: '#0F2137', color: '#F9F7F4' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
              </svg>
              {t(cta.whatsapp, lang)}
            </a>
          </div>

          {/* POA column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#C9A84C' }}>{t(HEADERS.poa, lang)}</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.poa.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="text-sm transition-colors footer-link" style={{ color: '#374151' }}>
                    {t(link, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Notarization column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#C9A84C' }}>{t(HEADERS.notarization, lang)}</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.notarization.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="text-sm transition-colors footer-link" style={{ color: '#374151' }}>
                    {t(link, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tenancy column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#C9A84C' }}>{t(HEADERS.tenancy, lang)}</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.tenancy.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="text-sm transition-colors footer-link" style={{ color: '#374151' }}>
                    {t(link, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Contact column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#C9A84C' }}>{t(HEADERS.resources, lang)}</h3>
            <ul className="space-y-2.5 mb-8">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="text-sm transition-colors footer-link" style={{ color: '#374151' }}>
                    {t(link, lang)}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#C9A84C' }}>{t(HEADERS.contact, lang)}</h3>
            <ul className="space-y-2.5">
              <li>
                <a href={`tel:${site.phone}`} className="flex items-center gap-2 text-sm transition-colors footer-link" style={{ color: '#374151' }}>
                  <svg className="w-3.5 h-3.5 shrink-0" style={{ color: '#C9A84C' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  {site.phone_display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm transition-colors footer-link" style={{ color: '#374151' }}>
                  <svg className="w-3.5 h-3.5 shrink-0" style={{ color: '#C9A84C' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: '#374151' }}>
                <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#C9A84C' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {site.address}
              </li>
              <li className="text-xs space-y-0.5 pt-1" style={{ color: '#9CA3AF' }}>
                <p>{site.hours?.weekday}</p>
                <p>{site.hours?.saturday}</p>
                <p>{t({ en: 'WhatsApp: 7 days', ar: 'واتساب: 7 أيام' }, lang)}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid #E5E0D8' }}>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>{t(footer.copyright, lang)}</p>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>{t(footer.disclaimer, lang)}</p>
        </div>
      </div>
    </footer>
  )
}
