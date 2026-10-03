import { withSocial } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, getRequiredDocs, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

async function baseMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/power-of-attorney/real-estate/handover') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/power-of-attorney/real-estate/handover/`,
      languages: {
        ...Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/power-of-attorney/real-estate/handover/`])
      ),
        'x-default': `https://www.poain30.ae/en/power-of-attorney/real-estate/handover/`,
      } } }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/power-of-attorney/real-estate/handover') as any)?.seo
  return (
    <>
      <ServicePage
        path={'/power-of-attorney/real-estate/handover'}
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        requiredDocs={getRequiredDocs('poa_property_handover')}
        faqItems={getPageFaq('/power-of-attorney/real-estate/handover')}
        richBlocks={getPageBlocks('/power-of-attorney/real-estate/handover')}
        breadcrumb={[
          { label: lang === 'ar' ? 'الوكالات الرسمية' : 'Power of Attorney', href: '/power-of-attorney' },
          { label: lang === 'ar' ? 'وكالة عقارية' : 'Real Estate POA', href: '/power-of-attorney/real-estate' },
          { label: lang === 'ar' ? 'وكالة استلام عقار' : 'Handover POA', href: '/power-of-attorney/real-estate/handover' },
        ]}
        relatedServices={[
          { label: { en: 'Real Estate POA Hub', ar: 'مركز الوكالة العقارية' }, href: '/power-of-attorney/real-estate' },
          { label: { en: 'Property Purchase POA', ar: 'وكالة شراء عقار' }, href: '/power-of-attorney/real-estate/purchase' },
          { label: { en: 'Property Management POA', ar: 'وكالة إدارة عقار' }, href: '/power-of-attorney/real-estate/management' },
          { label: { en: 'Property Sale POA', ar: 'وكالة بيع عقار' }, href: '/power-of-attorney/real-estate/sale' },
        ]}
      />
    </>
  )
}

export async function generateMetadata(...args: Parameters<typeof baseMetadata>): Promise<Metadata> {
  return withSocial(await baseMetadata(...args))
}
