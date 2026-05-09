import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/power-of-attorney/vehicle/export') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/power-of-attorney/vehicle/export/`,
      languages: {
        ...Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/power-of-attorney/vehicle/export/`])
      ),
        'x-default': `https://www.poain30.ae/en/power-of-attorney/vehicle/export/`,
      } } }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/power-of-attorney/vehicle/export') as any)?.seo
  return (
    <>
      <ServicePage
        path={'/power-of-attorney/vehicle/export'}
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        faqItems={getPageFaq('/power-of-attorney/vehicle/export')}
        richBlocks={getPageBlocks('/power-of-attorney/vehicle/export')}
        breadcrumb={[
          { label: lang === 'ar' ? 'الوكالات الرسمية' : 'Power of Attorney', href: '/power-of-attorney' },
          { label: lang === 'ar' ? 'وكالة مركبة' : 'Vehicle POA', href: '/power-of-attorney/vehicle' },
          { label: lang === 'ar' ? 'وكالة تصدير مركبة' : 'Vehicle Export POA', href: '/power-of-attorney/vehicle/export' },
        ]}
        relatedServices={[
          { label: { en: 'Vehicle POA Hub', ar: 'مركز وكالة المركبة' }, href: '/power-of-attorney/vehicle' },
          { label: { en: 'Vehicle Sale POA', ar: 'وكالة بيع مركبة' }, href: '/power-of-attorney/vehicle/sale' },
          { label: { en: 'Vehicle Management POA', ar: 'وكالة إدارة مركبة' }, href: '/power-of-attorney/vehicle/management' },
        ]}
      />
    </>
  )
}
