import asyncInstance from "../../../async/axios";
import { ENDPOINTS } from "../../../async/endpoints";
export default class ScheduleService {
  constructor() {}
  
  static async postScheduleAndreceiveSchedulingInformation(payload) {
    return await asyncInstance.post(
      ENDPOINTS.SESSION.SCHEDULED_END_DATE,
      payload
    );
  }
}
