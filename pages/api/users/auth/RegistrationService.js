import asyncInstance from "../../../../async/axios";
import { ENDPOINTS } from "../../../../async/endpoints";
import { JWT } from "../../../../jwt/auth/JWT";
export default class RegistrationService {
  constructor() {}
  async register(userdata) {
    return await asyncInstance.post(ENDPOINTS.REGISTRATION.SIGN_UP, userdata, 
    JWT.signupJwt()
    );
  }
}
