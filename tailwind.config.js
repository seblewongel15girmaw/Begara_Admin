/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     
      colors: {
        primary: "#FFE333",
        secondary: "#c24c19",
        accent: "#00FF00",
        textColor: "#737272",
        sideBar: "#000000",
      },
    },
  },
  
  plugins: [],
}

