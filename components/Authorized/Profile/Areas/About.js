import { Typography } from "@mui/material";
import React from "react";

function About(props) {
  const aboutMe = props?.aboutMe;
  
 
  return  aboutMe ? (
    <>
      {" "}
      <div className=" leading-snug text-gray-700 text-sm lg:text-md xl:text-md overflow-auto max-h-20  ">
        <Typography variant="div">{aboutMe}</Typography>
      </div>
    </>
  ):(<>No data</>);
}

export default About;
