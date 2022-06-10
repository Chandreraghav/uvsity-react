import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import RecommendIcon from "@mui/icons-material/Recommend";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { green, pink, blue, purple, grey } from "@mui/material/colors";
import { openNewTab } from "../../Shared/Navigator";
import { INBOX, RATING, RECOMMENDATIONS } from "../../../../constants/userdata";
function Actions(props) {
  const handleScheduleMeeting = () => {
    openNewTab(
      process.env.NEXT_PUBLIC_CALENDAR_APP_URL +
        props.userdata?.publicCalendarProfileIdentifier
    );
  };
  const handleRequestRecommendation =(e)=>{
    if(props?.messageEvent){
      props.messageEvent({event:RECOMMENDATIONS.REQUEST_TYPE})
    }
  }
  const handleMessageSendRequest =(e)=>{
    if(props?.messageEvent){
      props.messageEvent({event:INBOX.REQUEST_TYPE})
    }
  }
  const handleRatingRequest=(e)=>{
    if(props?.ratingEvent){
      props.ratingEvent({event:RATING.REQUEST_TYPE})
    }
  }
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
            <IconButton onClick={handleMessageSendRequest}  aria-label="send-message" size="large">
              <MessageIcon sx={{ color: green[500] }} fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="cursor-pointer ">
          <Tooltip
            title={`${ RECOMMENDATIONS.REQUEST_RECOMMENDATION_CUSTOM.replace('<#>',props.userdata?.firstName)}`}
          >
            <IconButton onClick={handleRequestRecommendation} aria-label="ask-recommendation" size="large">
              <RecommendIcon sx={{ color: pink[500] }} fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </div>
        {!props?.isRated &&(<>
          <div className={`cursor-pointer `}>
          <Tooltip title={`Rate ${props.userdata?.firstName}`}>
            <IconButton  onClick={handleRatingRequest} aria-label="send-review" size="large">
              <ThumbsUpDownIcon sx={{ color:blue[500] }} fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </div>
        </>)}
      
      </div>
    </div>
  );
}

export default Actions;
