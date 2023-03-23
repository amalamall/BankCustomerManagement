/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'background-primary' : '#EEEEEE',
        'background-navbar' :'#FFFFFF',
        'background-secondary': '#e7e7e7',
        'backgroung-card-1' : "#8bb7a2",
        'card-color-2' : "#4c4e8d",

        'primary-color' : "#041562",
        'secondary-color' : '#DA1212'
      }
    },
  },
  plugins: [],
}
