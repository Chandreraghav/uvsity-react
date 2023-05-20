import React, { useState, useEffect } from "react";
import MiniProfile from "../Authorized/Profile/MiniProfile";
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
import StatsForOwner from "../Authorized/Profile/Connection/StatsForOwner";
import { useDataLayerContextValue } from "../../context/DataLayer";
function Sidebar(props) {
  const [ctxUserdata, dispatch] = useDataLayerContextValue();
  const [userdata, setUserData] = useState(null);
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollheightLimit = props?.align === "left" ? 500 : 300;
      if (window.scrollY > scrollheightLimit) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
    return () => {
      try {
        window.removeEventListener("scroll");
      } catch (error) { }
    };
  }, [props.align]);

  useEffect(() => {
    setUserData(ctxUserdata?.userdata)
  }, [ctxUserdata?.userdata])
  if (props.align === "left") {
    return (
      <>
        <MiniProfile
          name={formattedName(
            userdata?.firstName,
            userdata?.lastName
          )}
          title={userdata?.userType}
          metaData={{
            company: userdata?.educationalInstitution,
            location: userdata?.city,
            city: userdata?.city,
            country: userdata?.country,
          }}
          coverImage={DEFAULT_COVER_IMAGE}
          profileImage={ctxUserdata?.userdata?.profilePicName || userdata?.profilePicName}
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
        <StatsForOwner />
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
