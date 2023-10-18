import { Typography } from "@mui/material";
import React, { useState } from "react";
import { READ_LESS, READ_MORE } from "../../constants/constants";
import { parseMarkdownToHTML } from "../../utils/utility";
import { parseHtml as syncFusionParse } from "@syncfusion/ej2-react-richtexteditor";

export const ReadMore = ({ children, coded, color, initialReadLimit, parseHtml, className = "" }) => {
  const text =children;
  const [isReadMore, setIsReadMore] = useState(true);
  const limit= initialReadLimit || 50
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      <Typography
        className={`${className} ${coded ? "code" : "text"}`}
        variant={coded ? "caption" : "inherit"}
        color={color ? color : "inherit"}
      >{
        parseHtml ? isReadMore
        ? parseMarkdownToHTML(text.substring(0, limit))
        : parseMarkdownToHTML(text):
        isReadMore
          ? text.slice(0, limit)
          : text
      }

 
        
      </Typography>
      {coded ? (
         <>
         {(isReadMore && text.length > limit) ? (
           <>
             <div onClick={toggleReadMore} className="read-or-hide">
               {READ_MORE}
             </div>
           </>
         ) : text.length > limit && (
           <>
             <div onClick={toggleReadMore} className="read-or-hide">
               {READ_LESS}
             </div>
           </>
         )}
       </>
      ) : (
        <>
        {(isReadMore && text.length > limit) ? (
          <>
            <span onClick={toggleReadMore} className="read-or-hide">
              {READ_MORE}
            </span>
          </>
        ) : text.length > limit && (
          <>
            <span onClick={toggleReadMore} className="read-or-hide">
              {READ_LESS}
            </span>
          </>
        )}
      </>
      )}
    </>
  );
};

export default ReadMore;
