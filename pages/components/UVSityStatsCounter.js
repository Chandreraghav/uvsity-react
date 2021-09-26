import React from "react";
import CountUp from "react-countup";
import CounterStyle from "../../styles/Counter.module.css";
import VisibilitySensor from "react-visibility-sensor";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import PublicIcon from '@material-ui/icons/Public';
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
            <MeetingRoomIcon/>Meetings
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
       <h4 className={CounterStyle.counter__description}>
       Know how have we been doing
      
         </h4> 
    </div>
  );
}

export default UVSityStatsCounter;
