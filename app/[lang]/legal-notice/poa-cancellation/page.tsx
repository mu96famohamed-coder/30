import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/legal-notice/poa-cancellation') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/legal-notice/poa-cancellation/`,
      languages: {
        ...Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/legal-notice/poa-cancellation/`])
      ),
        'x-default': `https://www.poain30.ae/en/legal-notice/poa-cancellation/`,
      } } }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/legal-notice/poa-cancellation') as any)?.seo
  return (
    <>
      <ServicePage
        path={'/legal-notice/poa-cancellation'}
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        breadcrumb={[
          { label: lang === 'ar' ? 'الإنذارات القانونية' : 'Legal Notice', href: '/legal-notice' },
          { label: lang === 'ar' ? 'إلغاء وكالة' : 'POA Cancellation', href: '/legal-notice/poa-cancellation' }
        ]}
        relatedServices={[
          { label: { en: 'Eviction Notice', ar: 'إنذار إخلاء' }, href: '/legal-notice/eviction' },
          { label: { en: 'Court-Certified', ar: 'معتمد قضائياً' }, href: '/legal-translation/court' },
          { label: { en: 'What is Tableegh?', ar: 'ما هو التبليغ؟' }, href: '/what-is-tableegh' }
        ]}
        faqItems={getPageFaq('/legal-notice/poa-cancellation')}
        richBlocks={getPageBlocks('/legal-notice/poa-cancellation')}
      />
    </>
  )
}
