import React from "react";
import CountUp from "react-countup";
import CounterStyle from "../../styles/Counter.module.css";
import VisibilitySensor from "react-visibility-sensor";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import PublicIcon from '@material-ui/icons/Public';

import TypeWriter from "react-typewriter";
function UVSityStatsCounter() {
  return (
    <div className={CounterStyle.root}>
      <div className={CounterStyle.main}>
        <img
          className=" flex-start lg:w-60 sm:w-44 md:w-48 w-36 object-contain"
          src="https://i.pinimg.com/originals/3c/85/6a/3c856a24d4081492d6484a8b52315093.png"
        />
        <div className="flex flex-col">
          <VisibilitySensor partialVisibility>
            <CountUp suffix="+" delay={2} duration="3" end={100} />
          </VisibilitySensor>
          <span className=" font-serif text-xs md:text-sm lg:text-2xl ml-1 text-left text-white">
            <DynamicFeedIcon/>Live Sessions
          </span>
        </div>

        <div className="flex flex-col">
          <VisibilitySensor partialVisibility>
            <CountUp suffix="+" delay={2} duration="3" end={600} />
          </VisibilitySensor>
          <span className=" font-serif text-xs md:text-sm lg:text-2xl text-left text-white">
            <MeetingRoomIcon/>Meetings
          </span>
        </div>
        <div className="flex flex-col">
          <VisibilitySensor partialVisibility>
            <CountUp suffix="+" delay={2} duration="3" end={47} />
          </VisibilitySensor>
          <span className=" font-serif text-xs md:text-sm lg:text-2xl text-left mr-3 text-white">
            <PublicIcon/>Countries
          </span>
        </div>
       </div>
       <h4 className={CounterStyle.counter__description}>
       <TypeWriter typing={0.5}>Know how have we been doing</TypeWriter>
         </h4> 
    </div>
  );
}

export default UVSityStatsCounter;
