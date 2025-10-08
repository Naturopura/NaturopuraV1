import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',      // Extra small devices (large phones)
        'sm': '640px',      // Small tablets and portrait tablets
        'md': '768px',      // Landscape tablets
        'lg': '1024px',     // Small laptops
        'xl': '1280px',     // Desktops
        '2xl': '1536px',    // Large desktops
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in-left': 'slideInLeft 0.3s ease-in-out',
        'slide-out-left': 'slideOutLeft 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      width: {
        'sidebar-expanded': '16rem',    // 256px
        'sidebar-collapsed': '4rem',     // 64px
      },
      zIndex: {
        'sidebar': '40',
        'sidebar-overlay': '30',
        'header': '20',
      },
      colors: {
        'naturopura': {
          50: '#f7f9f0',
          100: '#eef2e0',
          200: '#dde5c1',
          300: '#cbd8a2',
          400: '#bacb83',
          500: '#8DA63F',
          600: '#707e22',
          700: '#666e21',
          800: '#5c5e1c',
          900: '#525017',
          text: '#636d1e',
        }
      },
      backgroundImage: {
        'naturopura-gradient': 'linear-gradient(to right, #8DA63F, #707e22, #666e21)',
        'naturopura-gradient-hover': 'linear-gradient(to right, #7d9535, #636d1e, #5c5e1c)',
      }
    },
  },
  plugins: [
    tailwindScrollbar
  ],
} as const;
