import { IconButton, Stack, Typography } from "@mui/material";
import { FC, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CCreatePoll from "../components/create/CCreatePoll";
import { WithAuthentication } from "../HOC/WithAuthentication";
import Poll from "../logic/Poll";
import { Explore, LoupeTwoTone, ViewStream } from "@mui/icons-material";
import { Box } from "@mui/system";
import { fontSizes } from "../theme/fontSizes";
import { savePoll } from "../api/Polls";
import toast from "react-hot-toast";
import { ApiContext } from "../contexts/ApiProvider";
import { grey } from "@mui/material/colors";
import { AuthContext } from "../contexts/AuthProvider";

interface PCreatePollProps {}

const PCreatePoll: FC<PCreatePollProps> = () => {
  const { getInstance } = useContext(ApiContext);
  const history = useHistory();
  const addPoll = async (poll: Poll) => {
    try {
      await savePoll(getInstance(), poll);
      toast.success("Post created successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <Stack spacing={1}>
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
