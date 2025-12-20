/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPrimary: '#d4a373', // Earthy Tan
        brandDark: '#1a1a1a',    // Rich Black
        brandSage: '#8b9467',   // Nature Green
        brandCream: '#fdfaf5',  // Soft Background
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}