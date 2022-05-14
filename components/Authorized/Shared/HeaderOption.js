import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import HeaderOptionsStyle from "../../../styles/HeaderOption.module.css";
import { avatarToString } from "../../../utils/utility";
import Tooltip from "@mui/material/Tooltip";
import AccountMenu from "../Profile/Account/AccountMenu";
import { IMAGE_PATHS } from "../../../constants/userdata";
import { useRouter } from "next/router";
import UserDataService from "../../../pages/api/users/data/UserDataService";
import { openNewTab } from "./Navigator";
import { WORKFLOW_CODES } from "../../../constants/workflow-codes";
function HeaderOption({
  avatar,
  oid,
  Icon,
  title,
  tooltip,
  name,
  isAuthorizedProfile,
  hidden,
  redirectTo,
  phoneMenu,
  errorOnRedirect,
  
}) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [publicProfileCalendarIdentifier, setPublicProfileCalendarIdentifier] = useState(null)
  const handleClick = (event, remoteRequestReceived) => {
    if (event) setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
    if (remoteRequestReceived !== undefined) setOpen(!remoteRequestReceived);
    else setOpen(!open);
  };
  useEffect(()=>{
    // get public calendar profile of user on load of header options.
    UserDataService.getUserProfileBy(oid).then((res) =>{
     if(res?.data && res?.data?.publicCalendarProfileIdentifier){
      setPublicProfileCalendarIdentifier(res.data.publicCalendarProfileIdentifier)
     }
    }).catch(()=>{
      setPublicProfileCalendarIdentifier(null)
    })
    return()=>{
      setPublicProfileCalendarIdentifier(null)
    }
  },[])
  const handleRedirects = () => {
    if (redirectTo) {
      router.push(redirectTo);
      return;
    }
    if (title === "Calendar") {
      if(publicProfileCalendarIdentifier){
        openNewTab(
          process.env.NEXT_PUBLIC_CALENDAR_APP_URL +
          publicProfileCalendarIdentifier
        );
        return
      }
      // attempt to call service once again and refill the calendar profile of user.
      UserDataService.getUserProfileBy(oid)
        .then((res) => {
          if(!publicProfileCalendarIdentifier){
            if(res.data && res.data.publicCalendarProfileIdentifier){
              setPublicProfileCalendarIdentifier(res.data.publicCalendarProfileIdentifier)
            }
          }
        })
        .catch((err) => {
          const requestErr = {
            code: WORKFLOW_CODES.USER.ADHOC_LINKS_OPENER.CALENDAR,
            url: process.env.NEXT_PUBLIC_CALENDAR_APP_URL,
            message: "The requested link could not be opened.",
            diagnostics: err?.toString(),
          };
          if (errorOnRedirect) {
            errorOnRedirect(requestErr);
          }
        });
    }
    return;
  };
  if (hidden) return null;
  return (
    <div onClick={handleRedirects} className={HeaderOptionsStyle.headerOption}>
      {Icon && (
        <Tooltip title={title}>
          <Icon className={HeaderOptionsStyle.headerOption__icon} />
        </Tooltip>
      )}

      {isAuthorizedProfile ? (
        avatar && !avatar.includes(IMAGE_PATHS.NO_PROFILE_PICTURE) ? (
          <div>
            <Tooltip title={tooltip}>
              <Avatar
                onClick={(e) => handleClick(e)}
                className={HeaderOptionsStyle.headerOption__icon}
                src={avatar}
              />
            </Tooltip>

            <AccountMenu
              isOpen={open}
              onClose={handleClick}
              anchor={anchorEl}
            />
          </div>
        ) : (
          <div>
            <Tooltip title={tooltip}>
              <Avatar {...avatarToString(`${name}`)} />
            </Tooltip>
            <AccountMenu
              isOpen={open}
              onClose={handleClick}
              anchor={anchorEl}
            />
          </div>
        )
      ) : (
        ""
      )}

      {phoneMenu ? (
        <h3 className={` flex  ${HeaderOptionsStyle.headerOption__title}`}>
          {title}
        </h3>
      ) : (
        <h3
          className={` lg:flex md:hidden  sm:hidden  ${HeaderOptionsStyle.headerOption__title}`}
        >
          {title}
        </h3>
      )}
    </div>
  );
}

export default HeaderOption;
