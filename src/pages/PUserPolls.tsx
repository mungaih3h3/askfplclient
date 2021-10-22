import { Button, IconButton, Stack, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CPoll from "../components/present/CPoll";
import { WithAuthentication } from "../HOC/WithAuthentication";
import { Explore, AddBox, Logout } from "@mui/icons-material";
import Poll from "../logic/Poll";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";
import { CLoadingPoll } from "../components/loading/CLoadingPoll";
import { fontSizes } from "../theme/fontSizes";
import { getUserPollVotes } from "../api/Votes";
import { VotesContext } from "../contexts/VotesProvider";
import { ApiContext } from "../contexts/ApiProvider";
import { ApiMap } from "../api/ApiMap";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import Publisher from "../logic/Publisher";
import { WithDiscussion } from "../HOC/WithDiscussion";

interface PUserPollsProps {
  openDiscussion: (pollId: string) => any;
}

const PUserPolls: FC<PUserPollsProps> = ({ openDiscussion }) => {
  const history = useHistory();
  const [userPolls, setUserPolls] = useState([] as Poll[]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
  });
  const { getToken, logOut, isAuthenticated } = useContext(AuthContext);
  const { addVoteCounts, addUserVotes } = useContext(VotesContext);
  const { getInstance } = useContext(ApiContext);

  const getPaginatedPolls = async (startDate: Date, limit: number) => {
    try {
      const { polls, hasMore, voteCounts } = await ApiMap.userPolls(
        getInstance(),
        startDate,
        limit
      );
      addVoteCounts(voteCounts);
      setHasMore(hasMore);
      setUserPolls(polls);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      setError({
        error: true,
        errorMessage: error.message,
      });
      toast.error(error.message);
    }
  };
  useEffect(() => {
    setUserPolls([]);
    getPaginatedPolls(new Date(), 10);
  }, []);
  const fetchUserVotes = async () => {
    try {
      const userPollVotes = await getUserPollVotes(
        await getToken(),
        userPolls.map((p) => p.id)
      );
      addUserVotes(userPollVotes);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchUserVotes();
  }, [userPolls]);
  useEffect(() => {
    Publisher.subscribeTo("login", () => {
      fetchUserVotes()
        .then(() => console.log("fetched user votes"))
        .catch(console.log);
    });
  }, []);
  return (
    <>
      <Stack spacing={2}>
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
            variant="h1"
          >
            User polls
          </Typography>
          <IconButton
            onClick={() => {
              history.push("/");
            }}
          >
            <Explore
              sx={{
                color: grey[500],
              }}
            />
          </IconButton>
        </Box>
        {error.error && (
          <Stack spacing={0.5} sx={{ pt: 100, textAlign: "center" }}>
            <h4>Sorry, unexpected error</h4>
            <small>We are working on solving the problem. Be back soon</small>
          </Stack>
        )}
        {!error.error && !loading && userPolls.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <em>You dont have any polls yet</em>
            <Button
              variant="outlined"
              onClick={() => {
                history.push("/create");
              }}
              startIcon={<AddBox />}
            >
              Add poll
            </Button>
          </div>
        )}
        <InfiniteScroll
          dataLength={userPolls.length}
          next={async () => {
            await getPaginatedPolls(
              new Date(userPolls[userPolls.length - 1].createdAt),
              10
            );
          }}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <Stack spacing={5}>
            {!error.error &&
              loading &&
              new Array(5)
                .fill(null)
                .map((_, index) => <CLoadingPoll key={index} />)}
            {!error.error &&
              !loading &&
              userPolls.map((poll) => (
                <CPoll
                  key={poll.id}
                  poll={poll}
                  onWantDiscussion={() => {
                    openDiscussion(poll.id);
                  }}
                />
              ))}
          </Stack>
        </InfiniteScroll>
      </Stack>
    </>
  );
};

export default WithAuthentication(WithDiscussion(PUserPolls));
