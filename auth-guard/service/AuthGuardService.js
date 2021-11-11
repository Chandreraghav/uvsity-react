import { AuthService } from "../../pages/api/users/auth/AuthService";
import SessionValidityService from "../../pages/api/users/session/SessionValidityService";

export class AuthGuardService extends AuthService {
  
  static isVerifiedLogin() {
   return AuthService.isUserLoggedIn()
      ? true
      : false
  }

 static async pollSessionValidity(){
   return await new SessionValidityService.getSessionValidity()
  }
}
