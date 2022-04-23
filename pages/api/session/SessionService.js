import asyncInstance from "../../../async/axios";
import { ENDPOINTS } from "../../../async/endpoints";
export default class SessionService {
  constructor() {}
  static async getPopularSessions() {
    return await asyncInstance.get(ENDPOINTS.TOP_COURSES);
  }

  static async isSessionCreationAllowed(payload) {
    return await asyncInstance.post(ENDPOINTS.USER.SESSION_IS_ALLOWED, payload);
  }

  static async create(payload) {
    return await asyncInstance.post(ENDPOINTS.USER.CREATE_SESSION, payload);
  }
  static async uploadImage(payload) {
    return await asyncInstance.post(
      ENDPOINTS.USER.UPLOADS.SESSION.CREATE.IMAGE,
      payload,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
  }

  static async uploadDoc(payload) {
    return await asyncInstance.post(
      ENDPOINTS.USER.UPLOADS.SESSION.CREATE.DOC,
      payload,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
  }
  static async getSessionsByUserID(id) {
    let endpoint = ENDPOINTS.USER.SESSION_BY_USER;
    endpoint = endpoint.replace("#X#", id);
    return await asyncInstance.get(endpoint);
  }
}
