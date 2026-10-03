import type { Metadata, Viewport } from 'next'

// ─────────────────────────────────────────────────────────────────────────────
// Root layout is intentionally minimal.
// The real <html>/<body>/fonts/Navbar/Footer/GA all live in app/[lang]/layout.
// This file only provides global metadata defaults.
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL('https://www.poain30.ae'),
  title: {
    default: 'POA in 30 — Power of Attorney Drafted & Notarized in 30 Minutes',
    template: '%s' },
  description:
    'POA in 30 handles your Power of Attorney and legal documentation remotely — drafted and delivered in 30 minutes. Notarization happens through Dubai Courts or the UAE Ministry of Justice via a video call.',
  applicationName: 'POA in 30',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-icon.png' },
  manifest: '/site.webmanifest',
  formatDetection: {
    telephone: false,
    address: false,
    email: false } }

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E3A52' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
