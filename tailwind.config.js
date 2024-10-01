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
      },
      boxShadow: {
        'custom-shadow': '0px 0px 10px 0px #ccc',
      },
    },
  },
  plugins: [],
}