/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // custom responsive breakpoints (named) matching common device widths
      screens: {
        // smallest wearable devices / smartwatches
        watch: "200px",
        // phones
        xs: "320px",
        // avoid redefining Tailwind's default 'sm' (640px). use 'sm-phone' for smaller phones
        "sm-phone": "375px",
        "md-phone": "414px",
        "lg-phone": "480px",
        "xl-phone": "600px",
        // tablets
        "sm-tablet": "768px",
        "md-tablet": "834px",
        "lg-tablet": "1024px",
        // laptops / desktops
        "laptop-sm": "1024px",
        laptop: "1280px",
        desktop: "1440px",
        "desktop-lg": "1920px",
        wide: "2560px",
      },
      fontFamily: {
        sans: [
          "Tajawal",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Ubuntu",
          "Cantarell",
          "Noto Sans",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      boxShadow: {
        brand: "0 10px 30px -10px rgba(37, 99, 235, 0.35)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "slide-up": "slide-up 0.35s ease-out both",
      },
    },
  },
  plugins: [],
};
