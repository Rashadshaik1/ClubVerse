/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],

  darkMode: "class",

  theme: {
    extend: {

      // ================= COLORS =================
      colors: {
        primary: "#00C2FF",          // main brand cyan
        primaryDark: "#0099CC",
        primaryLight: "#66E3FF",

        accent: "#7C3AED",           // purple accent (premium feel)

        darkBg: "#05080f",           // upgraded deep SaaS bg
        lightBg: "#f8fafc",

        glass: "rgba(255,255,255,0.05)",
      },

      // ================= FONT =================
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },

      // ================= SHADOWS =================
      boxShadow: {
        glow: "0 0 25px rgba(0,194,255,0.4)",
        glowStrong: "0 0 40px rgba(0,194,255,0.6)",
      },

      // ================= ANIMATIONS =================
      animation: {
        "spin-slow": "spin 2.5s linear infinite",
        "spin-reverse": "spin 3.5s linear infinite reverse",
        "pulse-slow": "pulse 2s infinite",
        "float": "float 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out",
      },

      // ================= KEYFRAMES =================
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },

        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
      },
    },
  },

  plugins: [],
};