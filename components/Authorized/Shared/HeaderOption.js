import { Avatar } from "@mui/material";
import React from "react";
import HeaderOptionsStyle from "../../../styles/HeaderOption.module.css";
import { avatarToString } from "../../../utils/utility";

function HeaderOption({ avatar, Icon, title, name, isAuthorizedProfile }) {
  return (
    <div className={HeaderOptionsStyle.headerOption}>
      {Icon && <Icon className={HeaderOptionsStyle.headerOption__icon} />}

      {isAuthorizedProfile ? (
        avatar ? (
          <Avatar
            className={HeaderOptionsStyle.headerOption__icon}
            src={avatar}
          />
        ) : (
          <Avatar {...avatarToString(`${name}`)} />
        )
      ) : (
        ""
      )}
      <h3 className={HeaderOptionsStyle.headerOption__title}>{title}</h3>
    </div>
  );
}

export default HeaderOption;
