import { type Config } from "tailwindcss"

export default {
  darkMode: "class",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slower": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-medium": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-fast": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      }
    }
  }
} satisfies Config
