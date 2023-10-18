const path = require("path");
module.exports = {

  //purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  content: [
    // Example content paths...
    "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", //  'media' or 'class or false'
  variants: {
    extend: {},
  },
  presets: ["@babel/preset-react", "@babel/preset-env"],
  plugins: [
    // ...
    require("@tailwindcss/line-clamp"),
  ],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    colors: {
      blue: "#1fb6ff",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    extend: {
      colors: {
        blue: {
          200: '#d3e3fd',
          800: "#1976D2",
          900: "#5271FF",
        },
        red: {
          100: "#ff2400",
          200: "#8A0707",
          300: "#f5f5dc",
          400: "#b7410e",
          500: "#f5f5dc",
        },
        yellow: {
          100: "#FFCA2C",
        },
        indigo: {
          500: '#6366F1'
        },
        purple: {
          500: '#A855F7'
        },
        pink: {
          500: '#EC4899'
        },
        primary: {
          100: "#E6F6FE",
          200: "#C0EAFC",
          300: "#9ADDFB",
          400: "#4FC3F7",
          500: "#03A9F4",
          600: "#0398DC",
          700: "#026592",
          800: "#014C6E",
          900: "#013349",
        },
        gray: {
          100: "#f7fafc",
          200: "#e2e2e2",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
          600: "#718096",
          700: "#4a5568",
          800: "#2d3748",
          900: "#1a202c",
          950: "#111",
        },
        white: {
          100: '#fff'
        }
      },
      lineHeight: {
        hero: "4.5rem",
      },
    },
  },
};
