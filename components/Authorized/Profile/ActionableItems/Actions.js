import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import RecommendIcon from "@mui/icons-material/Recommend";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { green, pink, blue, purple } from "@mui/material/colors";
import { openNewTab } from "../../Shared/Navigator";
function Actions(props) {
  const handleScheduleMeeting = () => {
    openNewTab(
      process.env.NEXT_PUBLIC_CALENDAR_APP_URL +
        props.userdata?.publicCalendarProfileIdentifier
    );
  };
  return (
    <div className=" send-message send-rating ask-recommendation ">
      <div></div>
      <div className="flex gap-2">
        <div onClick={handleScheduleMeeting} className=" cursor-pointer">
          <Tooltip
            title={`Schedule a meeting with ${props.userdata?.firstName}`}
          >
            <IconButton aria-label="schedule-meeting" size="large">
              <DateRangeIcon sx={{ color: purple[500] }} fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </div>

        <div className=" cursor-pointer">
          <Tooltip title={`Send a message to ${props.userdata?.firstName}`}>
            <IconButton aria-label="send-message" size="large">
              <MessageIcon sx={{ color: green[500] }} fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="cursor-pointer ">
          <Tooltip
            title={`Ask for a recommendation from ${props.userdata?.firstName}`}
          >
            <IconButton aria-label="ask-recommendation" size="large">
              <RecommendIcon sx={{ color: pink[500] }} fontSize="inherit" />
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
      </div>
    </div>
  );
}

export default Actions;
