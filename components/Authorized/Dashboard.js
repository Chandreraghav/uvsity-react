import React,{} from "react";
import Sidebar from "../shared/Sidebar";
import Intro from "./MainContent/Intro";
import CompactCard from "./Sessions/Preview/CompactCard";
import { TITLES } from "../../constants/userdata";
function Dashboard({data}) {
   
  return (
    <div
       
      className=" app__body
    grid items-stretch grid-cols-12  
    gap-2 px-2 mx-auto xl:container md:gap-4 
    xl:grid-cols-8 2xl:px-5 "
    >
      <div className="relative py-2 z-50 col-span-12 md:col-span-3 lg:col-span-3 xl:col-span-2">
            
          <Sidebar data={data}  type='left' />
        
      </div>

      <div className="z-40 col-span-12 md:pt-2 md:col-span-6 lg:col-span-6 xl:col-span-4">
        <Intro data={data?.USER_PROFILE_SUMMARY} />
        <CompactCard data={data} title={TITLES.POPULAR_SESSION} />
        
      </div>
      <div className=" col-span-12 md:col-span-3 lg:col-span-3 py-2 xl:col-span-2">
      <Sidebar data={data} type='right' />
         
      </div>
    </div>
  );
}

export default Dashboard;
