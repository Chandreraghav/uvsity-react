import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import SplashStyle from "../../styles/Splash.module.css";
import { LOADING_MESSAGE_DEFAULT } from "../../constants/constants";

function Splash({ message }) {
  if (!message) message = LOADING_MESSAGE_DEFAULT;
  return (
    <div className={`${SplashStyle.splash} bg-gray-100 dark:bg-gray-900`}>
      <CircularProgress />
      {message && (
        <p className=" text-gray-900 dark:text-gray-100">{message}</p>
      )}
    </div>
  );
}

export default Splash;
