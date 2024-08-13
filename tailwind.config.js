/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "main-blue": "#072854",
        "main-green": "#2cbd62",
        "secondary-text": "#757575",
      },
      backgroundImage: {
        "computer-typing": "url('/src/assets/typing.jpg')",
      },
    },
  },
  plugins: [],
};
