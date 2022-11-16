import http from "@/api/http";

const auth = {
  namespaced: true,
  state: {
    token: "",
    user: null,
    remember: false,
  },
  actions: {
    login({ commit }, loginInfo) {
      http.post("/auth/authenticate", loginInfo).then(({ data }) => {
        const token = data.token;
        commit("SET_TOKEN", token);
      });
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    TOGGLE_REMEMBER(state) {
      state.remember = !state.remember;
    },
  },
};

export default auth;
