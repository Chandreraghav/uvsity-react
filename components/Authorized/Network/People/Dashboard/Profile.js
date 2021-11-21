import { Avatar, Tooltip } from "@mui/material";
import React from "react";
import { TOOLTIPS } from "../../../../../constants/userdata";
import {
  formattedName,
  formattedProfileSubtitle,
  localTZDate,
} from "../../../../../utils/utility";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import ProfileStyle from "../../../../../styles/DashboardProfile.module.css";
function Profile({
  firstName,
  lastName,
  avatar,
  sessionStartDTime,
  userType,
  instituition,
  isVisibleOnSessionCard,
  metaData,
}) {
  const profilePrimaryLine = formattedName(firstName, lastName);
  const profileSecondaryLine = formattedProfileSubtitle(userType, instituition);
  const profileTertiaryLine = metaData
    ? formattedProfileSubtitle(metaData?.city, metaData?.country)
    : "";

  if (
    profilePrimaryLine.trim() == "" &&
    profileSecondaryLine.trim() == "" &&
    profileTertiaryLine.trim() == ""
  ) {
    return "";
  }
  return (
    <div>
      <div className="flex flex-row items-center flex-1 mb-4 gap-2 pt-2">
        {/* AVATAR */}
        <div className="avatar flex items-center justify-center flex-shrink-0 w-10 h-10 mr-2 rounded-full bg-brand-grey-200 dark:bg-brand-grey-700">
          {avatar !== "" && (
            <Tooltip title={TOOLTIPS.VIEW_PROFILE}>
              <Avatar
                className={`${
                  isVisibleOnSessionCard ? "avatar-sm" : "avatar-dashboard"
                }`}
                alt={`${profilePrimaryLine}`}
                src={avatar}
              />
            </Tooltip>
          )}
          {(avatar === "" || avatar == null) && (
            <Tooltip title={TOOLTIPS.VIEW_PROFILE}>
              <Avatar
                className={`${
                  isVisibleOnSessionCard ? "avatar-sm" : "avatar-dashboard"
                }`}
                {...avatarToString(`${profilePrimaryLine}`)}
              />
            </Tooltip>
          )}
        </div>

        {/* NAME OF PROFILE, SUBTITLE & EVENT DATE */}
        <div className={`flex flex-col text-sm leading-snug`}>
          <div
            className={`name font-bold flex flex-row flex-wrap items-center mb-px ${ProfileStyle.profile__name}`}
          >
            <Tooltip title={TOOLTIPS.VIEW_PROFILE}>
              <span className="name">{profilePrimaryLine}</span>
            </Tooltip>
          </div>
          <div className="sm:line-clamp-1 text-gray-700 text-xs text-brand-grey-700 dark:text-brand-grey-500">
            {isVisibleOnSessionCard && (
              <>
                <SchoolIcon
                  className={`${ProfileStyle.profile__subtitle__icon}`}
                />
                &nbsp;
              </>
            )}
            {isVisibleOnSessionCard && profileSecondaryLine}
            {!isVisibleOnSessionCard && (
              <Tooltip title={profileSecondaryLine}>
                <div>{profileSecondaryLine}</div>
              </Tooltip>
            )}
          </div>
          {isVisibleOnSessionCard && (
            <div
              className={` ${ProfileStyle.profile__event__time__subtitle} 
          sm:line-clamp-1 event-date text-brand-grey-700 dark:text-brand-grey-500`}
            >
              <div className="flex">
                <EventIcon
                  className={`${ProfileStyle.profile__event__time__subtitle__icon}`}
                />
                {localTZDate(sessionStartDTime)}
              </div>
            </div>
          )}

          {!isVisibleOnSessionCard && metaData && (
            <div
              className={` ${ProfileStyle.profile__event__time__subtitle} 
          sm:line-clamp-1 event-date text-brand-grey-700 dark:text-brand-grey-500`}
            >
              <div className="flex">
                <Tooltip title={profileTertiaryLine}>
                  <div>{profileTertiaryLine}</div>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
