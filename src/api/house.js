import { apiInstance } from "./http.js";

const api = apiInstance();

function markerList(params, success, fail) {
  api.get(`/house/search`, { params: params }).then(success).catch(fail);
}

export { markerList };
