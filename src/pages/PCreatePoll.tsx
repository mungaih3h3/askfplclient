import { Stack } from "@mui/material";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import CCreatePoll from "../components/create/CCreatePoll";
import { AuthContext } from "../contexts/AuthProvider";
import { PollContext } from "../contexts/PollProvider";
import { WithAuthentication } from "../HOC/WithAuthentication";
import Poll from "../logic/Poll";

interface PCreatePollProps {}

const PCreatePoll: FC<PCreatePollProps> = () => {
  const { addPoll } = useContext(PollContext);
  const { getAuthenticatedUser } = useContext(AuthContext);
  return (
    <Stack spacing={1}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h2>Create Poll</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <Link to="/">My Polls</Link>
          <Link to="/">Polls</Link>
        </div>
      </div>
      <CCreatePoll onCreate={addPoll} />
    </Stack>
  );
};

export default WithAuthentication(PCreatePoll);
