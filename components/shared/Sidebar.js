import React, { useState, useEffect } from "react";
import MiniProfile from "../Authorized/Profile/MiniProfile";
import { useDataLayerContextValue } from "../../context/DataLayer";
import { AuthGuardService } from "../../auth-guard/service/AuthGuardService";
import { formattedName } from "../../utils/utility";
import { DEFAULT_COVER_IMAGE, ICONS, TITLES, TOOLTIPS } from "../../constants/userdata";
import CompletionDetail from "../Authorized/Profile/CompletionDetail";
import Profiles from "../Authorized/Network/People/Profiles";
import { WORKFLOW_CODES } from "../../constants/workflow-codes";

function Sidebar() {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 120) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
    return () => {
      try {
        window.removeEventListener("scroll");
      } catch (error) {}
    };
  }, []);

  if (!loggedIn) {
    return "";
  }
  return (
    <div className={isSticky ? `usticky`:''}>
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
        coverImage={DEFAULT_COVER_IMAGE}
        profileImage={USERDATA?.SUMMARY?.data?.profilePicName}
      />

      <CompletionDetail />
      <Profiles options={{connect:false, mixedMode:true}}
        workflowRoute={WORKFLOW_CODES.PEOPLE.WHO_VIEWED_ME}
        title={TITLES.PEOPLE_WHO_VIEWED_YOU}
        tooltip={TOOLTIPS.PEOPLE_WHO_VIEWED_YOU}
        icon={ICONS.PEOPLE_WHO_VIEWED_YOU}
        dashboardPreview
      />
    </div>
  );
}

export default Sidebar;
