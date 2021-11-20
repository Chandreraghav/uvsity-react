import React, { useState, useEffect } from "react";
import SidebarStyle from "../../styles/Sidebar.module.css";
import MiniProfile from "../Authorized/Profile/MiniProfile";
import { useDataLayerContextValue } from "../../context/DataLayer";
import { AuthGuardService } from "../../auth-guard/service/AuthGuardService";
import { formattedName } from "../../utils/utility";
import Divider from "@mui/material/Divider";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { DEFAULT_COVER_IMAGE, TITLES, TOOLTIPS } from "../../constants/userdata";
import Stats from "../Authorized/Profile/Connection/Stats";
import CompletionDetail from "../Authorized/Profile/CompletionDetail";


function Sidebar() {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            setSticky(true)
        }
        else {
            setSticky(false)
        }
    });
    return () => {
       try {
        window.removeEventListener("scroll")
       } catch (error) {
         
       }
        
    }
}, []);
   
  if (!loggedIn) {
    return "";
  }
  return (
    <div className={`${SidebarStyle.sidebar}`}>
       
      <div className={`${SidebarStyle.sidebar__top}`}>
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
          //showProfileCompletionDetailCard
          profilePercentageCompletion={
            USERDATA?.PROFILE_PERCENTAGE_COMPLETION?.data?.percentageOfProfileAlreadyCompleted
          }
          coverImage={DEFAULT_COVER_IMAGE}
          profileImage={USERDATA?.SUMMARY?.data?.profilePicName}
        />
      </div>
      <CompletionDetail className="sticky"/>
      <h3>People who viewed you </h3>
      <div className={`hidden ${SidebarStyle.sidebar__bottom}`}>
         {/* People who viewed you */}

      <Stats summary={USERDATA?.SUMMARY} title={TITLES.CONNECTIONS} Icon={SupervisorAccountIcon} tooltip={TOOLTIPS.VIEW_ALL_CONNECTIONS}/>
      
       
      </div>
       
      
    </div>
  );
}

export default Sidebar;
