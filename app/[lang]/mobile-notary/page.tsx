import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/mobile-notary') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/mobile-notary/`,
      languages: {
        ...Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/mobile-notary/`])
      ),
        'x-default': `https://www.poain30.ae/en/mobile-notary/`,
      } } }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/mobile-notary') as any)?.seo
  return (
    <>
      <ServicePage
        path={'/mobile-notary'}
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        breadcrumb={[
          { label: lang === 'ar' ? 'كاتب عدل متنقل' : 'Mobile Notary', href: '/mobile-notary' }
        ]}
        relatedServices={[
          { label: { en: 'E-Notary', ar: 'كاتب عدل إلكتروني' }, href: '/e-notary' },
          { label: { en: 'Same-Day Urgent', ar: 'توثيق عاجل' }, href: '/emergency-notary' },
          { label: { en: 'Affidavit', ar: 'إقرار رسمي' }, href: '/affidavit' },
          { label: { en: 'Certified True Copy', ar: 'نسخة طبق الأصل' }, href: '/certified-true-copy' }
        ]}
        faqItems={getPageFaq('/mobile-notary')}
        richBlocks={getPageBlocks('/mobile-notary')}
      />
    </>
  )
}
