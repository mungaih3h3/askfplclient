import { lazy } from "react";
const PCreatePoll = lazy(() => import("./PCreatePoll"));
const PPolls = lazy(() => import("./PPolls"));
const PUserPolls = lazy(() => import("./PUserPolls"));

// import PPolls from "./PPolls";
// import PUserPolls from "./PUserPolls";
// import PCreatePoll from "./PCreatePoll";
// import PComments from "./PComments";

const routes = [
  {
    path: "/",
    Component: PPolls,
  },
  {
    path: "/create",
    Component: PCreatePoll,
  },
  {
    path: "/userpolls",
    Component: PUserPolls,
  },
];

export default routes;
