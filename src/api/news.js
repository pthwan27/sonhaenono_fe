import http from "./http";

export function fetchNews(params, success, fail) {
  http.get(`/news`, { params: params }).then(success).catch(fail);
}

export default {
  fetchNews,
};
