import { NextResponse, type NextRequest } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────────
// POA in 30 — Edge Middleware (Hardened)
//
// Responsibilities:
//   1. Rate limiting — block aggressive scrapers / content-harvesters
//   2. Bot user-agent filtering — block known scraping tools + AI crawlers
//   3. Honeypot — auto-ban any IP that hits a hidden trap URL
//   4. Defense-in-depth path blocking for /data/* and config-like paths
//   5. Pass-through for legitimate traffic (SEO bots explicitly allowed)
//
// Runs on Vercel's Edge runtime (very fast, very cheap, global).
// ─────────────────────────────────────────────────────────────────────────────

interface RateRecord {
  count: number
  resetAt: number
}

const RATE_WINDOW_MS = 60_000 // 1 minute
const RATE_MAX_REQUESTS = 60 // 60 req/min per IP per POP — ~4× a fast human reader
const rateStore = new Map<string, RateRecord>()

// IPs banned by the honeypot — banned for a full hour
const HONEYPOT_BAN_MS = 3_600_000 // 1 hour
const honeypotBans = new Map<string, number>()

let cleanupCounter = 0
function maybeCleanup(now: number) {
  cleanupCounter++
  if (cleanupCounter < 500) return
  cleanupCounter = 0
  for (const [key, rec] of Array.from(rateStore.entries())) {
    if (rec.resetAt < now) rateStore.delete(key)
  }
  for (const [ip, banUntil] of Array.from(honeypotBans.entries())) {
    if (banUntil < now) honeypotBans.delete(ip)
  }
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real
  return 'unknown'
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  maybeCleanup(now)
  const rec = rateStore.get(ip)
  if (!rec || rec.resetAt < now) {
    rateStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return { allowed: true, remaining: RATE_MAX_REQUESTS - 1 }
  }
  rec.count++
  if (rec.count > RATE_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }
  return { allowed: true, remaining: RATE_MAX_REQUESTS - rec.count }
}

function isHoneypotBanned(ip: string): boolean {
  const banUntil = honeypotBans.get(ip)
  if (!banUntil) return false
  if (banUntil < Date.now()) {
    honeypotBans.delete(ip)
    return false
  }
  return true
}

// ── Bot filter ───────────────────────────────────────────────────────────────

const BLOCKED_UA_PATTERNS = [
  // Generic scraping tooling
  /scrapy/i,
  /httrack/i,
  /wget/i,
  /curl/i,
  /python-requests/i,
  /python-urllib/i,
  /go-http-client/i,
  /java\//i,
  /okhttp/i,
  /libwww-perl/i,
  /phantomjs/i,
  /headlesschrome/i,
  /puppeteer/i,
  /playwright/i,
  /selenium/i,
  /node-fetch/i,
  /axios/i,
  // SEO competitor crawlers (heavy, not search)
  /ahrefsbot/i,
  /semrushbot/i,
  /mj12bot/i,
  /dotbot/i,
  /petalbot/i,
  /blexbot/i,
  /seznambot/i,
  /serpstatbot/i,
  /megaindex/i,
  /dataforseobot/i,
  // AI training / answer-engine crawlers
  /gptbot/i,
  /chatgpt-user/i,
  /oai-searchbot/i,
  /claude-web/i,
  /claudebot/i,
  /anthropic-ai/i,
  /perplexitybot/i,
  /perplexity-user/i,
  /ccbot/i,
  /google-extended/i,
  /bytespider/i,
  /amazonbot/i,
  /cohere-ai/i,
  /diffbot/i,
  /omgili/i,
  /img2dataset/i,
]

const ALLOWED_UA_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandex/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
  /telegrambot/i,
  /applebot/i,
]

function isBlockedBot(userAgent: string): boolean {
  if (!userAgent) return true // empty UA is a strong scraper signal
  if (ALLOWED_UA_PATTERNS.some((re) => re.test(userAgent))) return false
  return BLOCKED_UA_PATTERNS.some((re) => re.test(userAgent))
}

// ── Path firewall ────────────────────────────────────────────────────────────

const BLOCKED_PATH_PATTERNS = [
  /^\/data(\/|$)/i,
  /^\/lib(\/|$)/i,
  /^\/scripts(\/|$)/i,
  /^\/docs(\/|$)/i,
  /^\/\.env/i,
  /^\/\.git/i,
  /^\/\.next/i,
  /^\/package\.json$/i,
  /^\/package-lock\.json$/i,
  /^\/next\.config/i,
  /^\/tsconfig/i,
  /^\/middleware\.ts$/i,
  /\.map$/i,
]

function isBlockedPath(pathname: string): boolean {
  return BLOCKED_PATH_PATTERNS.some((re) => re.test(pathname))
}

// ── Honeypot trap ────────────────────────────────────────────────────────────
// Pages render a hidden link to /honeypot/ that is invisible to humans
// (sr-only + aria-hidden + rel=nofollow). Anything that follows the link
// is a scraper. The IP gets banned for 1 hour.

const HONEYPOT_PATH_RX = /^\/(en|ar)?\/?honeypot\/?$/i

// ── Main middleware ──────────────────────────────────────────────────────────

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const ip = getClientIp(req)
  const ua = req.headers.get('user-agent') || ''

  // 0. Honeypot ban check
  if (isHoneypotBanned(ip)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // 1. Honeypot trap — silently ban + 404
  if (HONEYPOT_PATH_RX.test(pathname)) {
    if (!ALLOWED_UA_PATTERNS.some((re) => re.test(ua))) {
      honeypotBans.set(ip, Date.now() + HONEYPOT_BAN_MS)
    }
    return new NextResponse('Not Found', { status: 404 })
  }

  // 2. Path firewall
  if (isBlockedPath(pathname)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // 3. Bot filter
  if (isBlockedBot(ua)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // 4. Rate limiting
  const { allowed, remaining } = checkRateLimit(ip)
  if (!allowed) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'X-RateLimit-Limit': String(RATE_MAX_REQUESTS),
        'X-RateLimit-Remaining': '0',
      },
    })
  }

  const res = NextResponse.next()
  res.headers.set('X-RateLimit-Limit', String(RATE_MAX_REQUESTS))
  res.headers.set('X-RateLimit-Remaining', String(remaining))
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|assets|favicon\\.ico|favicon\\.svg|robots\\.txt|sitemap\\.xml|site\\.webmanifest|og-default\\.png|apple-icon\\.png|icon-192\\.png|icon-512\\.png|logo\\.png|logo\\.svg|logo-white\\.svg|logo-ar\\.svg).*)',
  ],
}
