import { Avatar, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  IMAGE_PATHS,
  ME,
  TOOLTIPS,
} from "../../../../../../constants/userdata";
import {
  avatarToString,
  formattedName,
  formattedProfileSubtitle,
} from "../../../../../../utils/utility";
import ProfileStyle from "../../../../../../styles/DashboardProfile.module.css";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import { navigateToProfile } from "../../../../../Authorized/Shared/Navigator";
import { WORKFLOW_CODES } from "../../../../../../constants/workflow-codes";
toast.configure();
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
    border: "none",
  },
  popoverContent: {
    pointerEvents: "auto",
  },
  paper: {
    padding: theme.spacing(3),
  },
}));
function SnapProfile({
  firstName,
  lastName,
  avatar,
  campus,
  userType,
  instituition,
  oid,
  origin,
  userdata,
  onProfileViewRequest,
}) {
  const router = useRouter();
  const handleUserProfileView = () => {
    if (!origin) {
      if (oid) navigateToProfile(Number(oid), router);
    } else {
      if (
        origin === "recommendation_feed" ||
        origin === "recommended_session_author"
      ) {
        if (onProfileViewRequest) {
          onProfileViewRequest({
            triggerName: WORKFLOW_CODES.PEOPLE.PROFILE_VIEW,
            id: oid,
          });
        }
      }
    }
  };
  const profilePrimaryLine = formattedName(firstName, lastName);
  const profileSecondaryLine = formattedProfileSubtitle(userType, instituition);
  const [isMePrefixOnProfileName, setMePrefixOnProfileName] = useState(false);
  useEffect(() => {
    setMePrefixOnProfileName(isItMe());
  }, []);
  const isItMe = () => {
    return userdata?.userDetailsId === oid;
  };
  return (
    <>
      <div className="flex gap-1">
        {origin !== "recommended_session_author" && (
          <>
            <div
              className={`avatar flex items-center justify-center flex-shrink-0 w-10 h-10 ${
                origin === "recommendation_feed" ? "" : "mr-2"
              } rounded-full bg-brand-grey-200 dark:bg-brand-grey-700`}
            >
              {avatar &&
              avatar !== "" &&
              !avatar?.includes(IMAGE_PATHS.NO_PROFILE_PICTURE) ? (
                <Avatar
                  className="avatar-xs"
                  alt={`${profilePrimaryLine}`}
                  src={avatar}
                />
              ) : origin === "recommendation_feed" ? (
                <>
                  <Avatar
                    src={avatar}
                    className="avatar-3xs"
                    alt={profilePrimaryLine}
                    {...avatarToString(`${profilePrimaryLine}`)}
                  />
                </>
              ) : (
                <Avatar
                  className={`avatar-xs`}
                  alt={profilePrimaryLine}
                  {...avatarToString(`${profilePrimaryLine}`)}
                />
              )}
            </div>
          </>
        )}

        <div className={`flex flex-col text-sm leading-snug w-full`}>
          <div className={"flex"}>
            <div
              onClick={handleUserProfileView}
              className={`name font-bold flex flex-row flex-wrap items-center mb-px ${ProfileStyle.profile__name} ${origin==='recommended_session_author' || origin==='secondary-name'?' text-gray-600':''}`}
            >
              <Tooltip
                title={
                  isMePrefixOnProfileName
                    ? TOOLTIPS.GO_TO_PROFILE
                    : TOOLTIPS.VIEW_PROFILE
                }
              >
                <span className={`name `}>
                  {profilePrimaryLine}
                  {isMePrefixOnProfileName ? <>{ME}</> : <></>}
                </span>
              </Tooltip>
            </div>
          </div>

          <div className="  sm:line-clamp-1 dark:text-gray-500 text-gray-700 text-xs text-brand-grey-700 dark:text-brand-grey-500">
            {profileSecondaryLine !== "" && (
              <Tooltip title={`${profileSecondaryLine}${campus?', '+campus:''}`}>
                <div className={`${origin ? "" : "-mt-2-px"}`}>
                  {profileSecondaryLine} 
                  {campus && (<>, {campus}</>)}
                </div>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SnapProfile;
