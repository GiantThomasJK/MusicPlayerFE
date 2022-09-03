const { default: axios } = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:8080/music/",

});

export default instance;
