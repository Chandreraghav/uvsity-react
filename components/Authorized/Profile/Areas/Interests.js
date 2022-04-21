import { Typography } from "@mui/material";
import React from "react";

function Interests(props) {
  const interest = props?.interests;
  return interest ? (
    <div className=" leading-snug text-gray-700 text-sm lg:text-md xl:text-md overflow-auto max-h-20  ">
    <Typography variant="div">{interest}</Typography>
  </div>
  ) : <>No data</>;
}

export default Interests;
