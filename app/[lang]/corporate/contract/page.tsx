import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/corporate/contract') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/corporate/contract/`,
      languages: {
        ...Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/corporate/contract/`])
      ),
        'x-default': `https://www.poain30.ae/en/corporate/contract/`,
      } } }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/corporate/contract') as any)?.seo
  return (
    <>
      <ServicePage
        path={'/corporate/contract'}
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        breadcrumb={[
          { label: lang === 'ar' ? 'الشركات' : 'Corporate', href: '/corporate' },
          { label: lang === 'ar' ? 'صياغة عقود' : 'Contract Drafting', href: '/corporate/contract' }
        ]}
        relatedServices={[
          { label: { en: 'Board Resolution', ar: 'قرار مجلس إدارة' }, href: '/corporate/board-resolution' },
          { label: { en: 'Company Liquidation', ar: 'تصفية شركة' }, href: '/corporate/liquidation' },
          { label: { en: 'MOA Drafting', ar: 'عقد تأسيس' }, href: '/corporate/moa' },
          { label: { en: 'MOA Amendment', ar: 'تعديل عقد تأسيس' }, href: '/corporate/moa-amendment' }
        ]}
        faqItems={getPageFaq('/corporate/contract')}
        richBlocks={getPageBlocks('/corporate/contract')}
      />
    </>
  )
}
