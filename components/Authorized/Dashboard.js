import React from "react";
import { WORKFLOW_CODES } from "../../constants/workflow-codes";
import Sidebar from "../shared/Sidebar";
import Profiles from "./Network/People/Profiles";
import Intro from "./MainContent/Intro";
import Stats from "./Profile/Connection/Stats";
import CompactCard from "./Sessions/Preview/CompactCard";
import { TITLES, TOOLTIPS } from "../../constants/userdata";

function Dashboard() {
  return (
    
     
    <div
    style={{width:"92vw"}} className="
    grid items-stretch grid-cols-12
    gap-2 px-2 mx-auto xl:container md:gap-4 
    xl:grid-cols-8 2xl:px-5"
    >
      <div className="relative py-2 z-50 col-span-12 md:col-span-3 lg:col-span-2 xl:col-span-2">
        <div>
          <Sidebar />
        </div>
      </div>

      <div className="z-40 col-span-12 md:pt-2 md:col-span-8 lg:col-span-5 xl:col-span-4">
        <Intro />
        <CompactCard  title={TITLES.POPULAR_SESSION}/>
      </div>

      <div className="col-span-12 pt-2  xl:col-span-2">
      <Stats/>
      <Profiles options={{connect:true, mixedMode:false}}  workflowRoute={WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING} 
      title={TITLES.PROBABLE_INTERESTING_CONNECTIONS}
      tooltip={TOOLTIPS.PROBABLE_INTERESTING_CONNECTIONS}
      dashboardPreview/>
      </div>

 
    </div>
     
  );
}

export default Dashboard;
