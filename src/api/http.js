import axios from "axios";
import store from "@/store";

// axios 객체 생성
const http = axios.create({
  baseURL: "http://localhost/api",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

http.interceptors.request.use(
  (config) => {
    const isAuthenticated = store.getters["auth/isAuthenticated"];
    if (isAuthenticated) {
      config.headers["Authorization"] = store.getters["auth/getAccessToken"];
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

function apiInstance() {
  const instance = axios.create({
    baseURL: "http://localhost/api",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}
export { apiInstance };

export default http;
