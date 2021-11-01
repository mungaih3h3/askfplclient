import { FC, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import toast from "react-hot-toast";
import CPoll from "../components/present/CPoll";
import { DiscussionContext } from "../contexts/DiscussionProvider";
import { PollContext, PollProvider } from "../contexts/PollProvider";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";

const PPoll: FC = () => {
  const { openDiscussion } = useContext(DiscussionContext);
  const { pollId } = useParams<{ pollId: string }>();
  const history = useHistory();
  if (!pollId) {
    toast.error("Poll not found");
    history.push("/");
  }
  const Child = () => {
    const { poll, currentGW } = useContext(PollContext);
    return (
      <Stack spacing={2}>
        <CPoll
          poll={poll}
          onWantDiscussion={openDiscussion}
          currentGW={currentGW}
        />
        <Box sx={{ textAlign: "center" }}>
          <Link
            to="/"
            style={{
              color: grey[100],
              textDecoration: "none",
              borderBottom: `2px solid ${grey[100]}`,
            }}
          >
            Explore other polls
          </Link>
        </Box>
      </Stack>
    );
  };
  return (
    <PollProvider pollId={pollId}>
      <Child />
    </PollProvider>
  );
};

export default PPoll;
