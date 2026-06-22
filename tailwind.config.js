/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Naranja PullTask — "Task"
        brand: {
          50:  "#fff4ec",
          100: "#ffe4cc",
          200: "#ffc899",
          300: "#ffa866",
          400: "#ff8c33",
          500: "#f47820",
          600: "#d9640f",
          700: "#b5500b",
          800: "#8f3f08",
          900: "#6a2e05",
        },
        // Gris PullTask — "pull"
        slate: {
          400: "#9ca3af",
          500: "#7a7a7a",
          600: "#5c5c5c",
          700: "#3f3f3f",
          800: "#2a2a2a",
          900: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
