/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          700: '#1a1f2e',
          800: '#151926',
          900: '#0f131d',
        },
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(236, 72, 153, 0.3)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#9ca3af',
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            h3: {
              color: '#fff',
            },
            strong: {
              color: '#fff',
            },
            a: {
              color: '#ec4899',
              '&:hover': {
                color: '#f472b6',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 