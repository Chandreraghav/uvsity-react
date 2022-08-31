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
    return await asyncInstance.get(endpoint, { data: null });
  }

  static async getSessionDetailPerCourse(course_id) {
    let endpoint = ENDPOINTS.USER.SESSION_BY_ID.replace(
      "#X#",
      course_id.toString()
    );
    return await asyncInstance.get(endpoint, { data: null });
  }

  static async getUserById(id) {
    return await asyncInstance.get(ENDPOINTS.USER.DETAILS + id, { data: null });
  }
  static async getUserProfileBy(id) {
    return await asyncInstance.get(ENDPOINTS.USER.PEOPLE.VIEW + id + "/");
  }

  static async uploadProfilePicture(payload) {
    return await asyncInstance.post(
      ENDPOINTS.USER.UPLOADS.PROFILE.PICTURE,
      payload,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
  }

  static async editUserBio(payload) {
    return await asyncInstance.post(ENDPOINTS.USER.EDITS.ABOUT, payload);
  }
  static async editUserHeadline(payload) {
    return await asyncInstance.post(ENDPOINTS.USER.EDITS.HEADLINE, payload);
  }
  static async editInterests(payload) {
    return await asyncInstance.post(ENDPOINTS.USER.EDITS.INTERESTS, payload);
  }

  static async editHighestEducationDegree(payload) {
    return await asyncInstance.post(ENDPOINTS.USER.EDITS.EDUCATION.HIGHEST_DEGREE, payload);
  }

  static async editSkills(payload) {
    return await asyncInstance.post(ENDPOINTS.USER.EDITS.SKILLS, payload);
  }

  static async editRecommendedSessions(payload) {
    return await asyncInstance.post(
      ENDPOINTS.USER.EDITS.RECOMMENDED_SESSION,
      payload
    );
  }

  static async editLinkedInProfile(payload) {
    return await asyncInstance.post(
      ENDPOINTS.USER.EDITS.SOCIAL_PROFILE.LINKEDIN,
      payload
    );
  }

   
}
