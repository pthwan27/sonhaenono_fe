import http from "./http";

export function searchStore(params, success, fail) {
  http.get(`/store/search`, { params: params }).then(success).catch(fail);
}

export default { searchStore };
