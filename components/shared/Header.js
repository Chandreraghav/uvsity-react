import React, { useState, useEffect } from "react";
import HeaderStyle from "../../styles/Header.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreAuthSignUpMessageBar from "./PreAuthSignUpMessageBar";
toast.configure();
function Nav({isAuthorized,setSignInDialogOpen}) {
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
        <div className={`flex`}>
          <img
            className={`${HeaderStyle.nav__logo} ${
              (isPreAuthMessagePanelClosed || isAuthorized) && HeaderStyle.nav__logo__original
            }`}
            src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE}
            alt="uvsity-Logo"
          />
          <div className="ml-auto flex gap-4">
          <a href="#aboutus">
            <button className={` ${HeaderStyle.nav__button__sm}`}>About us</button>
          </a>
          {!isAuthorized && (<button onClick={(e) => setSignInDialogOpen()} className={` ${HeaderStyle.nav__button__sm}`}>Login</button>)}
         
          </div>
          
          
        </div>
      </div>
    </div>
  );
}

export default Nav;
