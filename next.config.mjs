/** @type {import('next').NextConfig} */

// ─────────────────────────────────────────────────────────────────────────────
// POA in 30 — Hardened Next.js Config
// Zero-Trust Security Protocol (inherited from E-Notary Dubai, then audited)
// ─────────────────────────────────────────────────────────────────────────────

const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com",
  "frame-src 'self' https://www.google.com",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join('; ')

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
]

const nextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },

  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      // Root → default language
      {
        source: '/',
        destination: '/en/',
        permanent: false,
      },
      // Redirect any leftover non-EN/AR legacy prefixes to English equivalent
      {
        source: '/ru/:path*',
        destination: '/en/:path*',
        permanent: true,
      },
      {
        source: '/zh/:path*',
        destination: '/en/:path*',
        permanent: true,
      },
      {
        source: '/es/:path*',
        destination: '/en/:path*',
        permanent: true,
      },
      // Pricing page removed — redirect to homepage
      {
        source: '/:lang(en|ar)/pricing',
        destination: '/:lang/',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/en/',
        permanent: true,
      },
      // Services that don't exist on POA in 30 → parent POA page
      {
        source: '/:lang(en|ar)/power-of-attorney/marriage',
        destination: '/:lang/power-of-attorney/',
        permanent: true,
      },
      {
        source: '/:lang(en|ar)/power-of-attorney/marriage/',
        destination: '/:lang/power-of-attorney/',
        permanent: true,
      },
      {
        source: '/:lang(en|ar)/power-of-attorney/divorce',
        destination: '/:lang/power-of-attorney/',
        permanent: true,
      },
      {
        source: '/:lang(en|ar)/power-of-attorney/divorce/',
        destination: '/:lang/power-of-attorney/',
        permanent: true,
      },
      // Apostille service removed → redirect to MOFA attestation hub
      {
        source: '/:lang(en|ar)/attestation/apostille',
        destination: '/:lang/attestation/mofa/',
        permanent: true,
      },
      {
        source: '/:lang(en|ar)/attestation/apostille/',
        destination: '/:lang/attestation/mofa/',
        permanent: true,
      },
      // Blog removed entirely → redirect any /blog/* path to MOFA attestation page
      {
        source: '/:lang(en|ar)/blog/:slug*',
        destination: '/:lang/attestation/mofa/',
        permanent: true,
      },
      {
        source: '/:lang(en|ar)/blog',
        destination: '/:lang/',
        permanent: true,
      },
      // /eviction-notice legacy → /legal-notice/eviction
      {
        source: '/:lang(en|ar)/eviction-notice',
        destination: '/:lang/legal-notice/eviction/',
        permanent: true,
      },
      {
        source: '/:lang(en|ar)/eviction-notice/',
        destination: '/:lang/legal-notice/eviction/',
        permanent: true,
      },
      {
        source: '/eviction-notice',
        destination: '/en/legal-notice/eviction/',
        permanent: true,
      },
      {
        source: '/eviction-notice/',
        destination: '/en/legal-notice/eviction/',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Hot-link protection: image responses get a strict Cross-Origin-Resource-Policy
      // so other sites can't <img src="..."> directly to our hosted images.
      // Combined with same-origin CORP, third parties get a blocked image.
      {
        source: '/:path*\\.(png|jpg|jpeg|gif|webp|avif|svg)',
        headers: [
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
          { key: 'Cache-Control', value: 'public, max-age=2592000' },
        ],
      },
    ]
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/data/:path*',
          destination: '/404',
        },
        {
          source: '/data',
          destination: '/404',
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default nextConfig
