import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/legal-translation/court') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/legal-translation/court/`,
      languages: {
        ...Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/legal-translation/court/`])
      ),
        'x-default': `https://www.poain30.ae/en/legal-translation/court/`,
      } } }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/legal-translation/court') as any)?.seo
  return (
    <>
      <ServicePage
        path={'/legal-translation/court'}
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        breadcrumb={[
          { label: lang === 'ar' ? 'الترجمة القانونية' : 'Legal Translation', href: '/legal-translation' },
          { label: lang === 'ar' ? 'معتمد قضائياً' : 'Court-Certified', href: '/legal-translation/court' }
        ]}
        relatedServices={[
          { label: { en: 'Eviction Notice', ar: 'إنذار إخلاء' }, href: '/legal-notice/eviction' },
          { label: { en: 'POA Cancellation', ar: 'إلغاء وكالة' }, href: '/legal-notice/poa-cancellation' },
          { label: { en: 'E-Notary', ar: 'كاتب عدل إلكتروني' }, href: '/e-notary' }
        ]}
        faqItems={getPageFaq('/legal-translation/court')}
        richBlocks={getPageBlocks('/legal-translation/court')}
      />
    </>
  )
}
