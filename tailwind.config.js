/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height:{
        '2screen':'200vh',
        '1/2.1':'48%'
      },
      width:{
        '1.5/6': '18.5%'
      },
      colors:{
        'dark-purple':'#22223B',
        'dark-blue-pastel': '#4A4E69',
        'light-grey-pastel': '#9ABC98',
        'beige' : '#C9ADA7',
        'light-beige': '#F2E9E4',
        'lilovii' : '#9A7197',
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
      },
    },

  },
  plugins: [],
}
