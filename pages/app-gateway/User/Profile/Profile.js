import React, { useEffect, useState } from "react";
import MacroProfile from "../../../../components/Authorized/Profile/MacroProfile";
import Spacer from "../../../../components/shared/Spacer";
import ProfileStyle from "../../../../styles/Profile.module.css";

function Profile(props) {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);
  const transitionNavBar = () => {
    if (window.scrollY > 50) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  return (
    <>
      {props?.userdata && (
        <>
          {/* Top Fixed Header */}
          <div
            className={`${ProfileStyle.profile__macro__top__fixed__header} ${
              show ? ProfileStyle.profile__macro__header__show : "hidden"
            }`}
          >
            MacroProfile Header
          </div>
        </>
      )}

      <div
        className=" bg-white p-2
    grid items-stretch grid-cols-12  
    gap-2 px-2 mx-auto xl:container md:gap-4 
    xl:grid-cols-8 2xl:px-5 "
      >
        <div className=" col-span-12 md:pt-2 md:col-span-8 lg:col-span-8 xl:col-span-6">
          {/* Main Content */}
          <MacroProfile data={props} />
        </div>

        <div className=" col-span-12 md:col-span-2 lg:col-span-2 py-2 xl:col-span-2">
          {/* Any misc content on user profile such as ads, people you may know */}
          Misc
        </div>
        <Spacer count={6} />
      </div>
    </>
  );
}

export default Profile;
