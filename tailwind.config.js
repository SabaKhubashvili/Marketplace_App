/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
        fontFamily:{
          'Poppins':['Poppins','sans-serif']
        },
        colors:{
          'main':'#24B47E',
          'secondary':'#808080',
          'third':'#989898'
        },
        boxShadow:{
          'FeedComponent':'6.95482px 6.95482px 3.47741px rgba(71, 71, 71, 0.25)'
        },
        backgroundColor:{
          'secondary':'#212121',
          'transtparent-gradient':"linear-gradient(0deg, rgba(3, 101, 82, 0.16), rgba(3, 101, 82, 0.16));"
        },
        content:{
          'LaptopWoman':'url("/Images/background/LaptopWoman.png")',
          'Lines':'url("/Images/background/Lines.png")',
        }
        ,
        screens:{
          xs:'475px',
          xxs:'375px'
        }
    },
  },
  plugins: [],
}
