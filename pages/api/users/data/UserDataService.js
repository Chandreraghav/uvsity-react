import asyncInstance from "../../../../async/axios";
import { ENDPOINTS } from "../../../../async/endpoints";

export default class UserDataService {
  constructor() {}
  static async getLoggedInInformation() {
    return await asyncInstance.get(ENDPOINTS.USER.LOGGED_IN_INFO);
  }

  static async getSummary() {
    return await asyncInstance.get(ENDPOINTS.USER.HOMEPAGE.SUMMARY);
  }

  static async getProfilePercentageCompletion() {
    return await asyncInstance.get(
      ENDPOINTS.USER.HOMEPAGE.PROFILE_PERCENTAGE_COMPLETION
    );
  }
  static async getProfileVisits() {
    return await asyncInstance.get(ENDPOINTS.USER.HOMEPAGE.PROFILE_VISITS);
  }
  static async getSuggestedFriends() {
    return await asyncInstance.get(ENDPOINTS.USER.HOMEPAGE.SUGGESTED_FRIENDS);
  }
  static async getNetworkUpdates() {
    return await asyncInstance.get(ENDPOINTS.USER.HOMEPAGE.NETWORK_UPDATES);
  }
  static async getHotTopics() {
    return await asyncInstance.get(ENDPOINTS.USER.HOMEPAGE.HOT_TOPICS);
  }
  static async getTopCourses() {
    return await asyncInstance.get(ENDPOINTS.USER.HOMEPAGE.TOP_COURSES);
  }

  static async getAttendeesPerCourse(course_id) {
    let endpoint = ENDPOINTS.USER.PEOPLE.ATTENDEES.replace(
      "#X#",
      course_id.toString()
    );
    return await asyncInstance.get(endpoint, {data:null});
  }
}
