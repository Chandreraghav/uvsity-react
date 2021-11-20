import React from "react";
import { avatarToString } from "../../../utils/utility";
import ProfileStyle from "../../../styles/Profile.module.css";
import { Avatar } from "@mui/material";
import CompletionProgress from "./CompletionProgress";
import Tooltip from "@mui/material/Tooltip";
import { TOOLTIPS } from "../../../constants/userdata";
import CompletionDetail from "./CompletionDetail";
function MiniProfile({
  coverImage,
  profileImage,
  name,
  title,
  metaData,
  showProfileCompletionIndicator,
  showProfileCompletionDetailCard,
  profilePercentageCompletion,
}) {
  if (!name) return "";
  return (
    <div className={ProfileStyle.profile__mini}>
      <img
        src={
          coverImage ? coverImage : process.env.NEXT_FALLBACK_PROFILE_COVER_URL
        }
        alt=""
      />

      {profileImage ? (
        <Avatar
          className={ProfileStyle.profile__mini__avatar}
          src={profileImage}
        />
      ) : (
        <Avatar {...avatarToString(`${name}`)} />
      )}

      <div className={ProfileStyle.profile__mini__information}>
        <Tooltip title={TOOLTIPS.GO_TO_PROFILE}>
          <h2>{name}</h2>
        </Tooltip>
        <div className={`text-center ${ProfileStyle.profile__mini__secondary__information}`}>
          {title ? <h4>{title}</h4> : <span>Add title</span>}
          {metaData && (
            <h3>
              {metaData.company}, {metaData.location}
            </h3>
          )}
        </div>
      </div>

      {showProfileCompletionIndicator && (
        <div className={ProfileStyle.profile__completion__indicator}>
          <CompletionProgress percentage={profilePercentageCompletion} />
        </div>
      )}
      {showProfileCompletionDetailCard && <CompletionDetail />}
    </div>
  );
}

export default MiniProfile;
