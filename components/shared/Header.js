/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import HeaderStyle from "../../styles/Header.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreAuthSignUpMessageBar from "./PreAuthSignUpMessageBar";
import { AuthService } from "../../pages/api/users/auth/AuthService";
import ThemeSwitcher from "../../theme/theme";
toast.configure();
function Nav({ setSignInDialogOpen }) {
  const [show, handleShow] = useState(false);
  const [isPreAuthMessagePanelClosed, preAuthMessagePanelClosed] =
    useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(AuthService.isUserLoggedIn());
  }, []);
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
      {!loggedIn && (
        <PreAuthSignUpMessageBar
          isPreAuthMessagePanelClosed={preAuthMessagePanelClosed}
        />
      )}
      <div
        className={`${HeaderStyle.nav} ${
          show &&
          `  text-gray-100 bg-gray-950  dark:text-gray-dark dark:bg-yellow-100 dark:opacity-90`
        } ${
          (isPreAuthMessagePanelClosed || loggedIn) && HeaderStyle.nav__original
        }`}
      >
        <div className={`flex`}>
          <img
            className={`${HeaderStyle.nav__logo} ${
              (isPreAuthMessagePanelClosed || loggedIn) &&
              HeaderStyle.nav__logo__original
            }`}
            src={process.env.NEXT_PUBLIC_APP_LOGO_IMAGE}
            alt="uvsity-Logo"
          />
          <div className="ml-auto flex gap-4">
           
            <ThemeSwitcher/>

            <a href="#aboutus">
              <button className={` ${HeaderStyle.nav__button__sm}`}>
                About us
              </button>
            </a>
            {!loggedIn && (
              <button
                onClick={(e) => setSignInDialogOpen()}
                className={` ${HeaderStyle.nav__button__sm}`}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
