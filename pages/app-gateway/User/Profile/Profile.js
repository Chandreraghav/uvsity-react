import React, { useEffect, useState } from "react";
import MacroProfile from "../../../../components/Authorized/Profile/MacroProfile";
import ProfileStyle from "../../../../styles/Profile.module.css";
import {
  formattedName,
  formattedProfileSubtitle,
} from "../../../../utils/utility";

function Profile(props) {
  const [show, handleShow] = useState(false);
  const [callSessionsByUserLazyAPI, setSessionsByAPI] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
      setSessionsByAPI(false);
    };
  }, []);
  const transitionNavBar = () => {
    if (window.scrollY > 150) {
      handleShow(true);
    } else {
      handleShow(false);
    }

    if (window.scrollY > 200) {
      setSessionsByAPI(true);
    }
  };
  const handleChangeEvent = (event) => {
    if (props.changeEvent) {
      props.changeEvent(event);
    }
  };
  const userType = props?.userdata?.userType;
  const eduIns = props?.userdata?.eduIns;
  const profileSecondaryLine = formattedProfileSubtitle(userType, eduIns);
  return (
    <div className=" min-h-screen">
      {props?.userdata && (
        <>
          {/* Top Fixed Header */}
          <div
            className={` lg:w-3/4 xl:w-3/4 w-full xs:w-full ${ProfileStyle.profile__macro__top__fixed__header} ${
              show ? ProfileStyle.profile__macro__header__show : "hidden"
            }`}
          >
            <div className="flex-col">
              <div>
                {formattedName(
                  props?.userdata?.firstName,
                  props?.userdata?.lastName
                )}
              </div>
              {profileSecondaryLine && (
                <>
                  <div className="-mt-1.5 text-sm text-gray-400 font-light line-clamp-1">
                    <small>{profileSecondaryLine}</small>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}

      <div
        className="  p-2
    grid items-stretch grid-cols-12  
    gap-2 px-2 mx-auto xl:container md:gap-4 
    xl:grid-cols-8 2xl:px-5 "
      >
        <div className="   col-span-12 md:pt-2">
          {/* Main Content */}
          <MacroProfile
            loggedInUserID={props?.loggedInUser?.userDetailsId}
            hasChangeEventTriggered={props?.hasChangeEventTriggered}
            changeEvent={handleChangeEvent}
            lazyAPI={callSessionsByUserLazyAPI}
            data={props}
          />
        </div>

       
         
      </div>
    </div>
  );
}

export default Profile;
