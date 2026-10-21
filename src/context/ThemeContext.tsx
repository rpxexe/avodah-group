"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ak_theme") as Theme | null;
      if (saved === "light" || saved === "dark") {
        setThemeState(saved);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(saved);
        document.documentElement.setAttribute("data-theme", saved);
      } else {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      }
    } catch {
      // Local storage unavailable or SSR
    }
  }, []);

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    try {
      localStorage.setItem("ak_theme", nextTheme);
    } catch {}
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
