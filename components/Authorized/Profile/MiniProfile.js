import React from "react";
import { avatarToString } from "../../../utils/utility";
import  ProfileStyle from  '../../../styles/Profile.module.css'
import { Avatar } from "@mui/material";
import CompletionProgress from "./CompletionProgress";
function MiniProfile({ coverImage, profileImage, name, title, metaData , showProfileCompletionIndicator}) {
  if (!name) return "";
  return (
    <div className={ProfileStyle.profile__mini}>
      <img
        src={
          coverImage
            ? coverImage
            : process.env.NEXT_FALLBACK_PROFILE_COVER_URL
        }
        alt=""
      />

      {profileImage ? (
        <Avatar className={ProfileStyle.profile__mini__avatar} src={profileImage} />
      ) : (
        <Avatar {...avatarToString(`${name}`)} />
      )}

<div className={ProfileStyle.profile__mini__information}>
<h2>{name}</h2>
<div className={ProfileStyle.profile__mini__secondary__information}>
{title ? <h4>{title}</h4> : <span>Add title</span>}
      {metaData && (
        <h3>
          {metaData.company}, {metaData.location}
        </h3>
      )}
</div>
      
</div>
     

      {showProfileCompletionIndicator && (<div className={ProfileStyle.profile__completion__indicator}><CompletionProgress percentage={66}/></div>)}
    </div>
  );
}

export default MiniProfile;
