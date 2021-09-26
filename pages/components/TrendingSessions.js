import React, { useEffect } from "react";
import TrendingSessionsStyle from "../../styles/TrendingSessions.module.css";
import asyncInstance from "../../async/axios";
import SessionCard from "./SessionCards/SessionCard";
import { ENDPOINTS } from "../../async/endpoints";
function TrendingSessions() {
  useEffect(async () => {
    const res = await asyncInstance
      .get(ENDPOINTS.TOP_COURSES)
      .then((response) => {
        console.log(response.data);
      });
    //  const data=await res.data;
  }, []);
  return (
    <div>
      <SessionCard />
    </div>
  );
}

export default TrendingSessions;
