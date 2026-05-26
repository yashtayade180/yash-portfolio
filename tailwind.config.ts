import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:             '#101319',
        'bg-low':       '#0b0e13',
        'bg-card':      '#1d2025',
        'bg-high':      '#272a30',
        'bg-top':       '#32353b',
        surface:        '#191c21',
        'on-surface':   '#e1e2ea',
        muted:          '#bbc9cf',
        outline:        '#3c494e',
        primary:        '#00d4ff',
        'primary-dim':  '#a8e8ff',
        secondary:      '#ffb95a',
        'secondary-dim':'#ffddb6',
        danger:         '#ffb4ab',
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        btn:  '4px',
        card: '12px',
        pill: '9999px',
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        'glow-cyan':  '0 0 16px 2px rgba(0,212,255,0.25)',
        'glow-amber': '0 0 16px 2px rgba(255,185,90,0.25)',
        'inner-cyan': 'inset 0 0 0 1px rgba(0,212,255,0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config
