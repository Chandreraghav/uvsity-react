import asyncInstance from "../../../../async/axios";
import { ENDPOINTS } from "../../../../async/endpoints";
import { JWT } from "../../../../jwt/auth/JWT";
export default class SignOutService {
  constructor() {}
  static async signout() {
    const userdata={}
    return await asyncInstance.post(
      ENDPOINTS.USER.SIGN_OUT,
      userdata
      
    );
  }
}
