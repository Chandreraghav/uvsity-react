import asyncInstance from "../../../../../async/axios";
import { ENDPOINTS } from "../../../../../async/endpoints";

export default class SearchService {
  constructor() { }
  static async searchCoHosts(keyword) {
    if (!keyword) return null;
    return await asyncInstance.get(
      ENDPOINTS.USER.PEOPLE.SEARCH.ATTENDEES + keyword,
      {
        data: null,
      }
    );
  }

  static async searchPeople(payload, loadMore) {
    let endpoint = ENDPOINTS.USER.PEOPLE.SEARCH.PEOPLE;
    if (loadMore === true) {
      endpoint += `?loadMore=true`;
    }
    return await asyncInstance.post(endpoint, payload);
  }

  static async searchByKeywords(keyword) {
    if (!keyword) return null;
    return await asyncInstance.get(
      ENDPOINTS.SEARCH.GENERIC + keyword,
      {
        data: null,
      }
    );
  }

  static async searchPeopleAsSessionTutorsByPeopleName(name) {
    return await asyncInstance.post(ENDPOINTS.USER.PEOPLE.SEARCH.TUTORS + name, {});
  }


}
