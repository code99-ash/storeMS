/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
       //   colors: {
    //     // primary: '#075985',
    //     // primary2: '#0284C7',
    //     // lightPrimary: '#E6F2F9',
    //     // secondary: '#EC4899',
    //     // tertiary: '#F2890E',
    //     // lightTertiary: '#FFE8CC', 
    //     // veryLightGray: '#FCFCFC',
    //     // lightGray: '#F5F5F5',
    //     // midGray: '#AAAAAA',
    //     // deepGray: '#334155',
    //   },
    //   maxWidth: {
    //     '12h': '1200px'
    //   }
    // },
    // fontSize: {
    //   f65: '65px',
    //   f32: '32px',
    //   f24: '24px',
    //   f22: '22px',
    //   f20: '20px',
    //   f18: '18px',
    //   f16: '16px',
    //   f15: '15px',
    //   f14: '14px',
    //   f12: '12px',
    //   f11: '11px',
    //   f10: '10px',
    //   f9: '9px',
    //   f8: '8px',
    // }
    }
  },
  plugins: [],
}
