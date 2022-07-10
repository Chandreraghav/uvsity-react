import React from "react";
import { HEADER_OPTIONS } from "../../../../constants/userdata";
import { formattedName } from "../../../../utils/utility";
import HeaderOption from "../HeaderOption";
import Shimmer from "../Shimmer/Shimmer";

function PhoneMenu(props) {
  const handleErrorOnRedirect = (obj) => {
    if (props.onHeaderNavigationError) {
      props.onHeaderNavigationError(obj);
    }
  };
  return (
    <div className=" max-h-10  dark:bg-gray-dark bg-gray-100 border-t-2  flex md:hidden  mt-auto clear-both bottom-0 left-0 z-50 text-center justify-center items-center  
    p-4 w-screen    fixed">
      {props?.data?.isLoading ? (
        <>
          <div className={` hidden md:flex items-center`}>
            <Shimmer visible />
          </div>
        </>
      ) : (
        HEADER_OPTIONS.map((data) => (
          <div className="zoom-9" key={data.id}>
          <HeaderOption
            
            oid={props?.data?.data.userDetailsId}
            isAuthorizedProfile={data.hasAvatar}
            hidden={data.hidden}
            avatar={props?.data?.data?.profilePicName}
            title={data.title}
            Icon={data.icon}
            name={formattedName(
              props?.data?.data?.firstName,
              props?.data?.data?.lastName
            )}
            tooltip={data.tooltip}
            redirectTo={data.redirectTo}
            phoneMenu
            errorOnRedirect={handleErrorOnRedirect}
          />
          </div>
        ))
      )}
    </div>
  );
}

export default PhoneMenu;
