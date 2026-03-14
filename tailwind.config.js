/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'text-light': 'var(--color-text-light)',
        'text-dark': 'var(--color-text)',
      },
      backgroundColor: {
        primary: 'var(--color-primary)',
      },
      textColor: {
        primary: 'var(--color-primary)',
        'text-light': 'var(--color-text-light)',
      },
    },
  },
  plugins: [],
};
