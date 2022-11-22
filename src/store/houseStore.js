// import http from "@/api/http";

import { markerList } from "@/api/house";

const houseStore = {
  namespaced: true,

  state: {
    markerPositions: [],
    marker: null,
  },
  getters: {},
  mutations: {
    SET_MARKER_LIST(state, markerPositions) {
      state.markerPositions = markerPositions;
    },
  },
  actions: {
    getMarkerList: ({ commit }, swLat, swLng, neLat, neLng) => {
      const params = {
        southWestLat: swLat,
        southWestlng: swLng,
        northEastLat: neLat,
        northEastlng: neLng,
      };
      markerList(
        params,
        ({ data }) => {
          commit("SET_MARKER_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
  },
};

export default houseStore;
