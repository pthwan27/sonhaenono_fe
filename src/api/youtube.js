import axios from "axios";
import { YOUTUBE_API_KEY } from "@/common/constant";

// axios 객체 생성
const http = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export const searchYoutube = (params, success, fail) => {
  http
    .get("/search", {
      params: {
        key: YOUTUBE_API_KEY,
        ...params,
      },
    })
    .then(success)
    .catch(fail);
};

export default { searchYoutube };
