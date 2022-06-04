import {
  getLocalStorageObject,
  setLocalStorageObject,
  removeLocalStorageObject,
} from "../../../../localStorage/local-storage";
import { LOGIN_SOURCE } from "../../../../constants/constants";
import { ENDPOINTS } from "../../../../async/endpoints";
import { v4 as uuidv4 } from "uuid";
import { JWT } from "../../../../jwt/auth/JWT";
import { AuthGuardService } from "../../../../auth-guard/service/AuthGuardService";
import jwt_decode from "jwt-decode";
export class AuthService {
  static getCurrentUser() {
    return getLocalStorageObject("uvsity-user");
  }

  static getCurrentUserObject() {
    let object = [];
    object.push({ USER: JSON.parse(getLocalStorageObject("uvsity-user")) });
    object.push({
      GOOGLE_TOKEN: JSON.parse(getLocalStorageObject("uvsity-googleToken")),
    });
    object.push({
      UVSITY_TOKEN: JSON.parse(getLocalStorageObject("uvsity-siteToken")),
    });
    object.push({
      AUTH_TOKEN: JSON.parse(getLocalStorageObject("uvsity-authToken")),
    });
    object.push({
      LOGGED_IN: JSON.parse(getLocalStorageObject("uvsity-loggedIn")),
    });
    object.push({
      LOGIN_SOURCE: JSON.parse(getLocalStorageObject("uvsity-loggedInSource")),
    });
    return object;
  }

  static getCurrentAccessToken() {
    try {
      return JSON.parse(getCurrentUser()).accessToken;
    } catch (error) {
      return null;
    }
  }
  static getAuthToken() {
    return JWT.getJWTToken();
  }
  static getSocialLoginSourceEndpoint(source) {
    if (!source) return null;
    if (source === LOGIN_SOURCE.GOOGLE) {
      const googleIdToken = JSON.parse(
        getLocalStorageObject("uvsity-googleToken")
      );
      const ipData = JSON.parse(getLocalStorageObject("uvsity-ipData"));
      const userRegistrationTimezone = ipData.time_zone.name;
      const userLoggedInIPAddress = ipData.ip;
      return (
        ENDPOINTS.LOGIN.SOCIAL_SIGN_IN.GOOGLE +
        "?googleIdToken=" +
        googleIdToken +
        "&userRegistrationTimezone=" +
        userRegistrationTimezone +
        "&userLoggedInIPAddress=" +
        userLoggedInIPAddress
      );
    }

    return null;
  }

  /**
   * Method which authorizes the user to log in to the app, this method is called at the end of a succesful login and registration.
   * @param {*} source
   * @param {*} authData
   */
  static setAuthorization(source, authData) {
    setLocalStorageObject("uvsity-user", authData);
    const jwt= (authData?.data?.split(" ")[1])
    const decoded = jwt_decode(jwt);
    if(decoded){
      setLocalStorageObject("uvsity-user-definition", decoded);
    }
    setLocalStorageObject("uvsity-loggedIn", "true");
    if (source === LOGIN_SOURCE.GOOGLE) {
      setLocalStorageObject("uvsity-loggedInSource", LOGIN_SOURCE.GOOGLE);
      setLocalStorageObject("uvsity-googleToken", authData.tokenId);
    } else {
      setLocalStorageObject("uvsity-loggedInSource", LOGIN_SOURCE.UVSITY);
      setLocalStorageObject("uvsity-siteToken", uuidv4());
    }
  }

  static isUserLoggedIn(preAuthFlag) {
    try {
      const user = JSON.parse(getLocalStorageObject("uvsity-user"));
      if (preAuthFlag) {
        if (user && user.data) return true;
        return false;
      }
      if (!user || !user.data) return false;
      // if user data is found verify the truthyness from server.
      let auth = new Promise((resolve, reject) => {
        AuthGuardService.pollSessionValidity()
          .then((data) => {
            if (data.status === 200) resolve(true);
            else resolve(false);
          })
          .catch(() => {
            resolve(false);
          });
      });
      auth.then((loggedIn) => {
        if (loggedIn === true) return true;
        AuthService.logout();
        return false;
      });
    } catch (error) {
      AuthService.logout();
      return false;
    }
  }
  static isGoogleLoggedIn() {
    try {
      return (
        JSON.parse(getLocalStorageObject("uvsity-loggedInSource")) ===
        LOGIN_SOURCE.GOOGLE
      );
    } catch (error) {
      return false;
    }
  }

  static logout() {
    try {
      if (this.isGoogleLoggedIn()) {
        this.googleLogout();
      }
      removeLocalStorageObject("uvsity-user");
      removeLocalStorageObject("uvsity-siteToken");
      removeLocalStorageObject("uvsity-googleToken");
      removeLocalStorageObject("uvsity-authToken");
      removeLocalStorageObject("uvsity-loggedIn");
      removeLocalStorageObject("uvsity-loggedInSource");
      removeLocalStorageObject("uvsity-unauthorized-response")
      removeLocalStorageObject('uvsity-internal-error-response')
      removeLocalStorageObject('uvsity-user-definition')
      this.cancelAppLayerSubscriptions(true);

      // we do not clear ip data on logout because of its global nature.
    } catch (error) {}
  }

  static cancelAppLayerSubscriptions(cancelSessionPolling) {
    if (cancelSessionPolling) {
      if (
        window.sessionValidityPoller != undefined &&
        window.sessionValidityPoller != "undefined"
      ) {
        window.clearInterval(window.sessionValidityPoller);
      }
    }
    if (
      window.introTextSwapperInterval != undefined &&
      window.introTextSwapperInterval != "undefined"
    ) {
      window.clearInterval(window.introTextSwapperInterval);
    }
    if (
      window.bannerSwapperInterval != undefined &&
      window.bannerSwapperInterval != "undefined"
    ) {
      window.clearInterval(window.bannerSwapperInterval);
    }
  }

  static googleSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    setLocalStorageObject("uvsity-googleToken", id_token);
  }

  static googleLogout() {
    var token = gapi.auth.getToken();
    var auth2 = gapi.auth2.getAuthInstance();
    if (token) {
      auth2.signOut().then(function () {});
    }
  }

  static setUnauthorizedResponseFromServer(unauthorizedResponse){
    setLocalStorageObject("uvsity-unauthorized-response", unauthorizedResponse);
  }

  static setInternalServerError(errorResponse){
    setLocalStorageObject("uvsity-internal-error-response", errorResponse);
  }
}
