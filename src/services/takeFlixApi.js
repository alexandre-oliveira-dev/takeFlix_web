import axios from "axios";

const takeFlixApi = axios.create({
  baseURL: "https://takeflix-api.onrender.com",
  headers: {
    "Content-Type": "Application/json",
  },
});
export default takeFlixApi;