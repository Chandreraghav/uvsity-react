import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthService } from "../../../pages/api/users/auth/AuthService";
import LoginService from "../../../pages/api/users/auth/LoginService";
import { LOGIN_SOURCE } from "../../../constants/constants";
import { handleResponse } from "../../../toastr-response-handler/handler";
import { LOGIN_ERRORS } from "../../../constants/error-messages";
import { AUTHORIZED_ROUTES } from "../../../constants/routes";
import { RESPONSE_TYPES } from "../../../constants/constants";
import { AuthGuardService } from "../../../auth-guard/service/AuthGuardService";
import { useDataLayerContextValue } from "../../../context/DataLayer";
import { actionTypes } from "../../../context/reducer";
import { getWorkflowError } from "../../../error-handler/handler";
import { toast } from "react-toastify";
import Overlay from "../../../components/shared/Overlay";
toast.configure();

function GoogleAuth() {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);
  const [{}, authorize] = useDataLayerContextValue();

  useEffect(() => {
    gapi.signin2.render("g-signin2", {
      scope: "https://www.googleapis.com/auth/plus.login",
      width: 100,
      height: 30,
      longtitle: false,
      theme: "dark",
      onsuccess: onSignIn,
      onfailure: onError,
    });
  }, []);

  const handleSignIn = (token) => {
    if (!AuthService.isUserLoggedIn(true) && !AuthService.isGoogleLoggedIn()) {
      setShowOverlay(true);
      new LoginService()
        .socialLogin(LOGIN_SOURCE.GOOGLE)
        .then((response) => {
          authorize({
            type: actionTypes.SET_USER,
            user: response, //bearer token response
          });
          AuthService.setAuthorization(LOGIN_SOURCE.GOOGLE, response);
          if(AuthGuardService.isVerifiedLogin(true)){
            setShowOverlay(false)
            router.push(AUTHORIZED_ROUTES.AUTHORIZED.DASHBOARD)
          }
          else {
            handleResponse(
              getWorkflowError(LOGIN_ERRORS.SOCIAL.GOOGLE.LOGIN_FAILED),
              RESPONSE_TYPES.ERROR,
              toast.POSITION.BOTTOM_CENTER
            );
          }
         
        })
        .catch(() => {
          handleResponse(
            LOGIN_ERRORS.SOCIAL.GOOGLE.LOGIN_FAILED,
            RESPONSE_TYPES.ERROR
          );
          authorize({
            type: actionTypes.SET_USER,
            user: null,
          });
          setShowOverlay(false);
          AuthService.logout();
        });
    } else {
      setShowOverlay(false);
      // do nothing
      router.push(AUTHORIZED_ROUTES.AUTHORIZED.DASHBOARD)
    }
  };

  function onError(data) {
    handleResponse(
      LOGIN_ERRORS.SOCIAL.GOOGLE.LOGIN_FAILED,
      RESPONSE_TYPES.ERROR
    );
    authorize({
      type: actionTypes.SET_USER,
      user: null,
    });
    AuthService.logout();
  }

  function onSignIn(googleUser) {
    AuthService.googleSignIn(googleUser);
    handleSignIn();
  }

  return (<><div id="g-signin2" data-onsuccess="onSignIn"></div><Overlay message='Authenticating..' open={showOverlay}/></>);
}

export default GoogleAuth;
