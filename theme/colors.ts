export const lightTheme = {
  background: "#F5F7FB",

  card: "#FFFFFF",

  text: "#1A1A1A",

  subText: "#555",

  border: "#E2E6EF",

  primary: "#667eea",

  gradient: ["#e0eafc", "#cfdef3"],
};

export const darkTheme = {
  background: "#0f0c29",
  card: "#121212",
  text: "#FFFFFF",
  subText: "rgba(255,255,255,0.7)",
  border: "rgba(255,255,255,0.1)",
  primary: "#667eea",
  gradient: ["#0f0c29", "#302b63", "#24243e"],
};
export type Theme = typeof lightTheme;