import { asyncInstance, ENDPOINTS } from "../../../async";

export default class TopicDataService {
  constructor() {}
  static async getAllTopics() {
    return await asyncInstance.get(ENDPOINTS.TOPICS.ALL_ACTIVE);
  }

  static async getTopicDetail(topicId, isTopicSubscriberOnly = false) {
    return await asyncInstance.get(`${ENDPOINTS.TOPICS.GET_DETAIL}/${topicId}?isTopicSubscriberOnly=${isTopicSubscriberOnly}`);
  }

  static async sendTopicComment(payload) {
    return await asyncInstance.post(`${ENDPOINTS.TOPICS.SEND_COMMENT}/${payload?.topicDetailId || ''}`, payload);
  }

  static async sendTopicReplyComment(payload) {
    return await asyncInstance.post(`${ENDPOINTS.TOPICS.SEND_REPLY_COMMENT}/${payload?.topicDetailId || ''}/${payload?.topicCommentId || ''}`, payload);
  }
}
