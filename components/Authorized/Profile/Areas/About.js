import { Typography } from "@mui/material";
import React,{useState} from "react";
import { READ_LESS, READ_MORE, READ_MORE_MAX_LENGTH } from "../../../../constants/constants";
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
        <Typography className={isReadMore && aboutMe.length>READ_MORE_MAX_LENGTH?'line-clamp-1':''} variant="div">{aboutMe}</Typography>
        <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore && aboutMe.length>READ_MORE_MAX_LENGTH ? READ_MORE : aboutMe.length>READ_MORE_MAX_LENGTH?READ_LESS:''}
      </span>
      </div>
    </>
  ):(<NoData message='No intro available yet.'/>);
}

export default About;
