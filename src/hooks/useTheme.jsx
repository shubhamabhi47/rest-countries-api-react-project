import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

// M-3 -->Shorter method using arrow function
export const useTheme = () => useContext(ThemeContext);

// M-2 -->Because as useContext(ThemeContext) is returning an array
// export default function useTheme() {
//   return useContext(ThemeContext);
// }

// M-1
// export default function useTheme() {
//   const [isDark, setIsDark] = useContext(ThemeContext);
//   return [isDark, setIsDark];
// }
