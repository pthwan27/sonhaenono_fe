const SONHAENONO_AUTH_TOKEN = "sonhaenono.s.token";

export const getToken = () => {
  return window.localStorage.getItem(SONHAENONO_AUTH_TOKEN);
};

export const saveToken = (token) => {
  window.localStorage.setItem(SONHAENONO_AUTH_TOKEN, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(SONHAENONO_AUTH_TOKEN);
};

export default {
  getToken,
  saveToken,
  destroyToken,
};
