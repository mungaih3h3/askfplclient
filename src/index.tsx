import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { enableMapSet } from "immer";
import ga from "react-ga4";
ga.initialize("G-3R0Z4TVNYV");

enableMapSet();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
