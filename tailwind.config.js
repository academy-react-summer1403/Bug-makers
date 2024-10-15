/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: { 
        '3xl': '-3px 3px 3px 0px rgba(0,0,0,0.1)',
        '4xl': '0px 3px 3px 0px rgba(204,182,182,0.2);',
        'blogDown': '-10px 10px 10px 0px rgba(0,0,0,0.1)'
      },
      backgroundImage:{
        'blogBack':"url('./public/images/Course/Group 13.png')"
      }
    },
  },
  plugins: [],
}