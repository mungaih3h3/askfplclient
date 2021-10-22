import { Button, Stack, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Poll from "../logic/Poll";
import { ApiMap } from "../api/ApiMap";
import { ApiContext } from "../contexts/ApiProvider";
import produce from "immer";
import { CLoadingPoll } from "../components/loading/CLoadingPoll";
import CPoll from "../components/present/CPoll";
import { WithDiscussion } from "../HOC/WithDiscussion";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { fontSizes } from "../theme/fontSizes";

interface PPollProps {
  openDiscussion: (pollId: string) => {};
}
const PPoll: FC<PPollProps> = ({ openDiscussion }) => {
  const { pollId } = useParams<{ pollId: string }>();
  const { getInstance } = useContext(ApiContext);
  const history = useHistory();
  if (!pollId) {
    toast.error("Poll not found");
    history.push("/");
  }
  const [poll, setPoll] = useState(new Poll("", [], ""));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  useEffect(() => {
    (async () => {
      try {
        const poll = await ApiMap.getPoll(getInstance(), pollId);
        setPoll(poll);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(
          produce((draft) => {
            draft.error = true;
          })
        );
      }
    })();
  }, []);
  return (
    <Stack spacing={2} sx={{ pt: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: fontSizes[4],
            px: 2,
            fontWeight: 600,
            color: grey[500],
          }}
        >
          Polls
        </Typography>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: grey[100],
            borderBottom: `2px solid ${grey[100]}`,
          }}
        >
          Explore other polls
        </Link>
      </Box>
      {error.error && (
        <Stack spacing={1} sx={{ display: "flex", alignItems: "center" }}>
          <Typography>
            Oh snap, we can't find the poll you are looking for
          </Typography>
          <Button variant="outlined">Explore other polls</Button>
        </Stack>
      )}
      {loading && <CLoadingPoll />}
      {!loading && !error.error && (
        <CPoll poll={poll} onWantDiscussion={openDiscussion} />
      )}
    </Stack>
  );
};

export default WithDiscussion(PPoll);
