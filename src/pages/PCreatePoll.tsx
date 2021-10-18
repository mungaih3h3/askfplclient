import { Button, Stack } from "@mui/material";
import { FC, useContext } from "react";
import { useHistory } from "react-router-dom";
import CCreatePoll from "../components/create/CCreatePoll";
import { AuthContext } from "../contexts/AuthProvider";
import { PollContext } from "../contexts/PollProvider";
import { WithAuthentication } from "../HOC/WithAuthentication";
import Poll from "../logic/Poll";
import { ViewStream } from "@mui/icons-material";
import { Box } from "@mui/system";

interface PCreatePollProps {}

const PCreatePoll: FC<PCreatePollProps> = () => {
  const { addPoll } = useContext(PollContext);
  const { getAuthenticatedUser } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Stack spacing={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            history.push(`/${"userpolls"}`);
          }}
        >
          My Polls
        </Button>
        <h2>Create Poll</h2>
        <Button
          startIcon={<ViewStream />}
          variant="outlined"
          onClick={() => {
            history.push("/");
          }}
        >
          Polls
        </Button>
      </Box>
      <CCreatePoll onCreate={addPoll} />
    </Stack>
  );
};

export default WithAuthentication(PCreatePoll);
