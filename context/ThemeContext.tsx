import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

type ThemeType = "light" | "dark";

const lightColors = {
  background: "#FFFFFF",
  text: "#000000",
  subtext: "#666666",
  card: "#F3F3F3",
  primary: "#5D3FD3",
  buttonText: "#FFFFFF",
};

const darkColors = {
  background: "#000000",
  text: "#FFFFFF",
  subtext: "#AAAAAA",
  card: "#121212",
  primary: "#5D3FD3",
  buttonText: "#FFFFFF",
};

interface ThemeContextProps {
  theme: ThemeType;
  colors: typeof lightColors;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  colors: lightColors, // ✅ prevent undefined
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeType>("light");

  // 🔥 Load saved theme on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("APP_THEME");

        if (savedTheme === "dark" || savedTheme === "light") {
          setThemeState(savedTheme);
        } else {
          const systemTheme = Appearance.getColorScheme();
          setThemeState(systemTheme === "dark" ? "dark" : "light");
        }
      } catch (e) {
        setThemeState("light");
      }
    };

    loadTheme();
  }, []);

  const setTheme = async (newTheme: ThemeType) => {
    setThemeState(newTheme);
    await AsyncStorage.setItem("APP_THEME", newTheme);
  };

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setThemeState(newTheme);
    await AsyncStorage.setItem("APP_THEME", newTheme);
  };

  const colors = theme === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
