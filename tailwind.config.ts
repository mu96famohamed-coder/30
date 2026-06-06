import type { Config } from 'tailwindcss'

// ─────────────────────────────────────────────────────────────────────────────
// POA in 30 — Tailwind Config
// "Editorial Authority" design system — premium legal service, Dubai HNW market
//
//   midnight  : #0F2137  — deep navy, primary CTAs & navbar
//   gold      : #C9A84C  — premium gold accent (replaces coral)
//   base      : #F9F7F4  — warm off-white page background
//   subtle    : #F2EFE9  — section alternation, card backgrounds
//
// Typography: Cormorant Garamond (display) + DM Sans (body)
// Arabic: Amiri (display) + IBM Plex Sans Arabic (body)
//
// Coral palette remapped to gold values — all existing coral-* classes
// automatically render gold without changing component JSX files.
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Display headings — Cormorant Garamond (weight 300–400 for elegance, 600 for impact)
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        serif:   ['Cormorant Garamond', 'Georgia', 'serif'],
        // Body / UI — DM Sans (weight 400 body, 500 labels, 600 headings)
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
        ui:      ['DM Sans', 'system-ui', 'sans-serif'],
        // Arabic display — Amiri (formal, elegant at large sizes)
        'arab-display': ['Amiri', 'Noto Naskh Arabic', 'serif'],
        'arab-serif':   ['Amiri', 'Noto Naskh Arabic', 'serif'],
        // Arabic body — IBM Plex Sans Arabic
        arab: ['IBM Plex Sans Arabic', 'Noto Sans Arabic', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // ── New premium palette ──────────────────────────────────────────────
        midnight: '#0F2137',
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#E8D5A0',
          50:      '#FAF5E4',
        },
        base:   '#F9F7F4',
        subtle: '#F2EFE9',

        // ── Coral remapped to gold — all coral-* classes now render gold ─────
        coral: {
          50:  '#FAF5E4',
          100: '#F5EDCC',
          200: '#E8D5A0',
          300: '#DAC07A',
          400: '#C9A84C',
          500: '#C9A84C',
          600: '#A88534',
          700: '#866A27',
          800: '#644F1D',
          900: '#3D2E0E',
        },

        // ── Primary brand: deep midnight-navy ────────────────────────────────
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

        // ── Backgrounds ─────────────────────────────────────────────────────
        cream: {
          DEFAULT: '#F9F7F4',
          50:  '#FEFCF9',
          100: '#F9F7F4',
          200: '#F2EFE9',
          300: '#EDE9E2',
          400: '#E5E0D8',
          500: '#C5BFB5',
        },
        sand: {
          50:  '#F7F1E4',
          100: '#F2E9D3',
          200: '#EADDBA',
        },
      },
      borderRadius: {
        btn:  '6px',    // professional, not pill — CTA buttons
        card: '12px',   // service cards
        tile: '12px',   // matches card
        pill: '999px',  // kept for backward compat (WA button etc.)
      },
      boxShadow: {
        soft:         '0 2px 8px rgba(15, 33, 55, 0.06)',
        tile:         '0 4px 24px rgba(15, 33, 55, 0.08)',
        'card-hover': '0 8px 32px rgba(15, 33, 55, 0.10)',
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
