import axios from "axios";
import { requestErrorHandler, requestHandler, responseErrorHandler, responseHandler } from "./axios.interceptors";

// const BASE_API_URL: string = "http://192.168.198.124:4000/api";
// export const BASE_IMAGE_URL: string = "https://144m568g-4000.inc1.devtunnels.ms";
// export const BASE_API_URL: string = "https://144m568g-4000.inc1.devtunnels.ms/api";
export const BASE_IMAGE_URL: string = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";
export const BASE_API_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// const AUTH_BASE_URL: string = import.meta.env.VITE_APP_AUTH_API_BASE_ENDPOINT;
// const headers = {
//   "Access-Control-Allow-Origin": "*",
//   "Content-Type": "application/x-www-form-urlencoded",
// };
// const baseInstance = axios.create({
//   baseURL: AUTH_BASE_URL,
//   headers: headers,
// });

// baseInstance.interceptors.response.use(
//   (response) => responseHandler(response),
//   (error) => responseErrorHandler(error)
// );

const apiInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

apiInstance.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => requestErrorHandler(error)
);

apiInstance.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => responseErrorHandler(error)
);

export { apiInstance };
