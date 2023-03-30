/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height:{
        '2screen':'200vh'
      },
      colors:{
        'dark-purple':'#22223B',
        'dark-blue-pastel': '#4A4E69',
        'light-grey-pastel': '#9ABC98',
        'beige' : 'C9ADA7',
        'light-beige': '#F2E9E4',
      },
    },

  },
  plugins: [],
}