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
import Stats from "../Authorized/Profile/Connection/Stats";
import { useDataLayerContextValue } from "../../context/DataLayer";


function Sidebar({ data, type }) {
  const [ctxUserdata, dispatch] = useDataLayerContextValue();
  const [isSticky, setSticky] = useState(false);
   
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollheightLimit = type === "left" ? 500 : data?.TOP_SESSIONS.data?.length>0?700:300;
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
  }, [data?.TOP_SESSIONS.data?.length, type]);

  
  if (type === "left") {
    return (
      <>
        
          <MiniProfile
            name={formattedName(
              data?.USER_PROFILE_SUMMARY?.data?.firstName,
              data?.USER_PROFILE_SUMMARY?.data?.lastName
            )}
            title={data?.USER_PROFILE_SUMMARY?.data?.userType}
            metaData={{
              company: data?.USER_PROFILE_SUMMARY?.data?.educationalInstitution,
              location: data?.USER_PROFILE_SUMMARY?.data?.city,
              city: data?.USER_PROFILE_SUMMARY?.data?.city,
              country: data?.USER_PROFILE_SUMMARY?.data?.country,
            }}
            coverImage={DEFAULT_COVER_IMAGE}
            profileImage={ctxUserdata?.userdata?.profilePicName || data?.USER_PROFILE_SUMMARY?.data?.profilePicName}
            masterData={data?.USER_PROFILE_SUMMARY}
          />
        <CompletionDetail data={data ? data : null} />
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
          data={data ? data : null}
        />
      </>
    );
  } else {
    return (
      <>
        <Stats data={data ? data : null} />
        <Spacer />
        <Profiles
          options={{ connect: true, mixedMode: false }}
          workflowRoute={WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING}
          title={TITLES.PROBABLE_INTERESTING_CONNECTIONS}
          tooltip={TOOLTIPS.PROBABLE_INTERESTING_CONNECTIONS}
          dashboardPreview
          sticky={isSticky}
          data={data ? data : null}
          
        />
      </>
    );
  }
}

export default Sidebar;
