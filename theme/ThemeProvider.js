import React, { useEffect } from "react";
import { removeLocalStorageObject } from "../localStorage/local-storage";

//HOC
function ThemeProvider(props) {
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    setTheme();
  }, []);

  return <>{props.children}</>;
}

export const THEME_MODES = {
  DARK: "dark",
  LIGHT: "light",
};
export const setMode = (mode) => {
    localStorage.theme = mode || THEME_MODES.LIGHT;
    setTheme();
};

export const getMode = () => {
  try {
    return localStorage.theme || THEME_MODES.LIGHT;
  } catch (error) {}
};

export const removeThemePreference = () => {
  removeLocalStorageObject("theme");
};

export default ThemeProvider;
export const setTheme = () => {
  if (
    localStorage.theme === THEME_MODES.DARK ||
    (!("theme" in localStorage) &&
      window.matchMedia(`(prefers-color-scheme: ${THEME_MODES.DARK})`).matches)
  ) {
    document.documentElement.classList.add(THEME_MODES.DARK);
  } else {
    document.documentElement.classList.remove(THEME_MODES.DARK);
  }
};

export const getThemeTooltip=()=>{
  if(localStorage.theme===THEME_MODES.DARK) return 'Switch light mode'
  return 'Switch dark mode'
}
