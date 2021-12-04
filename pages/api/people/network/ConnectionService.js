import asyncInstance from "../../../../async/axios";
import { ENDPOINTS } from "../../../../async/endpoints";

export default class ConnectionService {
  constructor() {}
  static async sendConnectionRequest(payload) {
    return await asyncInstance.post(
      ENDPOINTS.USER.PEOPLE.NETWORK.ADD_REQUEST,
      payload
    );
  }

  static async acceptConnectionRequest(id){
    return await asyncInstance.post(ENDPOINTS.USER.PEOPLE.NETWORK.ACCEPT_REQUEST+id,{})
  }
}
