import { Typography } from "@mui/material";
import React, { useState } from "react";
import { READ_LESS, READ_MORE } from "../../constants/constants";
const ReadMore = ({ children, coded }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      <Typography
        className={coded ? "code" : "text"}
        variant={coded ? "caption" : "inherit"}
      >
        {isReadMore ? text.slice(0, 150) : text}
      </Typography>
      {coded ? (
        <>
          <div onClick={toggleReadMore} className="read-or-hide">
            {isReadMore ? READ_MORE : READ_LESS}
          </div>
        </>
      ) : (
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? READ_MORE : READ_LESS}
        </span>
      )}
    </>
  );
};

export default ReadMore;
