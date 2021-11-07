import React, { useState, useEffect } from "react";
import HeaderStyle from "../../styles/Header.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreAuthSignUpMessageBar from "./PreAuthSignUpMessageBar";
import GoogleAuth from "../../social_auth/services/google/GoogleAuth";
import Header from "../Authorized/Shared/Header";
toast.configure();
function Nav({isAuthorized}) {
  const [show, handleShow] = useState(false);
  const [isPreAuthMessagePanelClosed, preAuthMessagePanelClosed] =
    useState(false);
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
  if(isAuthorized){
    return (<Header/>)
  }
  return (
    <div>
      
      {!isAuthorized && (<PreAuthSignUpMessageBar
        isPreAuthMessagePanelClosed={preAuthMessagePanelClosed}
      />)}
      <div
        className={`${HeaderStyle.nav} ${show && HeaderStyle.nav__black} ${
          (isPreAuthMessagePanelClosed || isAuthorized) && HeaderStyle.nav__original
        }`}
      >
        <div className={HeaderStyle.nav__contents}>
          <img
            className={`${HeaderStyle.nav__logo} ${
              (isPreAuthMessagePanelClosed || isAuthorized) && HeaderStyle.nav__logo__original
            }`}
            src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE}
            alt="uvsity-Logo"
          />
          <a href="#aboutus">
            <button className={HeaderStyle.nav__button__sm}>About us</button>
          </a>
          {/* <img onClick={(e) => history.push("profile")} className={HeaderStyle.nav__avatar} src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                    alt="uvsity-User-Avatar" /> */}
          {!isAuthorized && (<GoogleAuth/>)}
         
        </div>
      </div>
    </div>
  );
}

export default Nav;
