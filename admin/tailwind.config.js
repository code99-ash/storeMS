/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{vue,js,jsx,ts,tsx,css,.scss}",
  ],
  theme: {
    screens: {
      xs: '475px',
      sm: '570px',
      md: '768px',
      lg: '900px',
      xl: '1200px'
    },
    extend: {
      colors: {
        secondary: '#f79256',
        tan: '#fbd1a2',
        mintgreen: '#7dcfb6',
        primary: '#00b2ca',
        navyblue: '#1d4e89'
      },
      fontFamily: {
        'sans': ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
        'serif': ['IBM Plex Serif', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
}
