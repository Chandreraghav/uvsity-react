import React, { useState, useEffect } from "react";
import NavStyle from "../../styles/Nav.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import PreAuthSignUpMessageBar from "./PreAuthSignUpMessageBar";
toast.configure();
function Nav() {
  let history = useHistory();
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
      <PreAuthSignUpMessageBar
        isPreAuthMessagePanelClosed={preAuthMessagePanelClosed}
      />
      <div
        className={`${NavStyle.nav} ${show && NavStyle.nav__black} ${
          isPreAuthMessagePanelClosed && NavStyle.nav__original
        }`}
      >
        <div className={NavStyle.nav__contents}>
          <img
            onClick={(e) => history.push("/")}
            className={`${NavStyle.nav__logo} ${
              isPreAuthMessagePanelClosed && NavStyle.nav__logo__original
            }`}
            src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE}
            alt="uvsity-Logo"
          />
          <a href="#knowmore">
            <button className={NavStyle.nav__button__sm}>How it works</button>
          </a>
          {/* <img onClick={(e) => history.push("profile")} className={NavStyle.nav__avatar} src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                    alt="uvsity-User-Avatar" /> */}
          <img
            onClick={(e) => history.push("profile")}
            className={NavStyle.nav__continue__with__google}
            src="/static/images/sign_in_with_google.png"
            alt="uvsity-User-Avatar"
          />
        </div>
      </div>
    </div>
  );
}

export default Nav;
