import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import RecommendIcon from "@mui/icons-material/Recommend";
import { green, pink, blue } from "@mui/material/colors";
function Actions(props) {
  return (
    <div className=" send-message send-rating ask-recommendation ">
      <div></div>
      <div className="flex gap-2">
        <div className=" cursor-pointer">
        <Tooltip title={`Send a message to ${props.userdata?.firstName}`}>
          <IconButton aria-label="send-message" size="large">
            <MessageIcon sx={{ color: green[500] }} fontSize="inherit" />
          </IconButton>
          </Tooltip>
        </div>
        <div className="cursor-pointer ">
        <Tooltip title={`Rate ${props.userdata?.firstName}`}>
          <IconButton aria-label="send-review" size="large">
            <ThumbsUpDownIcon sx={{ color: blue[500] }} fontSize="inherit" />
          </IconButton>
          </Tooltip>
        </div>
        <div className="cursor-pointer ">
          <Tooltip title={`Ask a recommendation from ${props.userdata?.firstName}`}>
          <IconButton aria-label="ask-recommendation" size="large">
            <RecommendIcon sx={{ color: pink[500] }} fontSize="inherit" />
          </IconButton>
          </Tooltip>
         
        </div>
      </div>
    </div>
  );
}

export default Actions;
