import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useRouter } from "next/router";
import {
  setLocalStorageObject,
  getLocalStorageObject,
} from "../../../localStorage/local-storage";
import { AuthService } from "../../../pages/api/users/auth/AuthService";
import LoginService from "../../../pages/api/users/auth/LoginService";
import { LOGIN_SOURCE } from "../../../constants/constants";
import { handleResponse } from "../../../toastr-response-handler/handler";
import { LOGIN_ERRORS } from "../../../constants/error-messages";
import {AUTHORIZED_ROUTES} from "../../../constants/routes";
import { RESPONSE_TYPES } from "../../../constants/constants";
import { AuthGuardService } from "../../../auth-guard/service/AuthGuardService";
import { useDataLayerContextValue } from '../../../context/DataLayer'
import { actionTypes } from "../../../context/reducer";
const clientId = process.env.NEXT_PUBLIC_GOOGLE_ID;

function GoogleAuth() {
  const router = useRouter();
  const [{}, authorize] = useDataLayerContextValue();
  const [loginBtnClicked, setLoginBtnClicked]= useState(false)
  const onSuccess = (res) => {
    const currentAccessToken = AuthService.getCurrentAccessToken();
    if (
      res.accessToken &&
      (currentAccessToken !== res.accessToken || !currentAccessToken) &&
      !JSON.parse(getLocalStorageObject("uvsity-loggedIn")) && loginBtnClicked
    ) {
      setLocalStorageObject("uvsity-googleToken", res.tokenId);
      new LoginService()
        .socialLogin(LOGIN_SOURCE.GOOGLE)
        .then((response) => {
          setLoginBtnClicked(false)
          authorize({
            type: actionTypes.SET_USER,
            user: response, //bearer token response
          });
          AuthService.setAuthorization(LOGIN_SOURCE.GOOGLE, res);
          AuthGuardService.isVerifiedLogin()?router.push(AUTHORIZED_ROUTES.AUTHORIZED.DASHBOARD):
          handleResponse(
            getWorkflowError(LOGIN_ERRORS.SOCIAL.GOOGLE.LOGIN_FAILED),
            RESPONSE_TYPES.ERROR,
            toast.POSITION.BOTTOM_CENTER
          );
        })
        .catch((err) => {
          setLoginBtnClicked(false)
          handleResponse(LOGIN_ERRORS.SOCIAL.GOOGLE.LOGIN_FAILED, RESPONSE_TYPES.ERROR);
          authorize({
            type: actionTypes.SET_USER,
            user: null,
          });
          AuthService.logout();
        });
    } else {
      console.log("Already logged in user: currentUser:", res);
    }
  };
  
  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    handleResponse(LOGIN_ERRORS.SOCIAL.GOOGLE.LOGIN_FAILED, "error");
    AuthService.logout();
  };
  const initiateGoogleLogin = (renderProps) => {
    setLoginBtnClicked(true)
    return renderProps.onClick;
  };
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        render={(renderProps) => (
          <button
            onClick={initiateGoogleLogin(renderProps)}
            disabled={renderProps.disabled}
          >
            <img
              alt="google-login"
              src={process.env.NEXT_PUBLIC_APP_CONTINUE_WITH_GOOGLE_IMAGE}
            />
          </button>
        )}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={false}
      />
    </div>
  );
}

export default GoogleAuth;
