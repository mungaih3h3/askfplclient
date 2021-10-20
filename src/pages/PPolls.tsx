import { Button, IconButton, Stack, Typography } from "@mui/material";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CPoll from "../components/present/CPoll";
import { VotesContext } from "../contexts/VotesProvider";
import { AddBox } from "@mui/icons-material";
import { CLoadingPoll } from "../components/loading/CLoadingPoll";
import Poll from "../logic/Poll";
import { fetchPolls } from "../api/Polls";
import { fontSizes } from "../theme/fontSizes";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box } from "@mui/system";
import { getUserPollVotes } from "../api/Votes";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";
import { CAuthDialog } from "../components/auth/CAuth";

interface PPollsProps {}

const PPolls: FC<PPollsProps> = () => {
  const history = useHistory();
  const [polls, setPolls] = useState([] as Poll[]);
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
  });
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const { addVoteCounts, addUserVotes } = useContext(VotesContext);
  const { isAuthenticated, getToken } = useContext(AuthContext);
  const [authDialog, setAuthDialog] = useState(false);
  const getPaginatedPolls = async (startDate: Date, limit: number) => {
    try {
      const {
        polls: newPolls,
        hasMore,
        voteCounts,
      } = await fetchPolls(startDate, limit);
      console.log(voteCounts);
      addVoteCounts(voteCounts);
      console.log(newPolls);
      setLoading(false);

      setPolls((prevPolls) => prevPolls.concat(newPolls));
      setHasMore(hasMore);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setError({
        error: true,
        errorMessage: error.message,
      });
    }
  };
  useEffect(() => {
    const fetchUserVotes = async () => {
      try {
        const userPollVotes = await getUserPollVotes(
          await getToken(),
          polls.map((p) => p.id)
        );
        addUserVotes(userPollVotes);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    if (isAuthenticated()) {
      fetchUserVotes();
    }
  }, [polls]);
  useEffect(() => {
    setPolls([]);
    getPaginatedPolls(new Date(), 10);
  }, []);
  return (
    <Stack spacing={1} sx={{ mb: 6 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h4 style={{ fontSize: fontSizes[3] }}>Polls</h4>
        {isAuthenticated() ? (
          <IconButton onClick={() => history.push("/create")}>
            <AddBox />
          </IconButton>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={() => setAuthDialog(true)}
          >
            Login
          </Button>
        )}
      </div>
      {!loading && !error.error && polls.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <em>No polls yet</em>
          <Button
            onClick={() => history.push("/create")}
            variant="outlined"
            startIcon={<AddBox />}
            size="small"
          >
            Add
          </Button>
        </div>
      )}
      {!loading && error.error && (
        <Stack spacing={0.5} sx={{ pt: 100, textAlign: "center" }}>
          <h4>Sorry, unexpected error</h4>
          <small>We are working on solving the problem. Be back soon</small>
        </Stack>
      )}
      <InfiniteScroll
        dataLength={polls.length}
        next={async () => {
          await getPaginatedPolls(
            new Date(polls[polls.length - 1].createdAt),
            10
          );
        }}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          polls.length !== 0 && (
            <Stack spacing={1} sx={{ textAlign: "center", py: 3 }}>
              <Typography>Yay! That's all for now</Typography>
              <Typography>Refresh for newer posts</Typography>
              <Button
                onClick={async () => {
                  setPolls([]);
                  setLoading(true);
                  await getPaginatedPolls(new Date(), 10);
                }}
              >
                Refresh
              </Button>
            </Stack>
          )
        }
      >
        <Stack spacing={5}>
          {!error.error &&
            loading &&
            new Array(4)
              .fill(null)
              .map((_, index) => <CLoadingPoll key={index} />)}
          {!error.error &&
            !loading &&
            polls.map((poll, index) => (
              <CPoll key={poll.id + index} poll={poll} />
            ))}
        </Stack>
      </InfiniteScroll>
      <CAuthDialog
        open={authDialog}
        onClose={() => setAuthDialog(false)}
        onAuth={() => setAuthDialog(false)}
      />
    </Stack>
  );
};

export default PPolls;
