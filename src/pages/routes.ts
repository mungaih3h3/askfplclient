import { lazy } from "react";
import PPoll from "./PPoll";
import PUserPolls from "./PUserPolls";
const PCreatePoll = lazy(() => import("./PCreatePoll"));
const PPolls = lazy(() => import("./PPolls"));

// import PPolls from "./PPolls";
// import PUserPolls from "./PUserPolls";
// import PCreatePoll from "./PCreatePoll";

const routes = [
  {
    path: "/",
    Component: PPolls,
    navTitle: "Polls",
  },
  {
    path: "/create",
    Component: PCreatePoll,
    navTitle: "Create Poll",
  },
  {
    path: "/userpolls",
    Component: PUserPolls,
    navTitle: "My Polls",
  },
  {
    path: "/poll/:pollId",
    Component: PPoll,
    navTitle: "Poll",
  },
];

export default routes;
