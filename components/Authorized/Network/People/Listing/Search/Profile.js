import { Avatar, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { IMAGE_PATHS } from "../../../../../../constants/userdata";
import { avatarToString } from "../../../../../../utils/utility";

function Profile(props) {
  const [selected, setSelected] = useState(false);
  // From this profile variant one cannot view the profile to a different link
  // One cannot have connectivity options.
  // One can only select from these profile as this profile comes up as a search result of a profile search while in workflows like adding a session etc.
  if (!props.data) return <></>;
  const avatar = props.data.imageURL;
  const content = props.data.content;
  const handleSelection = () => {
    if (props.onSelect) {
      setSelected(true);
      props.onSelect(props.data);
    }
  };
  return (
    <div 
      onClick={handleSelection}
      className={`list-hover cursor-pointer flex gap-1 px-1 rounded-md py-1`}
    >
      {/* AVATAR */}
      <div className="avatar flex items-center justify-center flex-shrink-0 w-10 h-10 mr-2 rounded-full bg-brand-grey-200 dark:bg-brand-grey-700">
        {avatar !== "" && !avatar?.includes(IMAGE_PATHS.NO_PROFILE_PICTURE) ? (
          <Avatar className="avatar-xs" alt={`${content}`} src={avatar} />
        ) : (
          <Avatar className="avatar-xs" {...avatarToString(`${content}`)} />
        )}
      </div>

      {/* NAME OF PROFILE */}
      <div className={`flex justify-between text-sm leading-snug w-full`}>
        <div
          className={`name font-bold flex flex-row flex-wrap items-center mb-px`}
        >
          <span className="name">{content}</span>
        </div>

        {selected && (
          <>
            <div className="ml-auto py-1 mt-1">
              <CircularProgress color="success" size={20} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
