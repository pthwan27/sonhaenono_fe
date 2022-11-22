import http from "./http";

function markerList(params, success, fail) {
  http.get(`/house/search`, { params: params }).then(success).catch(fail);
}

export { markerList };
