import {
  search,
  getHouseInfoByPNU,
  getHouseDealByPNU,
  getHouseDetailByPNU,
} from "@/api/house";
import { searchStore } from "@/api/store";

const house = {
  namespaced: true,

  state: {
    aptList: [],
    near_coffee: [],
    coffeeOn: false,
    near_foods: [],
    foodsOn: false,
    selected_pnu: "",
    selected_apt: null,
    selected_apt_deal: null,
    selected_apt_detail: null,
    searchResults: [],
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
      state.selected_apt_deal = aptDeals;
    },
    SET_SELECTED_APT_DETAIL(state, aptDetail) {
      state.selected_apt_detail = aptDetail;
    },
    RESET_HOUSE(state) {
      state.selected_pnu = "";
      state.selected_apt = null;
      state.selected_apt_deal = null;
      state.selected_apt_detail = null;
    },
    SET_CURRENT_PNU(state, pnu) {
      state.selected_pnu = pnu;
    },
    SET_SEARCH_RESULT(state, aptList) {
      state.searchResults = aptList;
    },
    RESET_SEARCH_RESULT(state) {
      state.searchResults = [];
    },
    TOGGLE_COFFEE_ON(state) {
      state.coffeeOn = !state.coffeeOn;
      if (!state.coffeeOn) {
        state.near_coffee = [];
      }
    },
    TOGGLE_FOODS_ON(state) {
      state.foodsOn = !state.foodsOn;
      if (!state.foodsOn) {
        state.near_foods = [];
      }
    },
    SET_NEAR_COFFEE(state, coffees) {
      state.near_coffee = coffees;
    },
    SET_NEAR_FOODS(state, foods) {
      state.near_foods = foods;
    },
  },
  actions: {
    getMarkerList: ({ commit, dispatch, state }, payload) => {
      const params = {
        southWestLat: payload.swLat,
        southWestLng: payload.swLng,
        northEastLat: payload.neLat,
        northEastLng: payload.neLng,
      };
      if (state.coffeeOn && payload.level < 5) {
        dispatch("searchNearCoffee", payload);
      }
      if (state.foodsOn && payload.level < 5) {
        dispatch("searchNearFoods", payload);
      }
      search(
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
    searchByAptName: ({ commit }, payload) => {
      const params = {
        aptName: payload,
      };
      search(params, ({ data }) => {
        commit("SET_SEARCH_RESULT", data);
      }),
        (err) => {
          console.debug(err);
        };
    },
    resetSearchResult({ commit }) {
      commit("RESET_SEARCH_RESULT");
    },
    searchNearCoffee: ({ commit }, payload) => {
      const params = {
        indsLclsCd: "Q",
        indsMclsCd: "Q12",
        southWestLat: payload.swLat,
        southWestLng: payload.swLng,
        northEastLat: payload.neLat,
        northEastLng: payload.neLng,
      };
      searchStore(
        params,
        ({ data }) => {
          commit("SET_NEAR_COFFEE", data);
        },
        (err) => {
          console.log(err);
        },
      );
    },
    searchNearFoods: ({ commit }, payload) => {
      const params = {
        indsLclsCd: "Q",
        southWestLat: payload.swLat,
        southWestLng: payload.swLng,
        northEastLat: payload.neLat,
        northEastLng: payload.neLng,
      };
      searchStore(
        params,
        ({ data }) => {
          commit("SET_NEAR_FOODS", data);
        },
        (err) => {
          console.log(err);
        },
      );
    },
  },
};

export default house;
