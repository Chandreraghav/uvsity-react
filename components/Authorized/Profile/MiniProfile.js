import React from "react";
import { avatarToString, formattedProfileSubtitle } from "../../../utils/utility";
import ProfileStyle from "../../../styles/Profile.module.css";
import { Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { IMAGE_PATHS, TOOLTIPS } from "../../../constants/userdata";
import Spacer from "../../shared/Spacer";
function MiniProfile({
  coverImage,
  profileImage,
  name,
  title,
  metaData
}) {
  if (!name) return "";
  return (
    <div>
      <Spacer/>
    <div className={`uvsity__card  uvsity__card__border__theme ${ProfileStyle.profile__mini}`}>
      <img
        src={
          coverImage ? coverImage : process.env.NEXT_FALLBACK_PROFILE_COVER_URL
        }
        alt=""
      />

      {profileImage && !profileImage.includes(IMAGE_PATHS.NO_PROFILE_PICTURE) ? (
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
              {formattedProfileSubtitle(metaData.company,metaData.location)}
            </h3>
          )}
        </div>
      </div>

     
    </div>
    </div>
  );
}

export default MiniProfile;
