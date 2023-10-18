import { asyncInstance, ENDPOINTS } from "../../../async";

export default class MessageDataService {
  constructor() {}
  static async getMessagesByApi(endpoint) {
    return await asyncInstance.get(endpoint);
  }

  static async getMessageDetail(messageId) {
    return await asyncInstance.get(`${ENDPOINTS.MESSAGE.CONVERSATION_DETAIL}/${messageId}`);
  }

  static async replyMessage(payload) {
    return await asyncInstance.post(ENDPOINTS.MESSAGE.REPLY_MESSAGE, payload);
  }
}
