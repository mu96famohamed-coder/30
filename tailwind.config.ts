import type { Config } from 'tailwindcss'

// ─────────────────────────────────────────────────────────────────────────────
// POA in 30 — Tailwind Config
// Brand Navy/Gold design system (binding reference: mockup-v2-brand-navy-gold)
//
//   navy      : #1E3A52  — primary brand, dark sections & navbar
//   navy-deep : #152A3E  — hero gradient end
//   navy-ink  : #0F2137  — footer / final CTA
//   gold      : #C9A84C  — restrained accent (badges, hover borders, icons)
//   wa        : #1FAF64  — exclusively WhatsApp buttons
//   base      : #FAFAF8  — near-white page background
//
// Typography: Plus Jakarta Sans (EN / numerals / logo) · IBM Plex Sans Arabic (AR)
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        ui:      ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        arab:    ['IBM Plex Sans Arabic', 'Noto Sans Arabic', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // ── Brand navy scale (mockup) ────────────────────────────────────────
        navy: {
          DEFAULT: '#1E3A52',
          deep:    '#152A3E',
          ink:     '#0F2137',
        },
        midnight: '#1E3A52',

        // ── Gold accent scale ────────────────────────────────────────────────
        gold: {
          DEFAULT: '#C9A84C',
          50:      '#FAF5E4',
          100:     '#F5EDCC',
          200:     '#E8D5A0',
          300:     '#DAC07A',
          400:     '#C9A84C',
          500:     '#C9A84C',
          600:     '#A88534',
          700:     '#8A6D22',
          800:     '#644F1D',
          light:   '#E8D5A0',
        },

        // ── WhatsApp green — buttons only ────────────────────────────────────
        wa: '#1FAF64',

        // ── Backgrounds ──────────────────────────────────────────────────────
        base:   '#FAFAF8',
        raised: '#FFFFFF',
        subtle: '#F3F1EC',

        // ── Navy-tinted neutral scale (pre-existing, widely used) ────────────
        ink: {
          50:  '#F4F7F9',
          100: '#E4EBEF',
          200: '#C8D4DB',
          300: '#94ADBA',
          400: '#5E7D8F',
          500: '#3A5C70',
          600: '#2A4758',
          700: '#1E3A52',
          800: '#14293C',
          900: '#0C1A27',
        },

        cream: {
          DEFAULT: '#FAFAF8',
          50:  '#FEFDFB',
          100: '#FAFAF8',
          200: '#F3F1EC',
          300: '#EDEAE3',
          400: '#E5E3DD',
          500: '#C9C6BE',
        },
      },
      borderRadius: {
        btn:  '10px',   // buttons (mockup --r)
        card: '16px',   // cards (mockup --rc)
        tile: '16px',
        pill: '999px',
      },
      boxShadow: {
        soft:         '0 2px 8px rgba(15, 33, 55, 0.06)',
        tile:         '0 4px 24px rgba(15, 33, 55, 0.08)',
        'card-hover': '0 8px 32px rgba(15, 33, 55, 0.10)',
        chip:         '0 12px 34px rgba(6, 16, 26, 0.35)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm:      '1.5rem',
          lg:      '2rem',
        },
      },
    },
  },
  plugins: [],
}

export default config
