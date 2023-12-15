/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import HeaderStyle from "../../../styles/Header.module.css";
import HeaderOption from "./HeaderOption";
import { HEADER_OPTIONS } from "../../../constants/userdata";
import Search from "./Search";
import { formattedName } from "../../../utils/utility";
import Shimmer from "./Shimmer/Shimmer";
import ThemeSwitcher from "../../../theme/Theme";
import { useDataLayerContextValue } from "../../../context/DataLayer";
function Header(props) {
  const [ctxUserdata, dispatch] = useDataLayerContextValue();
  const [userdata, setUserData] = useState(null);
  const handleErrorOnRedirect = (obj) => {
    if (props.onHeaderNavigationError) {
      props.onHeaderNavigationError(obj);
    }
  };
  useEffect(() => {
    setUserData(ctxUserdata?.userdata)
  }, [ctxUserdata?.userdata])
  return (
    <div className={`${HeaderStyle.header} dark:bg-gray-dark bg-gray-100`}>
      <div className={`${HeaderStyle.header__left} !items-center`}>
        <img src="/static/images/logo/uvsity_header_logo.svg" alt="uvsity-Logo" className="!h-24 !w-44" />
        <Search />
      </div>
      {true && (
        <>
          <div className={` hidden md:flex items-center`}>
            {HEADER_OPTIONS.map((data) => (
              <HeaderOption
                key={data.id}
                id={data.id}
                oid={userdata?.userDetailsId}
                isAuthorizedProfile={data.hasAvatar}
                hidden={data.hidden}
                avatar={ctxUserdata?.userdata?.profilePicName || userdata?.profilePicName}
                title={data.title}
                Icon={data.icon}
                name={formattedName(
                  userdata?.firstName,
                  userdata?.lastName
                )}
                tooltip={data.tooltip}
                redirectTo={data.redirectTo}
                errorOnRedirect={handleErrorOnRedirect}
              />
            ))}
            <div className="-mt-3 mr-1"><ThemeSwitcher /></div>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
