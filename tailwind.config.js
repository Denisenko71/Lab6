/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      transitionProperty: {
        'colors': 'background-color, color, border-color',
      },
    },
  },
}