import asyncInstance from "../../../../async/axios";
import { ENDPOINTS } from "../../../../async/endpoints";
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
