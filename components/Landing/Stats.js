import React, { useRef } from "react";
import CountUp from "react-countup";
import CounterStyle from "../../styles/Counter.module.css";
import VisibilitySensor from "react-visibility-sensor";
import Spacer from "../shared/Spacer";
import { LANDING_PAGE_STATS_DETAIL } from "../../constants/constants";
function Stats() {
  const nodeRef = useRef(null);

  return (
    <div id="aboutus" className={CounterStyle.root}>
      <div className="">
        <h1 className={`${CounterStyle.stats__title} text-center`}>
          Know more about us
        </h1>
      </div>
      <div className={CounterStyle.main}>
        <img
          className=" flex-start lg:w-60 sm:w-44 md:w-48 w-36 object-contain"
          src={process.env.NEXT_PUBLIC_APP_STATS_ILLUSTRATION_IMAGE}
        />
        {LANDING_PAGE_STATS_DETAIL.map((stat, key) => (
          <div key={key} className="flex flex-col">
            <VisibilitySensor partialVisibility>
              <CountUp
                nodeRef={nodeRef}
                suffix="+"
                delay={2}
                duration="3"
                end={stat.count}
              />
            </VisibilitySensor>

            <div className="text-xs md:text-sm lg:text-2xl ml-1 text-left">
              {stat.icon}
              {stat.text}
            </div>
          </div>
        ))}
      </div>
      <Spacer count={2} />
    </div>
  );
}

export default Stats;
