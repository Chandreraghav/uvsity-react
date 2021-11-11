import { Avatar } from "@mui/material";
import React, { useState, useEffect} from "react";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SidebarStyle from "../../styles/Sidebar.module.css";
import MiniProfile from "../Authorized/Profile/MiniProfile";
import { useDataLayerContextValue } from "../../context/DataLayer"
import { AuthGuardService } from "../../auth-guard/service/AuthGuardService";
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
          name="Swaroop Chakraborty"
          title="Software Engineer"
          metaData={{
            company: "Tata Consultancy Services",
            location: "Bengaluru",
          }}
          showProfileCompletionIndicator
          coverImage="https://i.pinimg.com/originals/73/23/c1/7323c115f85c7d6653337e020b9180ae.png"
          profileImage={USERDATA?.SUMMARY?.data?.profilePicName}
        />

        <div className={SidebarStyle.sidebar__stats}>
          <div className={SidebarStyle.sidebar__stat}>
            <p>Connections</p>
            <p className={SidebarStyle.sidebar__statNumber}>2,543</p>
          </div>
          <div className={SidebarStyle.sidebar__stat}>
            <p>Sessions by me</p>
            <p className={SidebarStyle.sidebar__statNumber}>123</p>
          </div>
        </div>
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
