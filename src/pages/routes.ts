import PPoll from "./PPoll";
import PUserPolls from "./PUserPolls";
import PPolls from "./PPolls";
import PCreatePoll from "./PCreatePoll";
import PEmailVerified from "./PEmailVerified";
import PResetPassword from "./PResetPassword";

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
  {
    path: "/email/verification/:code",
    Component: PEmailVerified,
    navTitle: "Email verification",
  },
  {
    path: "/reset/password/:email/:resetCode",
    Component: PResetPassword,
    navTitle: "Reset Password",
  },
];

export default routes;
