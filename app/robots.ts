import { MetadataRoute } from 'next'

// ─────────────────────────────────────────────────────────────────────────────
// robots.txt — POA in 30
//
// Strategy:
//   1. Allow legitimate search engines explicitly (Google, Bing, etc.).
//   2. Allow AI training / answer-engine crawlers explicitly — goal is to be
//      surfaced and cited by AI search (ChatGPT, Perplexity, Gemini, etc.),
//      same policy decision applied on E-Notary Dubai.
//   3. Block heavy SEO competitor crawlers that don't drive traffic.
//
// Note: well-behaved bots respect robots.txt. Bad bots ignore it. The Edge
// middleware (middleware.ts) catches genuinely bad actors via UA filter +
// rate limit + honeypot ban list (AI bots removed from that blocklist too).
// ─────────────────────────────────────────────────────────────────────────────

export default function robots(): MetadataRoute.Robots {
  // Heavy competitor SEO crawlers (don't bring traffic, hammer the site)
  const seoLeechers = [
    'AhrefsBot',
    'SemrushBot',
    'MJ12bot',
    'DotBot',
    'PetalBot',
    'BLEXBot',
    'SeznamBot',
    'serpstatbot',
    'MegaIndex',
    'DataForSeoBot',
  ]

  return {
    rules: [
      // Default — allow all, but exclude internals
      {
        userAgent: '*',
        allow: ['/', '/_next/static/'],
        disallow: ['/api/', '/_next/data/', '/honeypot/', '/data/', '/scripts/', '/docs/'],
      },
      // Legitimate search engines — fully allowed
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
      { userAgent: 'Slurp', allow: '/' }, // Yahoo
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'YandexBot', allow: '/' },
      // Social media link-preview crawlers — allowed
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'LinkedInBot', allow: '/' },
      { userAgent: 'WhatsApp', allow: '/' },
      // AI / answer-engine crawlers — explicitly allowed (no rule needed;
      // they fall under the default '*' allow, listed here for clarity)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      // Heavy SEO crawlers — fully blocked
      ...seoLeechers.map((bot) => ({ userAgent: bot, disallow: ['/'] })),
    ],
    sitemap: 'https://www.poain30.ae/sitemap.xml',
    host: 'https://www.poain30.ae',
  }
}
