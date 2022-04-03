import React from "react";
import TrendingSessionsStyle from "../../styles/TrendingSessions.module.css";
import SessionCard from "../SessionCards/SessionCard";
import SessionService from "../../pages/api/session/SessionService";
import Loader from "../shared/Loader";
import { SHIMMER_TIMEOUT_IN_MILLIS } from "../../constants/constants";
import { useQuery } from "react-query";
import { KEYS } from "../../async/queries/keys/unique-keys";

const getTrendingSessions =async()=> {
const res=  await SessionService.getPopularSessions();
return res.data;
};
function TrendingSessions() {

  const trendingSessions = useQuery(
    [KEYS.SESSION.PUBLIC.TOP],
    getTrendingSessions
  );
  console.log(trendingSessions)
  return (
    <div id="discover-popular-live-sessions">
      <div
        className={`flex  flex-col ${TrendingSessionsStyle.trending__sessions__wrapper__white__variant} ${TrendingSessionsStyle.trending__sessions__text} 
      justify-center text-center font-medium lg:text-2xl md:text-2xl sm:text-xl mt-10`}
      >
        <div className="">
          <h1
            className={`${TrendingSessionsStyle.trending__sessions__title} text-center`}
          >
            Discover Popular Live Sessions
          </h1>
        </div>
        <div className=" cursor-pointer">
          <a href="#sessionsPreview">
            <img
              className="img-fluid d-block mx-auto lg:w-96 sm:w-72 md:w-72 w-72 object-contain content-center "
              src={
                process.env.NEXT_PUBLIC_APP_TRENDING_SESSION_ILLUSTRATION_IMAGE
              }
            />
          </a>
        </div>
        <Loader visible={trendingSessions.isLoading} />
      </div>

      <div
        id="sessionsPreview"
        className={`${TrendingSessionsStyle.trending__sessions__wrapper__white__variant} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2  bg-yellow-300`}
      >
        {trendingSessions?.isSuccess &&
          trendingSessions && trendingSessions?.data  &&  trendingSessions?.data instanceof Array &&
          trendingSessions?.data?.map((session, index) => (
            <SessionCard
              key={index}
              data={session}
              shimmerTime={SHIMMER_TIMEOUT_IN_MILLIS}
            />
          ))}
      </div>
    </div>
  );
}

export default TrendingSessions;
