import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://localhost/api",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXJrc3N1dSIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNjY4NjAwNTUxfQ.CgHDng2SUQNJyhYx36IgtHhQI5kU7YVbubKVUOK6FMT0HtXNkHmOslS_2Uf-SMssW2i4uC88x_m4EvH-15z22Q",
  },
});
