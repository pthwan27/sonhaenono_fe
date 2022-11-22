import http from "./http";

function markerList(params, success, fail) {
  http.get(`/house/search`, { params: params }).then(success).catch(fail);
}

function getHouseInfoByPNU(pnu, success, fail) {
  http
    .get("/house/default", {
      params: {
        pnu,
      },
    })
    .then(success)
    .catch(fail);
}

function getHouseDealByPNU(pnu, success, fail) {
  http
    .get("/house/deal", {
      params: {
        pnu,
      },
    })
    .then(success)
    .catch(fail);
}

function getHouseDetailByPNU(pnu, success, fail) {
  http
    .get("/house/detail", {
      params: {
        pnu,
      },
    })
    .then(success)
    .catch(fail);
}

export {
  markerList,
  getHouseInfoByPNU,
  getHouseDealByPNU,
  getHouseDetailByPNU,
};
