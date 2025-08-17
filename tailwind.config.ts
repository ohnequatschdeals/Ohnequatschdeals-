import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          türkis: "#00FFC8",
          pink:   "#FF3CAC",
          violett:"#7F00FF",
          anthra: "#1A1A1A",
          w: "#FFFFFF"
        }
      },
      boxShadow: {
        neon: "0 0 20px rgba(0,255,200,0.7)",
        card: "0 4px 20px rgba(0,0,0,0.3)"
      },
      borderRadius: { card: "16px" },
      maxWidth: { container: "1200px" },
      backgroundImage: {
        "hero-grad": "linear-gradient(135deg, #00FFC8 0%, #7F00FF 100%)",
        "btn-grad":  "linear-gradient(90deg, #00FFC8 0%, #FF3CAC 100%)"
      }
    }
  },
  plugins: []
} satisfies Config;
