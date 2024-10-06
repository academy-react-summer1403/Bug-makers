/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient-Header': 'linear-gradient(180deg, #F5F5F4 97.05%, #FAFAF9 3.69%)',
        'custom-grading-storeService': 'linear-gradient(180deg, #fafaf9 82.5%, #f5f5f4 19.17%)',
        'gradient-custom': 'linear-gradient(to right, #E1C564, white)',
        'drop-gradient': 'linear-gradient(180deg, #C4CDD5 60%, #F2F2F2 90%)',
        'poster': 'linear-gradient(0deg, #F2F2F2 10.88%, #C4CDD5 80%)',
        'register-course' : 'linear-gradient(180deg, #C4CDD5 10.86%, #91ACCF 60.43%)'

      },
      boxShadow: {
        'custom-shadow': '0px 0px 10px 0px #ccc',
        'drop-shadow': '-5px 5px 5px 1px #0000000D'

      },
      screens: {
        'custom': '952px', 
        'custom2': '514px' 
      },
    },
  },
  plugins: [],
}