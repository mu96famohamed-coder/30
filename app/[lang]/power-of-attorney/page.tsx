import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getServiceFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const pc = getPageContent('/power-of-attorney') as any
  const seo = pc?.seo

  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/power-of-attorney/`,
      languages: {
        ...Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/power-of-attorney/`])
      ),
        'x-default': `https://www.poain30.ae/en/power-of-attorney/`,
      } } }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const pc = getPageContent('/power-of-attorney') as any
  const seo = pc?.seo

  return (
    <>
      <ServicePage
        path={'/power-of-attorney'}
        lang={lang}
        title={seo?.h1}
        subtitle={{ en: 'POA in 30 · Dubai', ar: 'POA in 30 · دبي' }}
        description={seo?.meta_description}
        authority="All UAE Authorities"
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        faqItems={getServiceFaq('poa_general')}
        richBlocks={getPageBlocks('/power-of-attorney')}
        relatedServices={[
          { href: '/power-of-attorney/general',           label: { en: 'General POA',            ar: 'الوكالة العامة' } },
          { href: '/power-of-attorney/special',           label: { en: 'Special POA',            ar: 'الوكالة الخاصة' } },
          { href: '/power-of-attorney/real-estate',       label: { en: 'Real Estate POA',        ar: 'الوكالة العقارية' } },
          { href: '/power-of-attorney/vehicle',           label: { en: 'Vehicle POA',            ar: 'وكالة المركبات' } },
          { href: '/power-of-attorney/bank',              label: { en: 'Bank POA',               ar: 'الوكالة البنكية' } },
          { href: '/power-of-attorney/court',             label: { en: 'Court POA',              ar: 'الوكالة القضائية' } },
          { href: '/power-of-attorney/company-formation', label: { en: 'Company Formation POA',  ar: 'وكالة تأسيس شركة' } },
          { href: '/power-of-attorney/child-travel',      label: { en: 'Child Travel Authorization', ar: 'إذن سفر طفل' } },
          { href: '/power-of-attorney/inheritance',       label: { en: 'Inheritance POA',        ar: 'وكالة الميراث' } },
          { href: '/power-of-attorney/mohre',             label: { en: 'MOHRE Labour POA',       ar: 'وكالة وزارة الموارد البشرية' } },
          { href: '/power-of-attorney/property-gifting',  label: { en: 'Property Gifting POA',   ar: 'وكالة هبة عقار' } },
        ]}
      />
    </>
  )
}
