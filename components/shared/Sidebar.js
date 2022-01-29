import React, { useState, useEffect } from "react";
import MiniProfile from "../Authorized/Profile/MiniProfile";
import { useDataLayerContextValue } from "../../context/DataLayer";
import { AuthGuardService } from "../../auth-guard/service/AuthGuardService";
import { formattedName } from "../../utils/utility";
import {
  DEFAULT_COVER_IMAGE,
  ICONS,
  TITLES,
  TOOLTIPS,
} from "../../constants/userdata";
import CompletionDetail from "../Authorized/Profile/CompletionDetail";
import Profiles from "../Authorized/Network/People/Profiles";
import { WORKFLOW_CODES } from "../../constants/workflow-codes";
import Spacer from "./Spacer";
import Stats from "../Authorized/Profile/Connection/Stats";

function Sidebar(props) {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log(window.scrollY);
      const scrollheightLimit= props.type==='left'?500:700;
      if (window.scrollY > scrollheightLimit) {
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
  if (props.type === "left") {
    return (
      <>
        <MiniProfile
          name={formattedName(
            USERDATA?.SUMMARY?.data?.firstName,
            USERDATA?.SUMMARY?.data?.lastName
          )}
          title={USERDATA?.SUMMARY?.data?.userType}
          metaData={{
            company: USERDATA?.SUMMARY?.data?.educationalInstitution,
            location: USERDATA?.SUMMARY?.data?.city,
            city: USERDATA?.SUMMARY?.data?.city,
            country: USERDATA?.SUMMARY?.data?.country,
          }}
          coverImage={DEFAULT_COVER_IMAGE}
          profileImage={USERDATA?.SUMMARY?.data?.profilePicName}
        />

        <CompletionDetail />
        {/* People who viewed you */}
        <Spacer count={3} />

        <Profiles
          options={{ connect: false, mixedMode: true }}
          workflowRoute={WORKFLOW_CODES.PEOPLE.WHO_VIEWED_ME}
          title={TITLES.PEOPLE_WHO_VIEWED_YOU}
          tooltip={TOOLTIPS.PEOPLE_WHO_VIEWED_YOU}
          icon={ICONS.PEOPLE_WHO_VIEWED_YOU}
          dashboardPreview
          sticky={isSticky}
        />
      </>
    );
  } else {
    return (
      <>
        <Stats />
        <Spacer />
        <Profiles
          options={{ connect: true, mixedMode: false }}
          workflowRoute={WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING}
          title={TITLES.PROBABLE_INTERESTING_CONNECTIONS}
          tooltip={TOOLTIPS.PROBABLE_INTERESTING_CONNECTIONS}
          dashboardPreview
          sticky={isSticky}
        />
      </>
    );
  }
}

export default Sidebar;
