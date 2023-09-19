/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: 'rgb(230, 0, 18)',
      },
      fontSize: {
        xm: '0.8rem',
        sm: '0.9rem',
        md: '1rem'
      }
    },
  },
  plugins: [],
}
