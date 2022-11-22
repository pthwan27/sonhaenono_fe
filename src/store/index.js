import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./auth";
import houseStore from "./houseStore";
import board from "./board";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    houseStore,
    board,
  },
  plugins: [createPersistedState()],
});
