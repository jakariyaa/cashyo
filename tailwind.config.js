import { createThemes } from "tw-animate-css";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [
    require("tailwindcss/defaultConfig")(),
    createThemes({
      light: {
        background: "#f0f9ff",
        foreground: "#1e3a8a",
        primary: "#34d399",
        "primary-foreground": "#ffffff",
        card: "#ffffff",
        "card-foreground": "#1e3a8a",
        muted: "#f3f4f6",
        "muted-foreground": "#6b7280",
      },
      dark: {
        background: "#1e3a8a",
        foreground: "#ffffff",
        primary: "#34d399",
        "primary-foreground": "#1e3a8a",
        card: "#1e3a8a",
        "card-foreground": "#ffffff",
        muted: "#1f2937",
        "muted-foreground": "#9ca3af",
      },
    }),
  ],
};
