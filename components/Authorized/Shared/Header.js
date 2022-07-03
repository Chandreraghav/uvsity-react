/* eslint-disable @next/next/no-img-element */
import React from "react";
import HeaderStyle from "../../../styles/Header.module.css";
import HeaderOption from "./HeaderOption";
import { HEADER_OPTIONS } from "../../../constants/userdata";
import Search from "./Search";
import { formattedName } from "../../../utils/utility";
import Shimmer from "./Shimmer/Shimmer";
import ThemeSwitcher from "../../../theme/theme";
function Header(props) {
  const userdata = props.data;
  const handleErrorOnRedirect = (obj) => {
    if (props.onHeaderNavigationError) {
      props.onHeaderNavigationError(obj);
    }
  };
  return (
    <div className={`${HeaderStyle.header} dark:bg-gray-950 bg-gray-100`}>
      <div className={HeaderStyle.header__left}>
        <img src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE} alt="uvsity-Logo" />
        <Search />
        <ThemeSwitcher/>
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
                oid={userdata.data.userDetailsId}
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
                errorOnRedirect={handleErrorOnRedirect}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
