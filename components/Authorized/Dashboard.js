import React from "react";
import DashboardStyle from "../../styles/authorized.dashboard.module.css";
import Sidebar from "../shared/Sidebar";
function Dashboard() {
  return (
    <div className={DashboardStyle.dashboard}>
      <div className={DashboardStyle.dashboard__left__sidebar}>
      <Sidebar/>
      </div>

      <div className={DashboardStyle.dashboard__main}></div>

      <div className={DashboardStyle.dashboard__right__sidebar}>
      </div>
    </div>
  );
}

export default Dashboard;
