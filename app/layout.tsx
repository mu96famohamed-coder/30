import type { Metadata } from 'next'

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
    'POA in 30 handles your Power of Attorney, attestation, and legal documentation 100% online — drafted and notarized in 30 minutes. UAE-wide delivery.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
