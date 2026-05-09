import { MetadataRoute } from 'next'

// ─────────────────────────────────────────────────────────────────────────────
// robots.txt — POA in 30
//
// Strategy:
//   1. Allow legitimate search engines explicitly (Google, Bing, etc.).
//   2. Block AI training crawlers and answer-engine harvesters explicitly —
//      our UAE legal content is unique IP and shouldn't be re-served by ChatGPT,
//      Perplexity, etc. without attribution.
//   3. Block heavy SEO competitor crawlers that don't drive traffic.
//
// Note: well-behaved bots respect robots.txt. Bad bots ignore it. The Edge
// middleware (middleware.ts) catches the bad ones via UA filter + rate limit
// + honeypot ban list.
// ─────────────────────────────────────────────────────────────────────────────

export default function robots(): MetadataRoute.Robots {
  // AI training & answer-engine crawlers
  const aiBots = [
    'GPTBot',           // OpenAI training
    'ChatGPT-User',     // ChatGPT browse / agent mode
    'OAI-SearchBot',    // OpenAI SearchGPT
    'Google-Extended',  // Bard / Gemini training opt-out
    'CCBot',            // Common Crawl (used by many LLMs)
    'anthropic-ai',     // Claude training
    'Claude-Web',       // Claude.ai browsing
    'ClaudeBot',        // Claude crawling
    'PerplexityBot',    // Perplexity AI
    'Perplexity-User',  // Perplexity user agent
    'Bytespider',       // ByteDance / TikTok / Doubao
    'Amazonbot',        // Amazon Alexa / AI training
    'cohere-ai',        // Cohere
    'Diffbot',          // Diffbot data mining
    'omgili',           // OMG / Webz.io
    'FacebookBot',      // Meta AI training (note: NOT facebookexternalhit, which is for link previews)
    'Meta-ExternalAgent', // Meta AI agent
    'img2dataset',      // Image scraping for training
    'Applebot-Extended', // Apple Intelligence training opt-out
  ]

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
        allow: '/',
        disallow: ['/api/', '/_next/', '/honeypot/', '/data/', '/scripts/', '/docs/'],
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
      // AI crawlers — fully blocked
      ...aiBots.map((bot) => ({ userAgent: bot, disallow: ['/'] })),
      // Heavy SEO crawlers — fully blocked
      ...seoLeechers.map((bot) => ({ userAgent: bot, disallow: ['/'] })),
    ],
    sitemap: 'https://www.poain30.ae/sitemap.xml',
    host: 'https://www.poain30.ae',
  }
}
