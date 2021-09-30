import React from "react";
import CountUp from "react-countup";
import CounterStyle from "../../styles/Counter.module.css";
import VisibilitySensor from "react-visibility-sensor";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PublicIcon from '@mui/icons-material/Public';
import VideocamIcon from '@mui/icons-material/Videocam';
function UVSityStatsCounter() {
   
  return (
    <div className={CounterStyle.root}>
      <div className={CounterStyle.main}>
        <img
          className=" flex-start lg:w-60 sm:w-44 md:w-48 w-36 object-contain"
          src="/static/images/stats_counter_illustration.png"
        />
        <div className="flex flex-col">
          <VisibilitySensor partialVisibility>
            <CountUp suffix="+" delay={2} duration="3" end={100} />
          </VisibilitySensor>
          <div className="text-xs md:text-sm lg:text-2xl ml-1 text-left text-white">
            <DynamicFeedIcon/>Live Sessions
          </div>
        </div>

        <div className="flex flex-col">
          <VisibilitySensor partialVisibility>
            <CountUp suffix="+" delay={2} duration="3" end={600} />
          </VisibilitySensor>
          <div className="text-xs md:text-sm lg:text-2xl text-left text-white">
            <VideocamIcon/>Meetings
          </div>
        </div>
        <div className="flex flex-col">
          <VisibilitySensor partialVisibility>
            <CountUp suffix="+" delay={2} duration="3" end={47} />
          </VisibilitySensor>
          <div className="text-xs md:text-sm lg:text-2xl text-left mr-3 text-white">
            <PublicIcon/>Countries
          </div>
        </div>
       </div>
       
    </div>
  );
}

export default UVSityStatsCounter;
