import { LocalStorageKeys } from "@lib/constants";
import toastUtils from "@lib/toast";
import axios from "axios";

export const getAccessToken = (): string => {
  const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  return accessToken ? JSON.parse(accessToken) : "";
};

const requestHandler = (request: any) => {
  request.headers.Authorization = `Bearer ${getAccessToken()}`;
  // request.headers["Access-Control-Allow-Origin"] = "*";
  return request;
};

const requestErrorHandler = (err: any) => {
  return Promise.reject(err);
};

const responseHandler = (response: any) => {
  return Promise.resolve(response);
};

const responseErrorHandler = (error: any) => {
  console.log(error);

  if (axios.isCancel(error)) {
    console.log("responseErrorHandler error " + error);
    return Promise.reject(error);
  }

  if (error.code === "ECONNABORTED") {
    toastUtils.error(`${error.message}`);
  } else if (error.code === "ERR_NETWORK") {
    toastUtils.error(`Internet Connection Problem`);
  } else if (error?.response?.status >= 400 && error?.response?.status <= 499) {
    if (error.response.status === 401) {
      localStorage.clear();
      toastUtils.error(`${error.response?.data?.error ?? "Something went wrong"}`);
    } else {
      if (error.response?.data?.error) {
        toastUtils.error(`${error.response?.data?.error ?? "Something went wrong"}`);
      } else {
        toastUtils.error("Something went wrong");
      }
    }
  } else if (error?.response?.status >= 500) {
    if (error.response?.data?.Message) {
      toastUtils.error(`${error.response?.data.Message ?? "Internal Server Error"}`);
    } else {
      toastUtils.error(`Internal Server Error`);
    }
  }
  return Promise.reject(error);
};

export { requestErrorHandler, requestHandler, responseErrorHandler, responseHandler };
