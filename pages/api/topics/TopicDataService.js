import { asyncInstance, ENDPOINTS } from "../../../async";

export default class TopicDataService {
  constructor() {}
  static async getAllTopics() {
    return await asyncInstance.get(ENDPOINTS.TOPICS.ALL_ACTIVE);
  }

  static async getTopicDetail(topicId, isTopicSubscriberOnly = false) {
    return await asyncInstance.get(`${ENDPOINTS.TOPICS.GET_DETAIL}/${topicId}?isTopicSubscriberOnly=${isTopicSubscriberOnly}`);
  }
}
