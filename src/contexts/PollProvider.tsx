import { Stack } from "@mui/material";
import { FC, useState, useContext, createContext, useEffect } from "react";
import { fetchPoll } from "../api/Polls";
import { ApiContext } from "./ApiProvider";
import Poll from "../logic/Poll";
import { VotesContext } from "./VotesProvider";
import { CLoadingPoll } from "../components/loading/CLoadingPoll";
import { Link } from "react-router-dom";
type TPollContext = {
  poll: Poll;
};

export const PollContext = createContext<TPollContext>({
  poll: new Poll("", [], ""),
});

interface PollProviderProps {
  pollId: string;
}

export const PollProvider: FC<PollProviderProps> = ({ children, pollId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [poll, setPoll] = useState(new Poll("", [], ""));
  const { getInstance } = useContext(ApiContext);
  const { addUserVotes, addVoteCounts } = useContext(VotesContext);
  const getPoll = async () => {
    try {
      const { poll, userVotes, voteCount } = await fetchPoll(
        getInstance(),
        pollId
      );
      addUserVotes(userVotes);
      addVoteCounts([voteCount]);
      setLoading(false);
      setPoll(poll);
    } catch (error: any) {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getPoll();
  }, []);
  if (error) {
    return (
      <Stack spacing={1} sx={{ pt: 4, textAlign: "center" }}>
        <h4>Sorry, unexpected error</h4>
        <small>We are working on solving the problem. Be back soon</small>
        <Link to="/">Explore other posts</Link>
      </Stack>
    );
  } else {
    if (loading) return <CLoadingPoll />;
    return (
      <PollContext.Provider value={{ poll }}>{children}</PollContext.Provider>
    );
  }
};
