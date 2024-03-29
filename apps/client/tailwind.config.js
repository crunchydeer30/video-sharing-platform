/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Font colors
        'var-text-primary': '#030303',
        'var-text-secondary': '#606060',

        'var-text-primary-dark': '#f1f1f1',
        'var-text-secondary-dark': '#aaa',

        // Background colors
        'var-bg-primary': '#f5f5f5',
        'var-bg-secondary': '#fff',
        'var-bg-tertiary': '#e5e5e5',

        'var-bg-primary-dark': '#151515',
        'var-bg-secondary-dark': '#212121',
        'var-bg-tertiary-dark': '#3a3a3a',

        // Button colors
        'var-btn-primary': '#030303',
        'var-btn-primary-dark': '#f1f1f1',

        // Accent colors
        'var-accent': '#620d0d'
      },
      spacing: {
        'var-header': '60px',
        'var-sidebar': '240px',
        'var-sidebar-minified': '65px'
      }
    }
  },
  plugins: []
};
