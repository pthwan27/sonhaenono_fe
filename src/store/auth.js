import http from "@/api/http";
import jwt from "@/common/jwt";

const auth = {
  namespaced: true,
  state: {
    user: null,
    token: {
      accessToken: jwt.getToken(),
    },
    isAuthenticated: !!jwt.getToken(),
    remember: false,
    error: null,
  },
  getters: {
    getAccessToken: function (state) {
      return state.token.accessToken;
    },
    isAuthenticated: function (state) {
      return state.isAuthenticated;
    },
  },
  actions: {
    login({ commit }, payload = {}) {
      http
        .post("/auth/authenticate", payload)
        .then(({ data }) => {
          const token = data.token;
          commit("SET_TOKEN", "Bearer " + token);
        })
        .catch((err) => {
          commit("ERROR_HANDLE", err);
        });
    },
    logout({ commit }) {
      return new Promise((res) => {
        setTimeout(() => {
          commit("DESTROY_TOKEN");
          res();
        }, 1000);
      });
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token.accessToken = token;
      state.isAuthenticated = true;
      jwt.saveToken(token);
    },
    DESTROY_TOKEN(state) {
      state.token.accessToken = "";
      state.isAuthenticated = false;
      jwt.destroyToken();
    },
    TOGGLE_REMEMBER(state) {
      state.remember = !state.remember;
    },
    ERROR_HANDLE(state, error) {
      state.err = error;
    },
  },
};

export default auth;
