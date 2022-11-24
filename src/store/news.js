import { fetchNews } from "@/api/news";
import { searchYoutube } from "@/api/youtube";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

const news = {
  namespaced: true,
  state: {
    news: [],
    fetchError: null,
    youtube: [],
    todayRandomContentId: "",
    youtubeError: null,
  },
  getters: {},
  mutations: {
    SET_NEWS(state, news) {
      state.news = news;
    },
    ERROR_EVOKE(state, err) {
      state.fetchError = err;
    },
    SET_YOUTUBE_CONTENT(state, data) {
      let random = getRandomIntInclusive(0, data.items.length);
      state.youtube = data.items;
      state.todayRandomContentId = data.items[random].id.videoId;
    },
    ERROR_EVOKE_YOUTUBE(state, err) {
      state.youtubeError = err;
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
    fetchYoutubeContent({ commit }, payload = {}) {
      const params = {
        type: "video",
        part: "snippet",
        order: "rating",
        q: "부동산 사기",
        ...payload,
      };
      searchYoutube(
        params,
        ({ data }) => {
          commit("SET_YOUTUBE_CONTENT", data);
        },
        (err) => {
          commit("ERROR_EVOKE_YOUTUBE", err);
        },
      );
    },
  },
};

export default news;
