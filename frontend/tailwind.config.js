/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables manual dark mode toggling
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", // indigo-600
        dark: "#0f172a",
        card: "#ffffff",
        border: "#e2e8f0",
      }
    },
  },
  plugins: [],
}