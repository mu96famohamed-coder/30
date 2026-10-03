import { withSocial } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

async function baseMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/poa-cancellation') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/poa-cancellation/`,
      languages: {
        ...Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/poa-cancellation/`])
      ),
        'x-default': `https://www.poain30.ae/en/poa-cancellation/`,
      } } }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/poa-cancellation') as any)?.seo
  return (
    <>
      <ServicePage
        path={'/poa-cancellation'}
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        breadcrumb={[
          { label: lang === 'ar' ? 'إلغاء وكالة' : 'POA Cancellation', href: '/poa-cancellation' }
        ]}
        relatedServices={[
          { label: { en: 'General POA', ar: 'وكالة عامة' }, href: '/power-of-attorney/general' },
          { label: { en: 'Special POA', ar: 'وكالة خاصة' }, href: '/power-of-attorney/special' },
          { label: { en: 'POA Rejected?', ar: 'وكالة مرفوضة؟' }, href: '/why-poa-rejected-dubai' },
          { label: { en: 'Document Rejected?', ar: 'وثيقة مرفوضة؟' }, href: '/document-rejection' }
        ]}
        faqItems={getPageFaq('/poa-cancellation')}
        richBlocks={getPageBlocks('/poa-cancellation')}
      />
    </>
  )
}

export async function generateMetadata(...args: Parameters<typeof baseMetadata>): Promise<Metadata> {
  return withSocial(await baseMetadata(...args))
}
