import type { Metadata } from 'next'
import { LANGS, type Lang, getPageContent, getPageBlocks, getPageFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'

interface Props { params: Promise<{ lang: Lang }> }

export async function generateStaticParams() {
  return LANGS.map((l) => ({ lang: l }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const seo = (getPageContent('/corporate/moa-amendment') as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en,
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/corporate/moa-amendment/`,
      languages: {
        ...Object.fromEntries(
        LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/corporate/moa-amendment/`])
      ),
        'x-default': `https://www.poain30.ae/en/corporate/moa-amendment/`,
      } } }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const seo = (getPageContent('/corporate/moa-amendment') as any)?.seo
  return (
    <>
      <ServicePage
        path={'/corporate/moa-amendment'}
        lang={lang}
        title={seo?.h1}
        description={seo?.meta_description}
        authority={seo?.authority}
        waMessage={(seo?.wa_message?.[lang] ?? seo?.wa_message?.en) as string}
        breadcrumb={[
          { label: lang === 'ar' ? 'الشركات' : 'Corporate', href: '/corporate' },
          { label: lang === 'ar' ? 'تعديل عقد تأسيس' : 'MOA Amendment', href: '/corporate/moa-amendment' }
        ]}
        relatedServices={[
          { label: { en: 'Board Resolution', ar: 'قرار مجلس إدارة' }, href: '/corporate/board-resolution' },
          { label: { en: 'Contract Drafting', ar: 'صياغة عقود' }, href: '/corporate/contract' },
          { label: { en: 'Company Liquidation', ar: 'تصفية شركة' }, href: '/corporate/liquidation' },
          { label: { en: 'MOA Drafting', ar: 'عقد تأسيس' }, href: '/corporate/moa' }
        ]}
        faqItems={getPageFaq('/corporate/moa-amendment')}
        richBlocks={getPageBlocks('/corporate/moa-amendment')}
      />
    </>
  )
}
