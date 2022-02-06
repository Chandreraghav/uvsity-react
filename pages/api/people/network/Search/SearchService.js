import asyncInstance from "../../../../../async/axios";
import { ENDPOINTS } from "../../../../../async/endpoints";

export default class SearchService {
  constructor() {}
  static async searchCoHosts(keyword) {
      if(!keyword) return null;
    return await asyncInstance.get(ENDPOINTS.USER.PEOPLE.SEARCH.ATTENDEES+keyword, {
      data: null,
    });
  }
}
