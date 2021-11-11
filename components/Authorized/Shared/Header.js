import React from "react";
import HeaderStyle from "../../../styles/Header.module.css";
import HeaderOption from "./HeaderOption";
import { HEADER_OPTIONS } from "../../../constants/userdata";
import Search from "./Search";
function Header() {
  return (
    <div className={HeaderStyle.header}>
      <div className={HeaderStyle.header__left}>
        <img src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE} alt="uvsity-Logo" />
        <Search />
      </div>

      <div className={HeaderStyle.header__right}>
        {HEADER_OPTIONS.map((data) => (
          <HeaderOption
            key={data.id}
            isAuthorizedProfile={data.hasAvatar}
            hidden={data.hidden}
            avatar={data.avatar}
            title={data.title}
            Icon={data.icon}
            name={data.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Header;
