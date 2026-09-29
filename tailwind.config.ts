
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B2DFF',
          dark: '#4A1FE6',
          light: '#7D52FF',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          soft: '#1A1A1A',
          muted: '#3A3A3A',
        },
        chalk: {
          DEFAULT: '#FFFFFF',
          off: '#F7F7F5',
          warm: '#F2F0EC',
        },
        stone: {
          light: '#E8E8E4',
          mid: '#C8C8C2',
          dark: '#8A8A82',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        editorial: ['Playfair Display', 'Georgia', 'serif'],
        display: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'draw-line': 'draw-line 1s ease-out forwards',
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'draw-line': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
