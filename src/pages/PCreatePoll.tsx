import { Button, IconButton, Stack } from "@mui/material";
import { FC, useContext } from "react";
import { useHistory } from "react-router-dom";
import CCreatePoll from "../components/create/CCreatePoll";
import { AuthContext } from "../contexts/AuthProvider";
import { VotesContext } from "../contexts/VotesProvider";
import { WithAuthentication } from "../HOC/WithAuthentication";
import Poll from "../logic/Poll";
import { Explore, ViewStream } from "@mui/icons-material";
import { Box } from "@mui/system";
import { fontSizes } from "../theme/fontSizes";
import { savePoll } from "../api/Polls";
import toast from "react-hot-toast";

interface PCreatePollProps {}

const PCreatePoll: FC<PCreatePollProps> = () => {
  const { getToken } = useContext(AuthContext);
  const history = useHistory();
  const addPoll = async (poll: Poll) => {
    try {
      await savePoll(await getToken(), poll);
      history.push("/userpolls");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
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
      <CCreatePoll
        onCreate={async (poll) => {
          try {
            await addPoll(poll);
          } catch (error: any) {
            toast.error(error.message);
          }
        }}
      />
      <Box sx={{ height: 150 }}></Box>
    </Stack>
  );
};

export default WithAuthentication(PCreatePoll);
