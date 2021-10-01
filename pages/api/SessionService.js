import asyncInstance from "../../async/axios";
import { ENDPOINTS } from "../../async/endpoints";
export default class SessionService {
  constructor(){

  }
   async  getPopularSessions(){
  return await asyncInstance.get(ENDPOINTS.TOP_COURSES);
}
}
