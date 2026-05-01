import { Link } from "react-router";
import { useTheme } from "../hooks/useTheme.jsx";

const Header = () => {
  const [isDark, setIsDark] = useTheme();
  console.log(isDark);
  return (
    <header className={`header-container ${isDark ? "dark" : ""}`}>
      <div className="header-content">
        <h2 className="title">
          <Link to="/">Where in the world?</Link>
        </h2>
        <p
          className="theme-changer"
          onClick={() => {
            document.body.classList.toggle("dark");
            setIsDark(!isDark);
            localStorage.setItem("isDarkMode", !isDark);
          }}
        >
          <i className={`fa-solid fa-${isDark ? "sun " : "moon"}`} />
          &nbsp;&nbsp; {isDark ? "light" : "dark"} Mode
        </p>
      </div>
    </header>
  );
};

export default Header;
