import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { LANGS, type Lang, t, services, getPageContent, getPageBlocks, getPageFaq, getServiceFaq, HREFLANG_MAP } from '@/lib/i18n'
import ServicePage from '@/components/ServicePage'

interface Props { params: Promise<{ lang: Lang; slug: string }> }

export async function generateStaticParams() {
  const params: Record<string, string>[] = []
  for (const lang of LANGS) {
    for (const type of (services.attestation as any).types) {
      params.push({ lang, slug: type.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const type = (services.attestation as any).types.find((tp: any) => tp.slug === slug)
  if (!type) return {}
  const seo = (getPageContent(`/attestation/${slug}`) as any)?.seo
  return {
    title:       seo?.meta_title?.[lang]       ?? seo?.meta_title?.en       ?? `${t(type.title, lang)} Dubai 2026 | POA in 30`,
    description: seo?.meta_description?.[lang] ?? seo?.meta_description?.en ?? t(type.desc, lang),
    alternates: {
      canonical: `https://www.poain30.ae/${lang}/attestation/${slug}/`,
      languages: {
        ...Object.fromEntries(LANGS.map((l) => [HREFLANG_MAP[l], `https://www.poain30.ae/${l}/attestation/${slug}/`])),
        'x-default': `https://www.poain30.ae/en/attestation/${slug}/`,
      } } }
}

const FAQ_KEY: Record<string, string> = {
  mofa:      'attestation_mofa' }

const SUBTITLE = {
  en: 'Attestation · Dubai',
  ar: 'التصديق · دبي' }

export default async function AttestationPage({ params }: Props) {
  const { lang, slug } = await params
  const type = (services.attestation as any).types.find((tp: any) => tp.slug === slug)
  if (!type) notFound()

  const pageSlug = `/attestation/${slug}`
  const seo      = (getPageContent(pageSlug) as any)?.seo

  const pageTitle = seo?.h1 ?? type.title
  const waMessage = seo?.wa_message?.[lang] ?? seo?.wa_message?.en ?? type.wa_message

  let faqItems = getPageFaq(pageSlug)
  if (faqItems.length === 0 && FAQ_KEY[slug]) {
    faqItems = getServiceFaq(FAQ_KEY[slug]).slice(0, 3)
  }

  return (
    <>
      <ServicePage
        lang={lang}
        title={pageTitle}
        subtitle={SUBTITLE}
        description={seo?.meta_description ?? type.desc}
        waMessage={waMessage}
        breadcrumb={[
          { label: t({ en: 'Attestation', ar: 'التصديقات' }, lang), href: '/attestation' },
          { label: t(type.title, lang), href: `/attestation/${slug}` },
        ]}
        relatedServices={
          (services.attestation as any).types
            .filter((tp: any) => tp.slug !== slug)
            .slice(0, 4)
            .map((tp: any) => ({
              label: tp.title,
              href: `/attestation/${tp.slug}` }))
        }
        faqItems={faqItems.length > 0 ? faqItems : undefined}
        richBlocks={getPageBlocks(pageSlug)}
      />
    </>
  )
}
