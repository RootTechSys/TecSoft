/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base neutrals
        graphite: '#252525',
        snow: '#F5F5F5',

        // Primary brand (Verde Oliva TEC)
        primary: {
          50: '#f3f4ec',
          100: '#e6e8d9',
          200: '#cfd2b3',
          300: '#b8bd8e',
          400: '#a2a674',
          500: '#9aa066',
          600: '#8A8D55', // brand
          700: '#6f7244',
          800: '#585a35',
          900: '#444628',
        },

        // Secondary (Azul Estratégico)
        secondary: {
          50: '#e6eef7',
          100: '#b3c7e1',
          200: '#7ea1ce',
          300: '#4a7ab7',
          400: '#33679f',
          500: '#28507f',
          600: '#1E3A5F', // key
          700: '#19314f',
          800: '#14263a',
          900: '#0e1a29',
        },

        // Accent (Dourado Inovação)
        accent: {
          50: '#fdf6e6',
          100: '#faebc5',
          200: '#f5d78a',
          300: '#f0c86a',
          400: '#ebbb4f',
          500: '#E6B33D', // brand
          600: '#c99c33',
          700: '#a37c29',
          800: '#7d5d1f',
          900: '#5e4517',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
