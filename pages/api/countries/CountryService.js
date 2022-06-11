import axios from "axios";
import { EXTERNAL_FULLY_QUALIFIED_ENDPOINTS } from "../../../async/endpoints";
export default class CountryService {
  constructor() {}
  static async getCountries() {
    return await axios.get(EXTERNAL_FULLY_QUALIFIED_ENDPOINTS.GET_COUNTRIES);
  }
}
