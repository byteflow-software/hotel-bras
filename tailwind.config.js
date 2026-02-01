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
        primary: {
          DEFAULT: "#3D2B1F",
          light: "#5A4233",
        },
        secondary: {
          DEFAULT: "#D4B896",
          light: "#E8D5BC",
        },
        accent: {
          DEFAULT: "#C9A86C",
          hover: "#B8954A",
        },
        neutral: {
          DEFAULT: "#8B7355",
          light: "#A89580",
        },
        light: "#F5F0EB",
        lighter: "#FAF8F5",
        "hotel-white": "#FFFFFF",
        text: {
          DEFAULT: "#2D2016",
          light: "#5C4D3D",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#16A34A",
          foreground: "#FFFFFF",
        },
        border: "#E8D5BC",
        ring: "#C9A86C",
        background: "#FFFFFF",
        foreground: "#2D2016",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#2D2016",
        },
        muted: {
          DEFAULT: "#F5F0EB",
          foreground: "#5C4D3D",
        },
      },
      fontFamily: {
        sans: ["Lato", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Raleway", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  plugins: [],
};
