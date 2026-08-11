/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0F2A20", // near-black deep green, hero backgrounds
          900: "#0B2018",
        },
        forest: {
          DEFAULT: "#1B4332", // primary deep green
          50: "#EAF1EE",
          100: "#CBDED4",
          200: "#9FC2AE",
          300: "#6FA285",
          400: "#417C60",
          500: "#1B4332",
          600: "#163829",
          700: "#112C20",
          800: "#0C2017",
          900: "#07140E",
        },
        gold: {
          DEFAULT: "#B4923A", // parliament gold, muted brass rather than bright gold
          50: "#FBF6E9",
          100: "#F2E6C2",
          200: "#E4CD8C",
          300: "#D2B564",
          400: "#C2A247",
          500: "#B4923A",
          600: "#94762C",
          700: "#755C22",
          800: "#57431A",
        },
        parchment: "#FAF9F5", // warm white
        stone: {
          DEFAULT: "#EDECE6", // light gray
          dark: "#D8D6CC",
        },
        charcoal: "#26261F", // dark gray body text
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, #B4923A, transparent)",
      },
      boxShadow: {
        card: "0 4px 24px -8px rgba(15, 42, 32, 0.15)",
        "card-hover": "0 12px 32px -8px rgba(15, 42, 32, 0.25)",
      },
      maxWidth: {
        content: "1240px",
      },
    },
  },
  plugins: [],
};
