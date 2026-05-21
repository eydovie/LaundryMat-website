// useTheme.js
// Separating the hook into its own file fixes the
// Fast Refresh warning — each file exports one thing only.

import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function useTheme() {
  return useContext(ThemeContext);
}
