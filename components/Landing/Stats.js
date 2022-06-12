import React, { useRef } from "react";
import CountUp from "react-countup";
import CounterStyle from "../../styles/Counter.module.css";
import VisibilitySensor from "react-visibility-sensor";
import Spacer from "../shared/Spacer";
import { Box, Grid, Typography } from "@mui/material";
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

      <Box sx={{ width: "100%", display: "flex" }}>
        <img
          className=" mx-auto lg:w-60 sm:w-48 md:w-48 w-48  object-contain"
          src={process.env.NEXT_PUBLIC_APP_STATS_ILLUSTRATION_IMAGE}
        />
      </Box>

      <div className="container">
        <div className="row justify-center">
          {LANDING_PAGE_STATS_DETAIL.map((stat,key)=>(
            <div key={key} className="col-md-3">
            <div
              className={`flex ${CounterStyle.card__counter}  ${stat.className}`}
            >
               <i className={`${stat.altIcon}`}></i>
               
               
               <div className="ml-auto">
               <div className=" flex flex-col">
               <div className={`${CounterStyle.count__numbers}`}>
              
              <VisibilitySensor partialVisibility >
              <CountUp
                nodeRef={nodeRef}
                suffix="+"
                delay={2}
                duration="3"
                end={stat.count}
              />
            </VisibilitySensor>

              
              </div>
              <div className={`${CounterStyle.count__name}`}>{stat.text}</div>
           
               </div>
               </div>
             
               </div>
          </div>
          ))}
          

          
        </div>
      </div>

   
     
      <Spacer />
    </div>
  );
}

export default Stats;
