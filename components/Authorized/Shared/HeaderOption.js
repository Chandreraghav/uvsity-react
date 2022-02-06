import { Avatar } from "@mui/material";
import React, { useState } from "react";
import HeaderOptionsStyle from "../../../styles/HeaderOption.module.css";
import { avatarToString } from "../../../utils/utility";
import Tooltip from "@mui/material/Tooltip";
import AccountMenu from "../Profile/Account/AccountMenu";
import { IMAGE_PATHS } from "../../../constants/userdata";
import { useRouter } from "next/router";
function HeaderOption({
  avatar,
  Icon,
  title,
  tooltip,
  name,
  isAuthorizedProfile,
  hidden,
  redirectTo
}) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClick = (event, remoteRequestReceived) => {
    if (event) setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
    if (remoteRequestReceived !== undefined) setOpen(!remoteRequestReceived);
    else setOpen(!open);
  };
  const handleRedirects = () => {
    if (redirectTo) router.push(redirectTo);
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
      <h3
        className={` lg:flex md:hidden sm:hidden  ${HeaderOptionsStyle.headerOption__title}`}
      >
        {title}
      </h3>
    </div>
  );
}

export default HeaderOption;
