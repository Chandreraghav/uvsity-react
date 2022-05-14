import { Typography } from "@mui/material";
import React,{useState} from "react";
import NoData from "../../Shared/NoData";

function About(props) {
  const aboutMe = props?.aboutMe;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return  aboutMe ? (
    <>
      <div className="  text-gray-700 text-sm lg:text-md xl:text-md    ">
        <Typography className={isReadMore && aboutMe.length>150?'line-clamp-1':''} variant="div">{aboutMe}</Typography>
        <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore && aboutMe.length>150 ? "...read more" : aboutMe.length>150?" show less":''}
      </span>
      </div>
    </>
  ):(<NoData message='No intro available yet.'/>);
}

export default About;
