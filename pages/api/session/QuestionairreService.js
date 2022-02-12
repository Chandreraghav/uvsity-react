import asyncInstance from "../../../async/axios";
import { ENDPOINTS } from "../../../async/endpoints";
export default class QuestionairreService {
  constructor() {}
  
  static async createQuestionairre(payload) {
    return await asyncInstance.post(
      ENDPOINTS.SESSION.QUESTIONAIRRE.CREATE,
      payload
    );
  }
  static async updateQuestionairre(payload) {
    return await asyncInstance.post(
      ENDPOINTS.SESSION.QUESTIONAIRRE.UPDATE,
      payload
    );
  }
  static async getQuestionairre(id){
    return await asyncInstance.get(ENDPOINTS.SESSION.QUESTIONAIRRE.GET+id, {data:null});
  }
}
