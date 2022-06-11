import asyncInstance from "../../../async/axios";
import { ENDPOINTS } from "../../../async/endpoints";
export default class CountryService {
  constructor() {}
  static async getCountries() {
    return await asyncInstance.get(ENDPOINTS.METADATA.GET_COUNTRIES);
  }
}
