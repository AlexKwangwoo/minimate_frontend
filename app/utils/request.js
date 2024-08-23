import axios from "axios";
// import { tostifyError } from "../components/TostifyAlert/TostifyAlert";
import TokenService from "../services/token.service";
// import { baseURL } from "./config";
// import store from "../store/store";
// import { Logout } from "../store/actionCreators/accounts";
// import { apiRoutes } from "../types/api-routes";
// const { user: me } = await getSession();

// console.log("neneneee", me);
// NEXT_PUBLIC_API_URL
// const baseURL = process.env.NEXT_PUBLIC_LOCAL_API_URL;
const baseURL = process.env.NEXT_PUBLIC_API_URL;

// create an axios instance
const API = axios.create({
  baseURL: baseURL,
  timeout: 50000,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
  //withCredentials: true, // default
});

// API.interceptors.request.use(
//   (config) => {
//     const token = TokenService.getLocalAccessToken();
//     if (token) {
//       // eslint-disable-next-line no-param-reassign
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Do something with request error
//     console.log(error); // for debug
//     Promise.reject(error);
//   }
// );

API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    return Promise.reject(error);
    // const originalConfig = error.config;
    // if (originalConfig.url !== "api/v1/signin" && error.response) {
    //   // Access Token was expired

    //   if (
    //     error.response.status === 401 &&
    //     (localStorage.getItem("isRetry") === "false" ||
    //       localStorage.getItem("isRetry") === null)
    //   ) {
    //     localStorage.setItem("isRetry", true); // prevent to call multiple times

    //     try {
    //       const rs = await service.post(apiRoutes.REFRESH_TOKEN, {
    //         refreshToken: TokenService.getLocalRefreshToken(),
    //       });
    //       const { accessToken } = rs.data;
    //       TokenService.updateLocalAccessToken(accessToken);
    //       if (!accessToken) {
    //         store.dispatch(Logout());
    //         window.location.href = "/signin";
    //         localStorage.removeItem("user");
    //       }

    //       localStorage.setItem("isRetry", false);
    //       location?.reload();
    //       return service(originalConfig);
    //     } catch (err) {
    //       store.dispatch(Logout());
    //       window.location.href = "/signin";
    //       localStorage.removeItem("user");
    //       return Promise.reject(err);
    //     }
    //   } else if (
    //     (error.response.status === 401 &&
    //       localStorage.getItem("isRetry") === "true") ||
    //     TokenService.getLocalRefreshToken() === null
    //   ) {
    //     window.location.href = "/signin";
    //     localStorage.removeItem("user");
    //   }
    // }
  }
);

export default API;
