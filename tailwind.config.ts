// NOTE: Tailwind CSS v4 uses CSS-first configuration via @theme in index.css.
// This file documents the design tokens for reference.
// The actual tokens are applied in src/index.css via @theme directive.

import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          blue:     '#0EA5E9',
          cyan:     '#06B6D4',
          green:    '#22C55E',
          lavender: '#A78BFA',
        },
        soft: {
          blue:     '#E0F2FE',
          green:    '#DCFCE7',
          lavender: '#F3E8FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm':  '0 2px 8px 0 rgba(0,0,0,0.06)',
        'soft-md':  '0 4px 20px 0 rgba(0,0,0,0.08)',
        'soft-lg':  '0 8px 40px 0 rgba(0,0,0,0.10)',
        'glow-blue':'0 0 20px 2px rgba(56,189,248,0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
