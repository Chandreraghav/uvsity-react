import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import HeaderOptionsStyle from "../../../styles/HeaderOption.module.css";
import { avatarToString } from "../../../utils/utility";
import Tooltip from "@mui/material/Tooltip";
import AccountMenu from "../Profile/Account/AccountMenu";
import { IMAGE_PATHS } from "../../../constants/userdata";
import { useRouter } from "next/router";
import { openNewTab } from "./Navigator";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import SessionMenu from "../Sessions/ActionableItems/SessionMenu";
function HeaderOption({
  id,
  avatar,
  Icon,
  title,
  tooltip,
  name,
  isAuthorizedProfile,
  hidden,
  redirectTo,
  phoneMenu }) {

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [ctxUserdata, dispatch] = useDataLayerContextValue();
  const [userdata, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClick = (event, remoteRequestReceived) => {
    if (event) setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
    if (remoteRequestReceived !== undefined) setOpen(!remoteRequestReceived);
    else setOpen(!open);
  };
  useEffect(() => {
    setUserData(ctxUserdata?.userdata)
    // get public calendar profile of user on load of header options.

  }, [ctxUserdata?.userdata])

  const handleRedirects = (e) => {
    if (id == 3) {
      handleClick(e)
      return
    }
    if (redirectTo) {
      router.push(redirectTo);
      return;
    }
    if (title === "Calendar") {
      const url = `${process.env.NEXT_PUBLIC_CALENDAR_APP_URL}calendar-profile/home`
      openNewTab(
        url
      );
      return

    }
    return;
  };
  if (hidden) return null;
  return (
    <div onClick={(e) => handleRedirects(e)} className={`${HeaderOptionsStyle.headerOption} dark:hover:text-gray-300 hover:text-gray-950`}>
      {Icon && (
        <React.Fragment>
          {id == 3 && ( // 3 is the ID for Session Item.
            <React.Fragment>

              <Tooltip title={`${title}`}>
                <Icon onClick={(e) => handleClick(e)} className={HeaderOptionsStyle.headerOption__icon} />
              </Tooltip>
              <SessionMenu
                isOpen={id == 3 && open}
                onClose={handleClick}
                anchor={anchorEl}
              />
            </React.Fragment>)}

          {id !== 3 && (<Tooltip title={title}>
            <Icon className={HeaderOptionsStyle.headerOption__icon} />
          </Tooltip>)}
        </React.Fragment>
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
              <Avatar onClick={(e) => handleClick(e)} className={HeaderOptionsStyle.headerOption__avatar} {...avatarToString(`${name}`)} />
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
