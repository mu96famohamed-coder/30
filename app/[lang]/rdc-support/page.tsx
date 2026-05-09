import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/rdc-support') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/rdc-support/`,
      languages: {
        ...Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/rdc-support/`])
      ),
        'x-default': `https://www.poain30.ae/en/rdc-support/`,
      } } }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/rdc-support') as any)?.seo
  return (
    <>
      <ServicePage
        path={'/rdc-support'}
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        breadcrumb={[
          { label: lang === 'ar' ? 'دعم مركز فض النزاعات' : 'RDC Support', href: '/rdc-support' }
        ]}
        relatedServices={[
          { label: { en: 'Last Will', ar: 'الوصية' }, href: '/last-will-testament-dubai' },
          { label: { en: 'POA Rejected?', ar: 'وكالة مرفوضة؟' }, href: '/why-poa-rejected-dubai' },
          { label: { en: 'Document Rejected?', ar: 'وثيقة مرفوضة؟' }, href: '/document-rejection' },
          { label: { en: 'What is Tableegh?', ar: 'ما هو التبليغ؟' }, href: '/what-is-tableegh' }
        ]}
        faqItems={getPageFaq('/rdc-support')}
        richBlocks={getPageBlocks('/rdc-support')}
      />
    </>
  )
}
