import {
  markerList,
  getHouseInfoByPNU,
  getHouseDealByPNU,
  getHouseDetailByPNU,
} from "@/api/house";

const house = {
  namespaced: true,

  state: {
    aptList: [],
    selected_pnu: "",
    selected_apt: null,
    selected_apt_deal: [],
    selected_apt_detail: null,
  },
  getters: {
    getSelectedHouseInfo: function (state) {
      return {
        selectPnu: state.selected_pnu,
        simple: state.selected_apt,
        deal: state.selected_apt_deal,
        detail: state.selected_apt_detail,
      };
    },
  },
  mutations: {
    SET_APT_LIST(state, aptList) {
      state.aptList = aptList;
    },
    SET_SELECTED_APT(state, aptInfo) {
      state.selected_apt = aptInfo;
    },
    SET_SELECTED_APT_DEAL(state, aptDeals) {
      state.selected_apt_deal = [...aptDeals];
    },
    SET_SELECTED_APT_DETAIL(state, aptDetail) {
      state.selected_apt_detail = aptDetail;
    },
    RESET_HOUSE(state) {
      state.selected_pnu = "";
      state.selected_apt = null;
      state.selected_apt_deal = [];
      state.selected_apt_detail = null;
    },
    SET_CURRENT_PNU(state, pnu) {
      state.selected_pnu = pnu;
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
          commit("SET_APT_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getHouseInfoByPnu: ({ commit }, payload) => {
      getHouseInfoByPNU(payload, ({ data }) => {
        commit("SET_SELECTED_APT", data);
      }),
        (error) => {
          console.error(error);
        };
    },
    getHouseDealByPnu: ({ commit }, payload) => {
      getHouseDealByPNU(payload, ({ data }) => {
        commit("SET_SELECTED_APT_DEAL", data);
      }),
        (err) => {
          console.error(err);
        };
    },
    getHouseDetailByPnu: ({ commit }, payload) => {
      getHouseDetailByPNU(payload, ({ data }) => {
        commit("SET_SELECTED_APT_DETAIL", data);
      }),
        (err) => {
          console.error(err);
        };
    },
    selectHouse: ({ commit, dispatch }, payload) => {
      commit("SET_CURRENT_PNU", payload);
      dispatch("getHouseInfoByPnu", payload);
      dispatch("getHouseDealByPnu", payload);
      dispatch("getHouseDetailByPnu", payload);
    },
    resetHouse: ({ commit }) => {
      commit("RESET_HOUSE");
    },
  },
};

export default house;
