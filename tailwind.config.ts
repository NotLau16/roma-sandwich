import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#1B3B24", deep: "#1E4620" },
        olive: { DEFAULT: "#3E6B38", light: "#7A9B57" },
        cream: { DEFAULT: "#F7F4EB", card: "#FFFDF9" },
        ink: { DEFAULT: "#162419", soft: "#4A5A4D" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
