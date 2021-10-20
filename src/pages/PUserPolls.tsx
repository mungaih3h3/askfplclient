import { Button, IconButton, Stack } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CPoll from "../components/present/CPoll";
import { WithAuthentication } from "../HOC/WithAuthentication";
import { Explore, AddBox, Logout } from "@mui/icons-material";
import Poll from "../logic/Poll";
import { fetchUserPolls } from "../api/Polls";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";
import { CLoadingPoll } from "../components/loading/CLoadingPoll";
import { fontSizes } from "../theme/fontSizes";
import { getUserPollVotes } from "../api/Votes";
import { VotesContext } from "../contexts/VotesProvider";
interface PUserPollsProps {}

const PUserPolls: FC<PUserPollsProps> = () => {
  const history = useHistory();
  const [userPolls, setUserPolls] = useState([] as Poll[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
  });
  const { getToken, logOut, isAuthenticated } = useContext(AuthContext);
  const { addVoteCounts, addUserVotes } = useContext(VotesContext);
  useEffect(() => {
    const getPolls = async () => {
      try {
        const polls = await fetchUserPolls(await getToken());
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
    getPolls();
  }, []);
  useEffect(() => {
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
    if (isAuthenticated()) {
      fetchUserVotes();
    }
  }, [userPolls]);
  return (
    <Stack spacing={1}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={async () => {
            await logOut();
          }}
        >
          <Logout />
        </IconButton>
        <h2 style={{ fontSize: fontSizes[3] }}>User polls</h2>
        <IconButton
          onClick={() => {
            history.push("/");
          }}
        >
          <Explore />
        </IconButton>
      </div>
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
      <Stack spacing={5}>
        {!error.error &&
          loading &&
          new Array(5)
            .fill(null)
            .map((_, index) => <CLoadingPoll key={index} />)}
        {!error.error &&
          !loading &&
          userPolls.map((poll) => <CPoll key={poll.id} poll={poll} />)}
      </Stack>
    </Stack>
  );
};

export default WithAuthentication(PUserPolls);
