import React, { useEffect, useState } from "react";
import TrendingSessionsStyle from "../../styles/TrendingSessions.module.css";
import asyncInstance from "../../async/axios";
import SessionCard from "./SessionCards/SessionCard";
import { ENDPOINTS } from "../../async/endpoints";
function TrendingSessions() {
  const [trendingSessions,setTrendingSessions] =useState([])
  useEffect(async () => {
  await asyncInstance
      .get(ENDPOINTS.TOP_COURSES)
      .then((response) => {
        console.log(response.data)
        setTrendingSessions(response.data)
      });
    //  const data=await res.data;
  }, []);
  return (
    <div id="popularlivesessions" className={`${TrendingSessionsStyle.trending__sessions__wrapper} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  bg-yellow-300`}>
      {trendingSessions && trendingSessions?.map((session,index)=>(
 <SessionCard key={index} data={session} />
      ))}
     
      
    </div>
  );
}

export default TrendingSessions;
