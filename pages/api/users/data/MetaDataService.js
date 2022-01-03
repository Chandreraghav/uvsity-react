import asyncInstance from "../../../../async/axios";
import { ENDPOINTS } from "../../../../async/endpoints";

export default class MetaDataService {
  constructor() {}
  static async getRootData() {
    return await asyncInstance.get(ENDPOINTS.USER.METADATA.ROOT,{data:null});
  }

  static async getStaticData() {
    return await asyncInstance.get(ENDPOINTS.USER.METADATA.STATIC,{data:null});
  }
}
