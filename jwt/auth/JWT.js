import {
  setLocalStorageObject,
  getLocalStorageObject,
} from "../../localStorage/local-storage";
export class JWT {
  /**
   *
   * @returns Auth header pre login
   */
  static preAuthJWT() {
    return {
      headers: {
        "content-type": "application/json",
      },
    };
  }
  /**
   * Auth header for post login  service calls
   * @returns
   */
  static authHeader() {
    try {
      let user = JSON.parse(getLocalStorageObject("uvsity-user"));
      if (user) {
        return { Authorization: user.data };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  static getJWTToken() {
    try {
      let user = JSON.parse(getLocalStorageObject("uvsity-user"));
      if (user)
        return user.data;
    } catch (error) {}
    return null;
  }

  static refreshGoogleJWT(res) {
    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      console.log("newAuthRes:", newAuthRes);
      localStorage.setItem("uvsity-authToken", newAuthRes.id_token);
      setLocalStorageObject("uvsity-authToken", newAuthRes.id_token);
      // Setup the other timer after the first one
      if (getLocalStorageObject("uvsity-user"))
        setTimeout(refreshToken, refreshTiming);
    };

    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
  }
}
