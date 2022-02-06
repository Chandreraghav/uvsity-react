import React from "react";
import HeaderStyle from "../../../styles/Header.module.css";
import HeaderOption from "./HeaderOption";
import { HEADER_OPTIONS } from "../../../constants/userdata";
import Search from "./Search";
import Hamburger from "./FireFighter/Hamburger";
import { formattedName } from "../../../utils/utility";
import Shimmer from "./Shimmer/Shimmer";
function Header(props) {
  const userdata = props.data;
  return (
    <div className={HeaderStyle.header}>
      <div className={HeaderStyle.header__left}>
        <img src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE} alt="uvsity-Logo" />
        <Search />
      </div>

      {userdata.isLoading && (
        <>
          <div className={` hidden md:flex items-center`}>
            <Shimmer visible />
          </div>
        </>
      )}
      {userdata.isSuccess && (
        <>
          <div className={` hidden md:flex items-center`}>
            {HEADER_OPTIONS.map((data) => (
              <HeaderOption
                key={data.id}
                isAuthorizedProfile={data.hasAvatar}
                hidden={data.hidden}
                avatar={userdata.data.profilePicName}
                title={data.title}
                Icon={data.icon}
                name={formattedName(
                  userdata.data.firstName,
                  userdata.data.lastName
                )}
                tooltip={data.tooltip}
                redirectTo={data.redirectTo}
              />
            ))}
          </div>
        </>
      )}

      <Hamburger color="gray" />
    </div>
  );
}

export default Header;
