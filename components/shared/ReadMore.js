import { Typography } from "@mui/material";
import React, { useState } from "react";
import { READ_LESS, READ_MORE } from "../../constants/constants";
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Typography className="text" variant="body2">
       {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? READ_MORE : READ_LESS}
      </span>
    </Typography>
    
  );
};

export default ReadMore;
