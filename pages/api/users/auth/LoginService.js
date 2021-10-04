import asyncInstance from "../../../../async/axios";
import { ENDPOINTS } from "../../../../async/endpoints";
export default class LoginService {
  constructor() {}
  async login(email, password) {
    return await asyncInstance.get(
      ENDPOINTS.LOGIN.SIGN_IN + "?emailId=" + email + "&password=" + password,
      {}
    );
  }
}
