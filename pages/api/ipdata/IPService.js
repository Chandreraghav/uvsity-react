import axios from "axios";
import { EXTERNAL_FULLY_QUALIFIED_ENDPOINTS } from "../../../async/endpoints";
import { DEFAULT_TIMEZONE, DEFAULT_IP } from "../../../constants/constants";
export default class IPService {
  constructor() {}
 static async getIPData() {
    return await axios.get(EXTERNAL_FULLY_QUALIFIED_ENDPOINTS.IP_DATA);
  }
  static getFakeIPData() {
    return {
      time_zone: {
        name: DEFAULT_TIMEZONE,
      },
      ip: DEFAULT_IP,
    };
  }
}
