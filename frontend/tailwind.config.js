/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        'screen-vh': '100vh',
      },
      maxWidth: {
        'screen-xl': '100%',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      textColor: {
        'f88125': '#f88125',
      },
    },
    colors: {
      'bgc1': '#0C2647',
      'white': '#FFFFFF',
      'bgc2': '#F88125',
      'gray': '#3C3934',
      'dblue': '#120338',
      'txt1': '#C4C0C0',
      'lblue': '#5C83C4',
      'lgray': '#CACACA',
      'lightg': '#edeef0'
    }
  },
  plugins: [],
}

