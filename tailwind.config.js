/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
        },
        accent: {
          DEFAULT: '#F59E0B',
          light:   '#FDE68A',
          dark:    '#D97706',
        },
        surface: '#F8F9FF',
        ink:     '#1E293B',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':    'spin 12s linear infinite',
        'draw-line':    'drawLine 1.2s ease forwards',
        'blob':         'blob 8s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        blob: {
          '0%':         { transform: 'translate(0px, 0px) scale(1)' },
          '33%':        { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%':        { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%':       { transform: 'translate(0px, 0px) scale(1)' },
        },
        drawLine: {
          from: { 'stroke-dashoffset': '1000' },
          to:   { 'stroke-dashoffset': '0' },
        },
      },
      boxShadow: {
        'glow':       '0 0 40px rgba(99,102,241,0.15)',
        'glow-lg':    '0 0 80px rgba(99,102,241,0.2)',
        'card':       '0 4px 24px rgba(15,23,42,0.08)',
        'card-hover': '0 16px 48px rgba(15,23,42,0.14)',
      },
    },
  },
  plugins: [],
}

