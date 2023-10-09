import axios from "axios";
import { JWT } from "../jwt/auth/JWT";
import { AuthService } from "../pages/api/users/auth/AuthService";

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
    config.headers["content-type"] = "application/json";
    return config;
  },
  (error) => {
    return new Promise.reject(error);
  }
);

asyncInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (AuthService.getAuthToken()) {
      // if auth token exists.
      
      if (
        error.status === 500 ||
        error.status === 400 ||
        error.toString().indexOf("400") !== -1 ||
        error.toString().indexOf("500") !== -1
      ) {
         // if internal server error
        AuthService.setInternalServerError(error.response);
      } else if (
        [401, 403].includes(error.status) ||
        error?.toString().indexOf("Unauthorized") !== -1 ||
        error?.toString().indexOf("Forbidden") !== -1 ||
        error?.toString().indexOf("401") !== -1 ||
        error?.toString().indexOf("403") !== -1
      ) {
        // if response returned is Unauthorized or Forbidden, send unauthorized response to higher order session component silently.
        AuthService.setUnauthorizedResponseFromServer(error);
      }
    }
    return new Promise.reject(error);
  }
);

export default asyncInstance;
