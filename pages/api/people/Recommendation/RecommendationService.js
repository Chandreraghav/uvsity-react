import asyncInstance from "../../../../async/axios";
import { ENDPOINTS } from "../../../../async/endpoints";

export default class RecommendationService {
  constructor() {}
  static async sendRecommendationRequest(payload) {
    return await asyncInstance.post(
      ENDPOINTS.USER.PEOPLE.MESSAGING.SEND_RECOMMENDATION_REQUEST,
      payload
    );
  }
}
