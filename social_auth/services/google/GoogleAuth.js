import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { JWT } from "../../../jwt/auth/JWT";
import { useRouter } from "next/router";
import {
  setLocalStorageObject,
  getLocalStorageObject,
} from "../../../localStorage/local-storage";
import { AuthService } from "../../../pages/api/users/auth/AuthService";
import IPService from "../../../pages/api/ipdata/IPService";
import LoginService from "../../../pages/api/users/auth/LoginService";
import { LOGIN_SOURCE } from "../../../constants/constants";
import { handleResponse } from "../../../toastr-response-handler/handler";
import { LOGIN_ERRORS } from "../../../constants/error-messages";
import { RESPONSE_TYPES } from "../../../constants/constants";
const clientId = process.env.NEXT_PUBLIC_GOOGLE_ID;

function GoogleAuth() {
  const router = useRouter();
  const [loginBtnClicked, setLoginBtnClicked]= useState(false)
  const onSuccess = (res) => {
    console.log(res,clientId)
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
          AuthService.setAuthorization(LOGIN_SOURCE.GOOGLE, res);
          console.log("Login Success: currentUser:", res);
          console.log(response);
          setLoginBtnClicked(false)
          // need to call the endpoint and redirect to dashboard.
          //router.push(`/hello`)
        })
        .catch((err) => {
          setLoginBtnClicked(false)
          handleResponse(LOGIN_ERRORS.SOCIAL.GOOGLE.LOGIN_FAILED, RESPONSE_TYPES.ERROR);
          AuthService.logout();
        });
    } else {
      console.log("Already logged in user: currentUser:", res);
      console.log(getLocalStorageObject("uvsity-ipData"));
    }
  };
  useEffect(async () => {
    if (!getLocalStorageObject("uvsity-ipData")) {
      await new IPService()
        .getIPData()
        .then((response) => {
          setLocalStorageObject("uvsity-ipData", response.data);
        })
        .catch(() => {
          const ipDummyData = new IPService().getFakeIPData();
          setLocalStorageObject("uvsity-ipData", ipDummyData);
        });
    }
  });
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
