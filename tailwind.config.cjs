/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'media',
  theme: {
    extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif']
        },
      colors: {
        primary: {
          DEFAULT: '#0e7490',
          foreground: '#ffffff'
        },
        accent: '#f59e0b'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
