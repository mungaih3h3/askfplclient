import axios from "axios";

export const url =
  process.env.NODE_ENV === "production"
    ? "https://70.39.249.233"
    : "http://192.168.0.108:5050";

export const apiInstance = axios.create({
  baseURL: url,
});
