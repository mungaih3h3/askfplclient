import axios from "axios";

export const url =
  process.env.NODE_ENV === "production"
    ? "https://www.brianmungai.com"
    : "http://localhost:5050";

export const apiInstance = axios.create({
  baseURL: url,
});
