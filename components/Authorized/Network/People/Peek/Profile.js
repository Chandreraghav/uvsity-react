import { Avatar, Button, Stack, Tooltip } from "@mui/material";
import React, { useRef, useEffect } from "react";
import {
  DEFAULT_COVER_IMAGE,
  IMAGE_PATHS,
  TOOLTIPS,
} from "../../../../../constants/userdata";
import { avatarToString } from "../../../../../utils/utility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import SendIcon from "@mui/icons-material/Send";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
function PeekProfile(props) {
  if (!props.isOpen) return <></>;
  let ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      props.onClickOutside && props.onClickOutside();
    }
  };

  const handleMouseLeave = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      props.onMovedOutside && props.onMovedOutside();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    // document.addEventListener("mouseout", handleMouseLeave, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      //   document.removeEventListener("mouseout", handleMouseLeave, true);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`uvsity__card relative  lg:-ml-8 overflow-hidden dark-dialog-variant flex flex-col rectangular-md-card`}
    >
      <div className="flex">
        {props.data.avatar &&
        !props.data.avatar.includes(IMAGE_PATHS.NO_PROFILE_PICTURE) ? (
          <Avatar
            className="mb-10 ml-2 mt-2"
            src={props.data.avatar}
            alt={props.data.primary}
          />
        ) : (
          <Avatar
            className="mb-10 ml-2  mt-2"
            {...avatarToString(`${props.data.primary}`)}
          />
        )}
        <div className="flex flex-col px-2 py-2">
          <h2
            className={`text-xl leading-snug font-semibold line-clamp-1 dialog-title`}
          >
            {props.data.primary}
          </h2>
          {props.data.secondary && (
            <h3 className="text-md leading-loose line-clamp-2 text-gray-500">
              <WorkIcon /> {props.data.secondary}
            </h3>
          )}
          {props.data.tertiary && (
            <h4 className="text-md leading-loose line-clamp-1 text-gray-300">
              <LocationOnIcon /> {props.data.tertiary}
            </h4>
          )}
        </div>
      </div>
      <div className="text-md actions-on-peek ">
        <Stack direction="row" spacing={2}>
          <Button size="small" variant="contained" endIcon={<SendIcon />}>
            Message
          </Button>

          <Button
            size="small"
            variant="contained"
            endIcon={<RecommendOutlinedIcon />}
          >
            Get Recommended
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default PeekProfile;
