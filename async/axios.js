import axios from "axios";
/***
 * base url to make requests to the uvsity endpoints.
 */
const asyncInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})
export default asyncInstance;