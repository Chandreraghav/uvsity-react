import { Divider, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AuthGuardService } from "../../../../auth-guard/service/AuthGuardService";
import { TOOLTIPS } from "../../../../constants/userdata";
import { WORKFLOW_CODES } from "../../../../constants/workflow-codes";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import Spacer from "../../../shared/Spacer";
import Profile from "./Dashboard/Profile";
import ProfileStyle from "../../../../styles/DashboardProfile.module.css"

function Profiles({ title, tooltip, dashboardPreview, workflowRoute }) {
  const [USERDATA, dispatch] = useDataLayerContextValue();
  const [bo, setBO] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const getProfileCollection = () => {
    switch (workflowRoute) {
      case WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING:
        return USERDATA?.SUGGESTED_FRIENDS?.data;

      case WORKFLOW_CODES.PEOPLE.WHO_VIEWED_ME:
        return USERDATA?.PROFILE_VISITS?.data;
      default:
        break;
    }
  };
  useEffect(() => {
    setLoggedIn(AuthGuardService.isUserLoggedIn());
  }, []);

  useEffect(() => {
    let controller = new AbortController();
    let isSubscribed = true;
    if (isSubscribed) {
      let _bo = [];
      getProfileCollection()?.map((value) => {
        if (workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_ARE_INTERESTING) {
          _bo.push(value.suggestedFriend.webTO);
        } else if (workflowRoute === WORKFLOW_CODES.PEOPLE.WHO_VIEWED_ME) {
          _bo.push(value.visitorUserSummary);
        }
      });
      setBO(_bo);
    }

    return () => {
      controller?.abort();
      isSubscribed = false;
    };
  }, [USERDATA]);

  if (!loggedIn) {
    return "";
  }
  if (!dashboardPreview) {
    return (
      <h1>
        Component to show all profiles listing according to specific workflow
        route
      </h1>
    );
  }
  return (
    <div>
      <Spacer count={3} />
      <div className={`${"uvsity__card uvsity__card__border__theme"}`}>
        
        <Tooltip  
        title={tooltip?tooltip: TOOLTIPS.VIEW_MORE}>
        <div 
        className={`flex flex-row items-center justify-between px-2 pt-2 pb-2 
         text-gray-600 font-medium leading-snug ${ProfileStyle.profiles__header__text}`}>
          {title}
        </div>
        </Tooltip>
        <Divider className="divider"/>
        <Spacer/>
        <div className="px-3 text-base">
          {bo?.map((value) => (
            <Profile
              firstName={value.firstName}
              lastName={value.lastName}
              avatar={value.profilePicName}
              userType={value.userType}
              instituition={value.educationalInstitution}
              metaData={value}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profiles;
