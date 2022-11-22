// import http from "@/api/http";

import { markerList } from "@/api/house";

const houseStore = {
  namespaced: true,

  state: {
    aptList: [],
    marker: null,
  },
  getters: {},
  mutations: {
    SET_MARKER_LIST(state, aptList) {
      state.aptList = aptList;
    },
  },
  actions: {
    getMarkerList: ({ commit }, payload) => {
      const params = {
        southWestLat: payload.swLat,
        southWestLng: payload.swLng,
        northEastLat: payload.neLat,
        northEastLng: payload.neLng,
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
