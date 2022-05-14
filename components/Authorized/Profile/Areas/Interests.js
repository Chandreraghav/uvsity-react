import { Typography } from "@mui/material";
import React,{useState} from "react";
import NoData from "../../Shared/NoData";

function Interests(props) {
  const interest = props?.interests;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return interest ? (
    <div className="   text-gray-700 text-sm lg:text-md xl:text-md    ">
    <Typography className={isReadMore && interest.length>150?'line-clamp-1':''} variant="div">{interest}</Typography>
    <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore && interest.length>150 ? "...read more" : interest.length>150?" show less":''}
      </span>
  </div>
  ) : <NoData message='No interests found.'/>
}

export default Interests;
