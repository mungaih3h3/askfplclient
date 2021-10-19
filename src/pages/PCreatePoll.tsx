import { Button, IconButton, Stack } from "@mui/material";
import { FC, useContext } from "react";
import { useHistory } from "react-router-dom";
import CCreatePoll from "../components/create/CCreatePoll";
import { AuthContext } from "../contexts/AuthProvider";
import { PollContext } from "../contexts/PollProvider";
import { WithAuthentication } from "../HOC/WithAuthentication";
import Poll from "../logic/Poll";
import { Explore, ViewStream } from "@mui/icons-material";
import { Box } from "@mui/system";
import { fontSizes } from "../theme/fontSizes";

interface PCreatePollProps {}

const PCreatePoll: FC<PCreatePollProps> = () => {
  const { addPoll } = useContext(PollContext);
  const history = useHistory();
  return (
    <Stack spacing={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={() => {
            history.push(`/${"userpolls"}`);
          }}
        >
          <ViewStream />
        </IconButton>
        <h2 style={{ fontSize: fontSizes[3] }}>Create Poll</h2>
        <IconButton
          onClick={() => {
            history.push("/");
          }}
        >
          <Explore />
        </IconButton>
      </Box>
      <CCreatePoll onCreate={addPoll} />
      <Box sx={{ height: 150 }}></Box>
    </Stack>
  );
};

export default WithAuthentication(PCreatePoll);
