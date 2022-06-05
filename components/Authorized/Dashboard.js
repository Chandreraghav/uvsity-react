import React from "react";
import Sidebar from "../shared/Sidebar";
import Intro from "./MainContent/Intro";
import CompactCard from "./Sessions/Preview/CompactCard";
import { TITLES } from "../../constants/userdata";
import Spacer from "../shared/Spacer";
import MiniFooter from "../shared/MiniFooter";

function Dashboard({ data }) {
  
  return (
    <div
      className=" 
    grid items-stretch grid-cols-12  
    gap-2 px-2 mx-auto xl:container md:gap-4 
    xl:grid-cols-8 2xl:px-5 "
    >
      <div className="relative py-2 z-50 col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-2">
        <Sidebar data={data} type="left" />
      </div>
      <div className="z-40 col-span-12 md:pt-2 md:col-span-6 lg:col-span-6 xl:col-span-4">
        <Intro data={data?.USER_PROFILE_SUMMARY} />
        <CompactCard data={data} title={TITLES.POPULAR_SESSION} />
      </div>
      <div className="lg:mt-0 xl:mt-0 md:mt-0 -mt-10  col-span-12 md:col-span-3 lg:col-span-3 py-2 xl:col-span-2">
        <Sidebar data={data} type="right" />
        <Spacer count={2} />
        <MiniFooter showOnSmallScreens/>
        <Spacer count={2} />
      </div>
      <Spacer count={6} />
    </div>
  );
}

export default Dashboard;
