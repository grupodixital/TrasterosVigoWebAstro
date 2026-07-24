export default {
  content: ["./src/**/*.{astro,html,jsx,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A",
          soft: "#1A1A1A",
        },
        gold: {
          DEFAULT: "#E7C13B",
          dark: "#C9A227",
        },
        muted: "#6B6B6B",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
      },
    },
  },
  plugins: [],
};
