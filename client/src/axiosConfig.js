import axios from "axios";

const AUTHTOKEN = localStorage.getItem("token");

if (AUTHTOKEN) {
  axios.defaults.headers.common["Authorization"] = AUTHTOKEN;
}
