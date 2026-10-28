import { createContext, useContext, useState, useMemo, useCallback } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

// Task 5 (useContext): theme is available everywhere without prop-drilling
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
