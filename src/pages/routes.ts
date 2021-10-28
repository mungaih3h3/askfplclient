import PPoll from "./PPoll";
import PUserPolls from "./PUserPolls";
import PPolls from "./PPolls";
import PCreatePoll from "./PCreatePoll";

const routes = [
  {
    path: "/create",
    Component: PCreatePoll,
    navTitle: "Create Poll",
  },
  {
    path: "/",
    Component: PPolls,
    navTitle: "Polls",
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
