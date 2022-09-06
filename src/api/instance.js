const { default: axios } = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:8080/music/",
});

instance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  return config;
});
export default instance;
