import asyncInstance, { blankPromise } from "../../../async/axios";
import { ENDPOINTS } from "../../../async/endpoints";
import { AUTHORIZED_ROUTES } from "../../../constants";
export default class SessionService {
  constructor() { }
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

  static async getSessionsByType(session_type, filters = false) {
    if (filters === true) {
      if (session_type === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ONLINE_SESSIONS)
        return await this.getFilteredDataSetForOnlineSession();

      return await blankPromise();
    }
    if (session_type === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.ONLINE_SESSIONS) {
      return await this.getOnlineSessions();
    }
    if (session_type === AUTHORIZED_ROUTES.AUTHORIZED.UTRN.OWN_SESSIONS) {
      return this.getLoggedInUserOwnSessions()
    }
    else {
      return await this.getLoggedInUserEnrolledSessions()
    }

  }

  static async getOnlineSessions() {
    return await asyncInstance.get(ENDPOINTS.SESSION.ONLINE);
  }

  static async getLoggedInUserEnrolledSessions() {
    return await asyncInstance.post(ENDPOINTS.USER.ENROLLED_SESSION, {});

  }

  static async getLoggedInUserOwnSessions() {
    return await asyncInstance.get(ENDPOINTS.USER.OWN_SESSIONS);
  }

  static async getFilteredDataSetForOnlineSession() {
    return await asyncInstance.get(ENDPOINTS.SESSION.FILTERS);
  }

  static async sendSessionRatingAndReview(payload) {
    return await asyncInstance.post(ENDPOINTS.SESSION.REVIEWS, payload);
  }
}
