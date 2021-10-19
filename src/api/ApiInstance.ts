import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "http://brianmungai.com"
    : "http://localhost:5050";

export const apiInstance = axios.create({
  baseURL: url,
});