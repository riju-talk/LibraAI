/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#001D3D',
          DEFAULT: '#001D3D',
          light: '#003566',
        },
        accent: {
          dark: '#CCA000',
          DEFAULT: '#CCA000',
          light: '#F5CC00',
        },
        badge: {
          success: {
            bg: '#065F46',
            border: '#10B981',
            text: '#EBEBEB'
          },
          warning: {
            bg: '#92400E',
            border: '#F59E0B',
            text: '#EBEBEB'
          },
          error: {
            bg: '#991B1B',
            border: '#EF4444',
            text: '#EBEBEB'
          },
          info: {
            bg: '#1E40AF',
            border: '#3B82F6',
            text: '#EBEBEB'
          }
        },
        text: {
          primary: '#EBEBEB',
          secondary: '#D1D5DB',
          muted: '#9CA3AF'
        }
      },
      backgroundColor: {
        'glass': 'rgba(0, 29, 61, 0.9)',
        'glass-light': 'rgba(0, 53, 102, 0.7)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      }
    },
  },
  plugins: [],
}
