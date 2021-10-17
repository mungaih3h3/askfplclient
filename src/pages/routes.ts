import PComments from "./PComments";
import PCreatePoll from "./PCreatePoll";
import PPolls from "./PPolls";
import SignIn from "./PSignIn";
import PUserPolls from "./PUserPolls";

const routes = [
  {
    path: "/",
    Component: PPolls,
  },
  {
    path: "/signin",
    Component: SignIn,
  },
  {
    path: "/create",
    Component: PCreatePoll,
  },
  {
    path: "/userpolls",
    Component: PUserPolls,
  },
  {
    path: "/comments/:pollId",
    Component: PComments,
  },
];

export default routes;
