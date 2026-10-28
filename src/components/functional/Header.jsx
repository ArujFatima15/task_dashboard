import { useTheme } from "../../context/ThemeContext.jsx";

export default function Header({ total, pending }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="header">
      <h1>Task Dashboard</h1>
      <span>{total} tasks · {pending} pending</span>
      <button onClick={toggleTheme}>{theme === "light" ? "🌙 Dark" : "☀️ Light"}</button>
    </header>
  );
}
