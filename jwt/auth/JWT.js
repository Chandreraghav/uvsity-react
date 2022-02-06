import { AuthGuardService } from "../../auth-guard/service/AuthGuardService";
import { LOGIN_SOURCE } from "../../constants/constants";
import {
  setLocalStorageObject,
  getLocalStorageObject,
} from "../../localStorage/local-storage";
import LoginService from "../../pages/api/users/auth/LoginService";
export class JWT {
  static sessionExpiry = (3600 - 5 * 60) * 1000
  /**
   *
   * @returns Auth header pre login
   */
  static preAuthJWT() {
    return {
      headers:{
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
        if(user.data){
          return { Authorization: user.data}
        }
        if(AuthGuardService.isGoogleLoggedIn()){
          const token =JSON.parse(getLocalStorageObject("uvsity-googleToken"))
          if(token){
            return { Authorization:`Bearer ${token}`}
          }
        }
         
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

  /**
   * @deprecated
   */
  static refreshGoogleJWT() {
    // Timing to renew access token
   
    let refreshTiming = JWT.sessionExpiry;
    const refreshToken = async () => {
      const newAuthRes =  await new LoginService().socialLogin(LOGIN_SOURCE.GOOGLE);
      refreshTiming =  JWT.sessionExpiry;
      setLocalStorageObject("uvsity-googleToken", newAuthRes.tokenId);
      // Setup the other recurrent timer after the first one
      if (getLocalStorageObject("uvsity-user"))
        setTimeout(refreshToken, refreshTiming);
    };

    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
  
  }
}
