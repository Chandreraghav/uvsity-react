import {
  getLocalStorageObject,
  setLocalStorageObject,
  removeLocalStorageObject,
} from "../../../../localStorage/local-storage";
import { LOGIN_SOURCE } from "../../../../constants/constants";
import { ENDPOINTS } from "../../../../async/endpoints";
import { uuid } from "uuidv4";
import { JWT } from "../../../../jwt/auth/JWT";
export class AuthService {
  static getCurrentUser() {
    return getLocalStorageObject("uvsity-user");
  }

  static getCurrentAccessToken() {
    try {
      return JSON.parse(getCurrentUser()).accessToken;
    } catch (error) {
      return null;
    }
  }
  static getSocialLoginSourceEndpoint(source) {
    if (!source) return null;
    if (source === LOGIN_SOURCE.GOOGLE) {
      const googleIdToken = JSON.parse(getLocalStorageObject("uvsity-googleToken"));
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

  static setAuthorization(source, authData) {
    setLocalStorageObject("uvsity-user", authData);
    setLocalStorageObject("uvsity-loggedIn", "true");
    if (source === LOGIN_SOURCE.GOOGLE) {
      JWT.refreshGoogleJWT(authData);
      setLocalStorageObject("uvsity-loggedInSource", LOGIN_SOURCE.GOOGLE);
      setLocalStorageObject("uvsity-googleToken", authData.tokenId);
    } else {
      setLocalStorageObject("uvsity-loggedInSource", LOGIN_SOURCE.UVSITY);
      setLocalStorageObject("uvsity-siteToken", uuid());
    }
  }

  static logout() {
    try {
      if (
        getLocalStorageObject("uvsity-loggedInSource") === LOGIN_SOURCE.GOOGLE
      )
        removeLocalStorageObject("uvsity-googleToken");
      else removeLocalStorageObject("uvsity-siteToken");
      removeLocalStorageObject("uvsity-authToken");
      removeLocalStorageObject("uvsity-user");
      removeLocalStorageObject("uvsity-loggedIn");
      removeLocalStorageObject("uvsity-loggedInSource");
    } catch (error) {}
  }
}
