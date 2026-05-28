import { redirect } from 'next/navigation'

export const metadata = {
  robots: { index: false, follow: false },
}
export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang } = await params
  redirect(`/${lang}/`)
}
export async function generateStaticParams() {
  return ['en','ar'].flatMap(lang =>
    ['moa','moa-amendment','share-transfer','contract','board-resolution','liquidation','shareholder-agreement']
    .map(slug => ({ lang, slug }))
  )
}
