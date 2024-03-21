import axios from "../config/axios-instance";

function setJwt(jwt) {
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  } 
}

export default {
  patch: axios.patch,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
