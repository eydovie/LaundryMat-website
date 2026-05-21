// ThemeContext.jsx
// React Context lets us share data (the theme) across ALL
// components without passing props down manually through
// every level. Any component can read the theme directly.

import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { themes, defaultTheme } from "../themes";

// ThemeProvider wraps the entire app and makes the theme
// available to every component inside it
export function ThemeProvider({ children }) {
  // Try to load a saved theme from localStorage first.
  // If none saved, use the defaultTheme from themes.js.
  // This means the user's choice persists across page refreshes.
  const [activeTheme, setActiveTheme] = useState(() => {
    const saved = localStorage.getItem("laundrymat-theme");
    return saved && themes[saved] ? saved : defaultTheme;
  });

  // The actual theme object (colors etc) derived from the key
  const theme = themes[activeTheme];

  // Apply CSS variables to the document root whenever theme changes.
  // This means we can also use var(--bg) in plain CSS if needed.
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
    // Save the choice to localStorage so it persists
    localStorage.setItem("laundrymat-theme", activeTheme);
  }, [activeTheme, theme]);

  const switchTheme = (key) => {
    if (themes[key]) setActiveTheme(key);
  };

  return (
    <ThemeContext.Provider value={{ theme, activeTheme, switchTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}
