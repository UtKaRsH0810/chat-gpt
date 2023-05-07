const axiosCall = require('axios');

const axiosGet = async ({ url, config = {} }) => {
  const resp = await axiosCall.get(url, config);
  return resp;
};

const axiosPost = async ({ url, data = {}, config = {} }) => {
  const resp = await axiosCall.post(url, data, config);
  return resp;
};

const axiosPut = async ({ url, data = {}, config = {} }) => {
  const resp = await axiosCall.put(url, data, config);
  return resp;
};

const axiosDelete = async ({ url, data = {}, config = {} }) => {
  const resp = await axiosCall.delete(url, data, config);
  return resp;
};

const axios = {};

axios.get = axiosGet;
axios.post = axiosPost;
axios.put = axiosPut;
axios.delete = axiosDelete;

module.exports = axios;
