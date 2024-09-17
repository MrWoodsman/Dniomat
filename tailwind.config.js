/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        'safe': 'env(safe-area-inset-bottom)',
        'safe-plus': 'calc(1rem + env(safe-area-inset-bottom)'
      }
    },
  },
  plugins: [],
}