import asyncInstance from "../../../../async/axios";
import { ENDPOINTS } from "../../../../async/endpoints";
import { JWT } from "../../../../jwt/auth/JWT";
import { AuthService } from "./AuthService";
export default class LoginService {
  constructor() {}
  async login(email, password) {
    return await asyncInstance.get(
      ENDPOINTS.LOGIN.SIGN_IN + "?emailId=" + email + "&password=" + password,
      {}
    );
  }

  async socialLogin(loginSource) {
    if (!loginSource) return null;
    return await asyncInstance.post(
      AuthService.getSocialLoginSourceEndpoint(loginSource), {}, JWT.preAuthJWT()
    );
  }
}
