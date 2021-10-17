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
];

export default routes;
