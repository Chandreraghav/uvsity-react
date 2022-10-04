import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  getMode,
  getThemeTooltip,
  setMode,
  THEME_MODES,
  useTheme,
} from "./ThemeProvider";
function ThemeSwitcher() {
  const [ctxTheme, dispatch] = useTheme();
  const [theme, setTheme] = useState(getMode());
  const handleModeChange = (obj) => {
    setMode(obj);
    setTheme(obj);
    dispatch({
      type: "SET_THEME",
      mode: obj,
    });
  };
  return (
    <Tooltip title={getThemeTooltip()}>
      {ctxTheme.mode === THEME_MODES.LIGHT ? (
        <DarkModeIcon
          onClick={() => handleModeChange(THEME_MODES.DARK)}
          className={` cursor-pointer text-blue-900 mt-1`}
        />
      ) : (
        <LightModeIcon
          onClick={() => handleModeChange(THEME_MODES.LIGHT)}
          className={` cursor-pointer dark:text-blue-900 mt-1`}
        />
      )}
    </Tooltip>
     
  );
}

export default ThemeSwitcher;
