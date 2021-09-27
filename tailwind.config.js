const path = require('path')
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'], 
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  theme: {
    extend: {
      backgroundImage: {
       'step-one': "url('/static/images/how_it_works_bg.jpg')",
       'step-two': "url('/static/images/how_it_works_bg_2.jpg')",
       'step-three': "url('/static/images/how_it_works_bg_3.jpg')",
      }
    }
  }
}
