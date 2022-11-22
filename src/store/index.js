import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./auth";
import houseStore from "./houseStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    houseStore,
  },
  plugins: [createPersistedState()],
});
