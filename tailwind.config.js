/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          light: '#818cf8',
          dark: '#3730a3',
        },
        // Restrained blue/cyan secondary accent — used sparingly (diagram
        // highlights, a hover state, a small status indicator), never as the
        // primary interactive color. Pairs with `brand` without competing.
        accent: {
          DEFAULT: '#38bdf8',
          light: '#7dd3fc',
          dark: '#0284c7',
        },
        // Three-step navy system, deliberately applied per section so the
        // page has an intentional depth rhythm rather than incidental
        // sameness: `ink-deep` bookends the page (Hero, Footer) and marks
        // the recessed "Now" status readout; `ink` is the base tone for the
        // primary case-study section; `ink-raised` lifts the two content
        // panels (What I Build, About) up out of the base. Adjacent
        // sections never share the same value.
        ink: '#0f172a',
        'ink-deep': '#0a0f1c',
        'ink-raised': '#161f37',
        muted: '#64748b',
        surface: '#f8fafc',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        // Display face for headings and oversized section numerals — Syne's
        // geometric, slightly unconventional letterforms read as drafted
        // rather than default-SaaS-bold, pairing well with the schematic/
        // architectural visual language elsewhere on the site.
        display: ['"Syne"', '"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        // Deliberately near-flat: the site favors square, architectural
        // edges over the soft "everything is a rounded card" template
        // pattern. Kept as a token (rather than 0) only so a hairline
        // chamfer can be reintroduced in one place if ever needed.
        card: '2px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(0.75rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Low-amplitude blink for the single live-status indicator in the
        // "Now" section. Not used for decorative glow anywhere else.
        'pulse-node': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        // Connecting-line "draw on" reveal, paired with SVG `pathLength="1"`
        // so the dash math works regardless of the path's real geometry.
        'draw-line': {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'pulse-node': 'pulse-node 3.2s ease-in-out infinite',
        'draw-line': 'draw-line 1.4s ease-out both',
      },
    },
  },
  plugins: [],
}
