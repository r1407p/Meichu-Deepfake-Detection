/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {},
    screens: {  // same as mui
      'xs': '0px',
      'sm': '600px',
      'md': '900px',
      'lg': '1200px',
      'xl': '1536px',
    },
  },
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
    preflight: false,
  },
  plugins: [
    require('daisyui'),
  ],
}

