/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-bg": "url('/src/images/bg_image.jpg')",
      },
    },
  },
  plugins: [],
};
