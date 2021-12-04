import {
  getLocalStorageObject,
  setLocalStorageObject,
  removeLocalStorageObject,
} from "../../../../localStorage/local-storage";
import { LOGIN_SOURCE } from "../../../../constants/constants";
import { ENDPOINTS } from "../../../../async/endpoints";
import { v4 as uuidv4 } from "uuid";
import { JWT } from "../../../../jwt/auth/JWT";

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
    setLocalStorageObject("uvsity-loggedIn", "true");
    if (source === LOGIN_SOURCE.GOOGLE) {
      JWT.refreshGoogleJWT(authData);
      setLocalStorageObject("uvsity-loggedInSource", LOGIN_SOURCE.GOOGLE);
      setLocalStorageObject("uvsity-googleToken", authData.tokenId);
    } else {
      setLocalStorageObject("uvsity-loggedInSource", LOGIN_SOURCE.UVSITY);
      setLocalStorageObject("uvsity-siteToken", uuidv4());
    }
  }

  static isUserLoggedIn() {
    try {
      return JSON.parse(getLocalStorageObject("uvsity-loggedIn"));
    } catch (error) {
      return false;
    }
  }

  static logout() {
    try {
      removeLocalStorageObject("uvsity-user");
      removeLocalStorageObject("uvsity-siteToken");
      removeLocalStorageObject("uvsity-googleToken");
      removeLocalStorageObject("uvsity-authToken");
      removeLocalStorageObject("uvsity-loggedIn");
      removeLocalStorageObject("uvsity-loggedInSource");
      // we do not clear ip data on logout because of its global nature.
    } catch (error) {}
  }
}
