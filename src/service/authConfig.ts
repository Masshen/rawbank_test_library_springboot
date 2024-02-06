import axios from "axios";
import config from "./config";

export default axios.create({
  baseURL: "http://localhost:9001/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosWeb = axios.create({
  baseURL: "http://localhost:9001/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
