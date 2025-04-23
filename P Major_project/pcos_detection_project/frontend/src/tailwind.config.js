/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f5ff',
          100: '#f0ebff',
          200: '#e0d7ff',
          300: '#c7b2ff',
          400: '#a889ff',
          500: '#8257ff',
          600: '#7e22ce',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        gray: {
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        red: {
          400: '#f87171',
          500: '#ef4444',
          700: '#b91c1c',
          900: '#7f1d1d',
        },
        green: {
          400: '#34d399',
          500: '#10b981',
          700: '#047857',
          900: '#064e3b',
        },
        yellow: {
          400: '#fbbf24',
          500: '#f59e0b',
          700: '#b45309',
        },
        orange: {
          400: '#fb923c',
          500: '#f97316',
          700: '#c2410c',
        },
        purple: {
          300: '#d8b4fe',
          400: '#c084fc',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        }
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'scale-up': 'scaleUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
} 