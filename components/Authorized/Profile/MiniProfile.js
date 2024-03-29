/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import {
  avatarToString,
  formattedProfileSubtitle,
} from "../../../utils/utility";
import ProfileStyle from "../../../styles/Profile.module.css";
import { Avatar, Popover } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { IMAGE_PATHS, TOOLTIPS } from "../../../constants/userdata";
import Spacer from "../../shared/Spacer";
import PeekProfile from "../Network/People/Peek/Profile";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { navigateToProfile } from "../Shared/Navigator";
import { getMode, THEME_MODES } from "../../../theme/ThemeProvider";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import Link from '@mui/material/Link';
import { AUTHORIZED_ROUTES } from "../../../constants/routes";
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
function MiniProfile({
  coverImage,
  profileImage,
  name,
  title,
  metaData,
}) {
  const router = useRouter();
  const classes = useStyles();
  const [ctxUserdata, dispatch] = useDataLayerContextValue();
  const [userdata, setUserData] = useState(null);
  const popoverAnchor = useRef(null);
  const [openedPopover, setOpenedPopover] = useState(false);
  const handlePopoverOpen = (event) => {
    setOpenedPopover(true);
  };

  const handlePopoverClose = () => {
    setOpenedPopover(false);
  };

  const goToProfile = (userdata, router) => {
    navigateToProfile(userdata.userDetailsId, router)
  }
  useEffect(() => {
    setUserData(ctxUserdata?.userdata)
  }, [ctxUserdata?.userdata])
  if (!name) return "";
  return (
    <div>
      <Spacer />
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.popoverContent,
        }}
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        disableRestoreFocus
        PaperProps={{
          onMouseEnter: handlePopoverOpen,
          onMouseLeave: handlePopoverClose,
        }}
      >
        <PeekProfile
          isOpen={openedPopover}
          dark={getMode() === THEME_MODES.DARK ? true : false}
          data={{
            avatar: profileImage,
            primary: name,
            secondary: formattedProfileSubtitle(title, metaData?.company),
            tertiary: formattedProfileSubtitle(
              metaData?.city,
              metaData?.country
            ),
            isItMe: true,
            oid: userdata?.userDetailsId
          }}
        />
      </Popover>

      {true && (
        <div
          className={`uvsity__card  uvsity__card__border__theme ${ProfileStyle.profile__mini}`}
        >
          <img
            src={
              coverImage
                ? coverImage
                : process.env.NEXT_FALLBACK_PROFILE_COVER_URL
            }
            alt=""
          />

          {profileImage &&
            !profileImage.includes(IMAGE_PATHS.NO_PROFILE_PICTURE) ? (
            <Avatar
              ref={popoverAnchor}
              onTouchStart={handlePopoverOpen}
              onTouchEnd={handlePopoverClose}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              className={ProfileStyle.profile__mini__avatar}
              src={profileImage}
            />
          ) : (
            <Avatar
              ref={popoverAnchor}
              onTouchStart={handlePopoverOpen}
              onTouchEnd={handlePopoverClose}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              {...avatarToString(`${name}`)}
            />
          )}

          <div className={ProfileStyle.profile__mini__information}>
            <Tooltip title={TOOLTIPS.GO_TO_PROFILE}>
               <h2 className={`dark:text-gray-100 text-gray-900`}
                onClick={() =>
                  goToProfile(userdata, router)
                }
              >
                {name}
              </h2>
            </Tooltip>
            <div
              className={`text-center ${ProfileStyle.profile__mini__secondary__information}`}
            >
              {title ? <h4>{title}</h4> : <h4></h4>}
              {metaData && (
                <h3>
                  {formattedProfileSubtitle(
                    metaData.company,
                    metaData.location
                  )}
                </h3>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MiniProfile;
