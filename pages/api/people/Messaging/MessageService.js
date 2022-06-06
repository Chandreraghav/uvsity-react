import asyncInstance from "../../../../async/axios";
import { ENDPOINTS } from "../../../../async/endpoints";

export default class MessagingService {
  constructor() {}
  static async sendRecommendationRequest(payload) {
    return await asyncInstance.post(
      ENDPOINTS.USER.PEOPLE.MESSAGING.SEND_RECOMMENDATION_REQUEST,
      payload
    );
  }

  static async sendMessage(payload) {
    return await asyncInstance.post(
      ENDPOINTS.USER.PEOPLE.MESSAGING.SEND_MESSAGE,
      payload
    );
  }

  static async sendRating(payload) {
    return await asyncInstance.post(
      ENDPOINTS.USER.PEOPLE.MESSAGING.SEND_RATING,
      payload
    );
  }
}
