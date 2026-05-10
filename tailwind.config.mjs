/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        klein: { DEFAULT: '#002FA7', 50: '#E6EDFF', 100: '#B3CCFF', 200: '#80AAFF', 300: '#4D89FF', 400: '#1A67FF', 500: '#002FA7', 600: '#00238C', 700: '#001D73', 800: '#00165A', 900: '#000F41' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
