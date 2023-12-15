import { asyncInstance, ENDPOINTS } from "../../../async";

export default class MessageDataService {
  constructor() { }
  static async getMessagesByApi({endpoint, isLoadMore}) {
    return await asyncInstance.get(`${endpoint}${isLoadMore ? '?loadMore=true' : ''}`);
  }

  static async getMessagesByApiLoadMore(endpoint) {
    return await asyncInstance.get(`${endpoint}?loadMore=true`);
  }

  static async getMessageDetail(messageId) {
    return await asyncInstance.get(`${ENDPOINTS.MESSAGE.CONVERSATION_DETAIL}/${messageId}`);
  }

  static async replyMessage(payload) {
    return await asyncInstance.post(ENDPOINTS.MESSAGE.REPLY_MESSAGE, payload);
  }

  static async topicJoinRequest({userRequestId, isAccepting}) {
    return await asyncInstance.post(`${isAccepting ? ENDPOINTS.MESSAGE.ACCEPT_TOPIC_JOIN_REQUEST : ENDPOINTS.MESSAGE.REJECT_TOPIC_JOIN_REQUEST}/${userRequestId}`, {});
  }

  static async connectJoinRequest({userRequestId, isAccepting}) {
    return await asyncInstance.post(`${isAccepting ? ENDPOINTS.MESSAGE.ACCEPT_CONNECTION_REQUEST : ENDPOINTS.MESSAGE.REJECT_CONNECTION_REQUEST}/${userRequestId}`, {});
  }

  static async sendRecommendation(payload) {
    return await asyncInstance.post(ENDPOINTS.MESSAGE.SEND_RECOMMENDATION, payload);
  }
}
