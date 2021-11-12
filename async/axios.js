import axios from "axios";
import { JWT } from "../jwt/auth/JWT";
/***
 * base url to make requests to the uvsity endpoints.
 */
const asyncInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// perform each async API request with a jwt token bearer.
asyncInstance.interceptors.request.use(
  (config) => {
    config.headers.authorization = JWT.authHeader()
      ? JWT.authHeader().Authorization
      : `Bearer ${process.env.NEXT_PUBLIC_JWT_TOKEN}`;
    config.headers['content-type']='application/json'
    return config;
  },
  (error) => {
    return new Promise.reject(error);
  }
);

export default asyncInstance;
