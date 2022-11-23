import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./auth";
import house from "./house";
import news from "./news";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    house,
    news,
  },
  plugins: [
    createPersistedState({
      paths: ["auth", "news"],
    }),
  ],
});
