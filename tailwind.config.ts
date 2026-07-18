/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1A3626",
          light: "#2D5A3D",
          dark: "#0F2418",
        },
        terracotta: {
          DEFAULT: "#E07A5F",
          light: "#F09B85",
          dark: "#C9644A",
        },
        oat: {
          DEFAULT: "#F9F6F0",
          dark: "#E8E4DC",
        },
      },
    },
  },
  plugins: [],
};