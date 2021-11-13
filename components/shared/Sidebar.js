import React, { useState, useEffect } from "react";
import SidebarStyle from "../../styles/Sidebar.module.css";
import MiniProfile from "../Authorized/Profile/MiniProfile";
import { useDataLayerContextValue } from "../../context/DataLayer";
import { AuthGuardService } from "../../auth-guard/service/AuthGuardService";
import { formattedName } from "../../utils/utility";
import Divider from "@mui/material/Divider";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { TITLES, TOOLTIPS } from "../../constants/userdata";
import Stats from "../Authorized/Profile/Connection/Stats";


function Sidebar() {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
  }, []);
  const recentItem = (topic) => (
    <div className={SidebarStyle.sidebar__recentItem}>
      <span className={SidebarStyle.sidebar__hash}>#</span>
      <p>{topic}</p>
    </div>
  );
   
  if (!loggedIn) {
    return "";
  }
  return (
    <div className={SidebarStyle.sidebar}>
      <div className={SidebarStyle.sidebar__top}>
        <MiniProfile
          name={formattedName(
            USERDATA?.SUMMARY?.data?.firstName,
            USERDATA?.SUMMARY?.data?.lastName
          )}
          title={USERDATA?.SUMMARY?.data?.userType}
          metaData={{
            company: USERDATA?.SUMMARY?.data?.educationalInstitution,
            location: USERDATA?.SUMMARY?.data?.city,
          }}
          profilePercentageCompletion={
            USERDATA?.PROFILE_PERCENTAGE_COMPLETION?.data?.percentageOfProfileAlreadyCompleted
          }
          coverImage="https://i.pinimg.com/originals/73/23/c1/7323c115f85c7d6653337e020b9180ae.png"
          profileImage={USERDATA?.SUMMARY?.data?.profilePicName}
        />
        <Stats summary={USERDATA?.SUMMARY} title={TITLES.CONNECTIONS} Icon={SupervisorAccountIcon} tooltip={TOOLTIPS.VIEW_ALL_CONNECTIONS}/>
        <Divider className={SidebarStyle.sidebar__divider} />
      </div>

      {/* <div className={SidebarStyle.sidebar__bottom}>
        <p>Recent</p>
        {recentItem("software")}
        {recentItem("devops")}
        {recentItem("learning")}
        {recentItem("skillshare")}
        {recentItem("reactjs")}
      </div> */}
    </div>
  );
}

export default Sidebar;
