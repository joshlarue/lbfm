/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "base": "#2E2730",
        "base-dark": "#242024",
        "primary": "#4B4832",
        "primary-light": "#8B8660",
        "secondary": "#88D18A",
        "accent": "#F28F3B",
        "text": "#E8E1EF",
      }
    },
  },
  plugins: [],
};
