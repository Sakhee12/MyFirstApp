/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        platinum: "#E5E7EB",
        gold: "#FACC15",
        silver: "#CBD5E1",
        glass: "rgba(255,255,255,0.12)",
        dark: "#020617",
        dark2: "#0F172A",
        dark3: "#1E293B",
      },
    },
  },
  plugins: [],
};
