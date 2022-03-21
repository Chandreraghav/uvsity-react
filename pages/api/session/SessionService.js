import asyncInstance from "../../../async/axios";
import { ENDPOINTS } from "../../../async/endpoints";
export default class SessionService {
  constructor() {}
  static async getPopularSessions() {
    return await asyncInstance.get(ENDPOINTS.TOP_COURSES);
  }

  static async isSessionCreationAllowed(payload) {
    return await asyncInstance.post(
      ENDPOINTS.USER.SESSION_IS_ALLOWED,
      payload
    );
  }


}
