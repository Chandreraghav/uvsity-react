import asyncInstance from "../../../../async/axios";
import { ENDPOINTS } from "../../../../async/endpoints";


export default class SessionValidityService {
  constructor() {}
  static async  getSessionValidity() {
    return await asyncInstance.get(ENDPOINTS.SESSION.POLLER.VALIDITY_CHECK);
  }

 
}
