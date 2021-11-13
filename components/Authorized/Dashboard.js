import React from "react";
import DashboardStyle from "../../styles/authorized.dashboard.module.css";
import Sidebar from "../shared/Sidebar";
import Intro from "./MainContent/Intro";
function Dashboard() {
  return (
    <div className={DashboardStyle.dashboard}>
      <div className={DashboardStyle.dashboard__left__sidebar}>
        <Sidebar />
      </div>

      <div className={DashboardStyle.dashboard__main}>
        <Intro />
        {/* Popular Session */}
        {/* Profile Completion */}
        {/* Recent Updates */}
      </div>

      <div className={DashboardStyle.dashboard__right__sidebar}>
        Right Sidebar
      </div>
    </div>
  );
}

export default Dashboard;
