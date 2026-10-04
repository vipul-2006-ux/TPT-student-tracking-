/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        college: {
          navy: '#0A2540',
          blue: '#1A4D8C',
          light: '#EBF3FB',
          accent: '#3B82F6',
        }
      }
    },
  },
  plugins: [],
}
