import React, { useState } from "react";
import { HEADER_OPTIONS } from "../../../../constants/userdata";
import { useDataLayerContextValue } from "../../../../context/DataLayer";
import ThemeSwitcher from "../../../../theme/Theme";
import { formattedName } from "../../../../utils/utility";
import HeaderOption from "../HeaderOption";

function PhoneMenu(props) {
    
  const [ctxUserdata] = useDataLayerContextValue();
  const [userdata, setUserData] = useState(ctxUserdata?.userdata);

  const handleErrorOnRedirect = (obj) => {
    if (props.onHeaderNavigationError) {
      props.onHeaderNavigationError(obj);
    }
  };
 
  return (
    <div className=" max-h-10  dark:bg-gray-dark bg-gray-100 border-t-1  flex md:hidden  mt-auto clear-both bottom-0 left-0 z-50 text-center justify-center items-center  
    p-4 w-screen    fixed">

      {HEADER_OPTIONS.map((data) => (
        <div className="zoom-9" key={data.id}>
          <HeaderOption
            id={data.id}
            oid={userdata?.userDetailsId}
            isAuthorizedProfile={data.hasAvatar}
            hidden={data.hidden}
            avatar={userdata?.profilePicName}
            title={data.title}
            Icon={data.icon}
            name={formattedName(
              userdata?.firstName,
              userdata?.lastName
            )}
            tooltip={data.tooltip}
            redirectTo={data.redirectTo}
            phoneMenu
            errorOnRedirect={handleErrorOnRedirect}
             
          />
        </div>
      ))}

      <div className="-mt-3 ml-2"><ThemeSwitcher /></div>
       
    </div>
  );
}

export default PhoneMenu;
