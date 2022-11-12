/* eslint-disable @next/next/no-img-element */
import { Typography } from "@mui/material";
import React from "react";

function EndOfFeed(props) {
  return (
    <div className=" flex-col">
      <img
        className={"object-contain mx-auto w-1/2"}
        alt={props.title}
        src={props.src}
      />
      <div className="flex justify-center">
        <Typography className={`dark:text-gray-600 text-gray-800`} variant="h5">
          <props.icon /> {props.title}
        </Typography>
      </div>

      <div className="flex justify-center">
        <Typography className="  text-gray-700" variant="caption">
          {props.subtitle}
        </Typography>
      </div>
    </div>
  );
}

export default EndOfFeed;
