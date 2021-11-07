import { setLocalStorageObject,getLocalStorageObject } from "../../localStorage/local-storage";
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
    let user = getLocalStorageObject('user')|| localStorage.user
    user = JSON.parse(user)
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return null;
    }
  }

  static refreshGoogleJWT(res) {
    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      console.log("newAuthRes:", newAuthRes);
      localStorage.setItem("uvsity-authToken", newAuthRes.id_token);
      setLocalStorageObject("uvsity-authToken", newAuthRes.id_token)
      // Setup the other timer after the first one
      if(getLocalStorageObject('uvsity-user'))
      setTimeout(refreshToken, refreshTiming);
    };

    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
  }
}
