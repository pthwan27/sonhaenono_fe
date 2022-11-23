import { fetchNews } from "@/api/news";

const news = {
  namespaced: true,
  state: {
    news: [],
    fetchError: null,
  },
  getters: {},
  mutations: {
    SET_NEWS(state, news) {
      state.news = news;
    },
    ERROR_EVOKE(state, err) {
      state.fetchError = err;
    },
  },
  actions: {
    fetchNewsByQuery({ commit }, payload = {}) {
      const params = {
        ...payload,
      };
      fetchNews(
        params,
        ({ data }) => {
          commit("SET_NEWS", data);
        },
        (err) => {
          commit("ERROR_EVOKE", err);
        },
      );
    },
  },
};

export default news;
