import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://amazon-api-n7qi.onrender.com",
});
export { axiosInstance };
