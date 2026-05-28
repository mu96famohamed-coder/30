import { redirect } from 'next/navigation'

export const metadata = {
  robots: { index: false, follow: false },
}
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  redirect(`/${lang}/`)
}
