/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/app/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#faf8f5",
          100: "#f4f1ec",
          200: "#e8e3d8",
          300: "#d9d1bf",
          400: "#c8bda3",
          500: "#b6a98a",
          600: "#9b8f73",
          700: "#7c725c",
          800: "#5d5646",
          900: "#3f3a31",
        },
        charcoal: {
          50: "#f5f6f7",
          100: "#e9ebee",
          200: "#cfd5db",
          300: "#b6bfc7",
          400: "#8e99a4",
          500: "#667380",
          600: "#4f5966",
          700: "#3c4450",
          800: "#2b313b",
          900: "#1c2127",
        },
        accent: {
          200: "#d9f2e6",
          400: "#86d1b1",
          600: "#3aa07b",
        },
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
