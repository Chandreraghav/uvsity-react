import React from "react";
import Footer from "../shared/Footer";
import Sidebar from "../shared/Sidebar";
import Intro from "./MainContent/Intro";
import Stats from "./Profile/Connection/Stats";
import CompactCard from "./Sessions/Preview/CompactCard";
 
function Dashboard() {
  
  return (
    // CONTAINER
    <div className="grid items-stretch grid-cols-12 gap-2 px-2 py-2 mx-auto xl:container md:gap-4 xl:grid-cols-8 2xl:px-5">
      
      {/* LEFT SIDE */}
      <div className="relative z-50 col-span-12 md:col-span-3 lg:col-span-2 xl:col-span-2">
        <Sidebar />
      </div>

      {/* CENTER */}
      <div className="z-40 col-span-12 md:pt-2 md:col-span-9 lg:col-span-6 xl:col-span-4">
        <div className="relative flex flex-col mb-2">
          <Intro />
        </div>
        <div className="relative flex flex-col mb-2">
         {/* POPULAR SESSIONS */}
         <CompactCard title='Popular Sessions'/>
        </div>
        <div className="relative flex flex-col mb-2">
         {/* RECENT ACTIVITY */}
         <h3>Recent Activities</h3>
        </div>
        
        
        <Footer />
        
      </div>

      {/* RIGHT SIDE */}
      <div className="col-span-12 md:pt-2 md:col-span-6 lg:col-span-4 xl:col-span-2">
      <Stats standalone/>
      <h4>Connections you might be interested in</h4>
        {/* Connections you might be interested in */}
      </div>
    </div>
  );
}

export default Dashboard;
