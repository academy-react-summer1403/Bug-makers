
// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      boxShadow: {
        "3xl": "-3px 3px 3px 0px rgba(0,0,0,0.1)",
        "4xl": "0px 3px 3px 0px rgba(204,182,182,0.2);",
        blogDown: "-10px 10px 10px 0px rgba(0,0,0,0.1)",
        'custom-shadow': '0px 0px 10px 0px #ccc',
        'drop-shadow': '-5px 5px 5px 1px #0000000D'
      },
      backgroundImage: {
        'blogBack': "url('./public/images/Course/Group 13.png')",
        'custom-gradient-Header': 'linear-gradient(180deg, #F5F5F4 97.05%, #FAFAF9 3.69%)',
        'custom-grading-storeService': 'linear-gradient(180deg, #fafaf9 82.5%, #f5f5f4 19.17%)',
        'gradient-custom': 'linear-gradient(to right, #E1C564, white)',
        'drop-gradient': 'linear-gradient(180deg, #C4CDD5 60%, #F2F2F2 90%)',
        'poster': 'linear-gradient(0deg, #F2F2F2 10.88%, #C4CDD5 80%)',
        'register-course' : 'linear-gradient(180deg, #C4CDD5 10.86%, #91ACCF 60.43%)'
      },
      backgroundColor:{
        'bghigh' : "#272727"
      },
      screens: {
        'custom': '952px', 
        'custom2': '514px' ,
        'custom3': '570px' ,
        'custom4': '700px' ,
        'custom5': '1352px' ,
        'custom6': '1181px' ,

      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};