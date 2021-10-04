import axios from "axios";
/***
 * base url to make requests to the uvsity endpoints.
 */
const asyncInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
// perform each async API request with a jwt token bearer.
asyncInstance.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${process.env.NEXT_PUBLIC_JWT_TOKEN}`;
    return config;
  },
  (error) => {
    return new Promise.reject(error);
  }
);

export default asyncInstance;
