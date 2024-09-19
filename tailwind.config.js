/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "banner": "url('/src/assets/images/bg-header.webp')",
      },
      fontFamily: {
        "sans": "Helvetica, Arial, sans-serif",
      },
      boxShadow: {
        "custom": "0 3px 12px rgba(0, 204, 141, .25)",
      },
    },
  },
  plugins: [],
}

