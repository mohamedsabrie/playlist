/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1FDF64",
        dark: "#282828",
        dark2: "#3E3E3E",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
