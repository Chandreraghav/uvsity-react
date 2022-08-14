import asyncInstance from "../../../async/axios";
import { ENDPOINTS } from "../../../async/endpoints";

export default class CommonSearchService {
  constructor() {}
  static async searchUserType(keyword) {
    if (!keyword) return null;
    return await asyncInstance.get(
      ENDPOINTS.SEARCH.COMMON.DATA.USERTYPE + keyword
    );
  }
  static async searchEduIns(keyword) {
    if (!keyword) return null;
    return await asyncInstance.get(
      ENDPOINTS.SEARCH.COMMON.DATA.EDUINS + keyword
    );
  }

  static async searchSessions(keyword) {
    if (!keyword) return null;
    return await asyncInstance.get(
      ENDPOINTS.SEARCH.COMMON.DATA.COURSES + keyword
    );
  }
}
