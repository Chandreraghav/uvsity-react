import React, { useEffect, useState } from "react";
import TrendingSessionsStyle from "../../styles/TrendingSessions.module.css";
import SessionCard from "./SessionCards/SessionCard";
import SessionService from  "../api/session/SessionService"
import Loader from "./Loader";

function TrendingSessions() {
  const [trendingSessions, setTrendingSessions] = useState([]);
  const [loaderVisibility, setLoaderVisibility] = useState(true);
  useEffect(async () => {
    await new SessionService().getPopularSessions().then((response) => {
      setTrendingSessions(response.data);
      setLoaderVisibility(false);
    });
  }, []);
  return (
    <div id="popularlivesessions">
      <div
        className={`flex  flex-col ${TrendingSessionsStyle.trending__sessions__wrapper__white__variant} ${TrendingSessionsStyle.trending__sessions__text} 
      justify-center text-center font-medium lg:text-2xl md:text-2xl sm:text-xl`}
      >
        <div className=" hidden">Trending Live Sessions</div>
        <div className=" cursor-pointer">
          <a href="#sessionsPreview">
            <img
              className=" mr-auto ml-auto block object-contain"
              src="/static/images/trending_live_sessions_poster.png"
            />
          </a>
        </div>
        <Loader visible={loaderVisibility} />
      </div>
      
      <div
        id="sessionsPreview"
        className={`${TrendingSessionsStyle.trending__sessions__wrapper} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2  bg-yellow-300`}
      >
        {!loaderVisibility &&
          trendingSessions &&
          trendingSessions?.map((session, index) => (
            <SessionCard key={index} data={session} shimmerTime={4000} />
          ))}
      </div>
    </div>
  );
}

export default TrendingSessions;
