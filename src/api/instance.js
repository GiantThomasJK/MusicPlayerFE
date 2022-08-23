const { default: axios } = require("axios");

const instance = axios.create({
  baseURL: "https://fakestoreapi.com/",

});

export default instance;
