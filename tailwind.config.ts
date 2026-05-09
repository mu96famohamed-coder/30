import type { Config } from 'tailwindcss'

// ─────────────────────────────────────────────────────────────────────────────
// POA in 30 — Tailwind Config
//
// Design system is intentionally DIFFERENT from E-Notary Dubai to avoid any
// visual fingerprinting or duplicate-content signals:
//   - ink         : deep teal-navy (primary brand color, text & CTAs)
//   - coral       : warm coral-orange (accent, highlights, active states)
//   - cream       : warm off-white page background (replaces stark white)
//   - sand        : slightly darker cream for section separators & subtle cards
//
// Typography pairs Plus Jakarta Sans (geometric display) with Inter (UI).
// Arabic uses IBM Plex Sans Arabic — friendlier than Noto Kufi used on E-Notary.
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        ui: ['Inter', 'system-ui', 'sans-serif'],
        arab: ['IBM Plex Sans Arabic', 'Noto Sans Arabic', 'sans-serif'],
        // Editorial serif for display headlines (EN)
        serif: ['Instrument Serif', 'Cormorant Garamond', 'Georgia', 'serif'],
        // Editorial serif for display headlines (AR) — Amiri reads beautifully at large sizes
        'arab-serif': ['Amiri', 'Noto Naskh Arabic', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // ── Primary: deep teal-navy ─────────────────────────────────────────
        ink: {
          50:  '#F4F7F9',
          100: '#E4EBEF',
          200: '#C8D4DB',
          300: '#94ADBA',
          400: '#5E7D8F',
          500: '#3A5C70',
          600: '#2A4758',
          700: '#1E3A52', // brand primary
          800: '#14293C',
          900: '#0C1A27',
        },
        // ── Accent: warm coral-orange ───────────────────────────────────────
        coral: {
          50:  '#FEF3EE',
          100: '#FDE4D6',
          200: '#FBC7AC',
          300: '#F59B73',
          400: '#EE7849',
          500: '#E85A3C', // brand accent
          600: '#CA4628',
          700: '#A2371E',
          800: '#7A2818',
          900: '#4F1910',
        },
        // ── Backgrounds ─────────────────────────────────────────────────────
        cream: {
          DEFAULT: '#FDF8F1',
          50:  '#FEFBF6',
          100: '#FDF8F1',
          200: '#F9F0E2',
          300: '#F5EDDF',
          400: '#EFE4CE',
          500: '#E6D5B3',
        },
        sand: {
          50:  '#F7F1E4',
          100: '#F2E9D3',
          200: '#EADDBA',
        },
      },
      borderRadius: {
        pill: '999px',
        tile: '20px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(30, 58, 82, 0.06)',
        tile: '0 4px 16px rgba(30, 58, 82, 0.08)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
    },
  },
  plugins: [],
}

export default config
