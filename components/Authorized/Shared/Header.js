import React from "react";
import HeaderStyle from "../../../styles/Header.module.css";
import HeaderOption from "./HeaderOption";
import { HEADER_OPTIONS } from "../../../constants/userdata";
import Search from "./Search";
import Hamburger from "./FireFighter/Hamburger";
function Header() {
 
  return (
    <div className={HeaderStyle.header}>
      <div className={HeaderStyle.header__left}>
        <img src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE} alt="uvsity-Logo" />
        <Search />
      </div>

      <div  className={` hidden md:flex items-center`}>
        {HEADER_OPTIONS.map((data) => (
          <HeaderOption
            key={data.id}
            isAuthorizedProfile={data.hasAvatar}
            hidden={data.hidden}
            avatar={data.avatar}
            title={data.title}
            Icon={data.icon}
            name={data.name}
            tooltip={data.tooltip}
          />
        ))}
        
      </div>
      <Hamburger color='gray'/>
    </div>
  );
}

export default Header;
