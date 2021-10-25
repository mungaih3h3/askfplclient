import { Stack } from "@mui/material";
import { FC, useEffect, useState, useContext, createContext } from "react";
import { fetchPolls, fetchUserPolls } from "../api/Polls";
import { ApiContext } from "./ApiProvider";
import Poll from "../logic/Poll";
import { CNoPolls } from "../components/present/CNoPolls";
import { PLoadingPolls } from "../components/loading/PLoadingPolls";
import { VotesContext } from "./VotesProvider";
type TPollsContext = {
  polls: Poll[];
  hasMore: boolean;
  fetchMorePolls: () => Promise<any>;
};

export const PollsContext = createContext<TPollsContext>({
  polls: [],
  hasMore: false,
  fetchMorePolls: async () => {},
});

interface PollsProviderProps {
  onlyUser?: boolean;
}

export const PollsProvider: FC<PollsProviderProps> = ({
  children,
  onlyUser = false,
}) => {
  const pollsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [polls, setPolls] = useState([] as Poll[]);
  const [hasMore, setHasMore] = useState(false);
  const { getInstance } = useContext(ApiContext);
  const { addUserVotes, addVoteCounts } = useContext(VotesContext);

  useEffect(() => {
    getPaginatedPolls(new Date(), pollsPerPage);
  }, []);
  const getPaginatedPolls = async (startDate: Date, limit: number) => {
    try {
      const {
        polls: newPolls,
        hasMore,
        userVotes,
        voteCounts,
      } = onlyUser
        ? await fetchUserPolls(getInstance(), startDate, limit)
        : await fetchPolls(getInstance(), startDate, limit);
      addUserVotes(userVotes);
      addVoteCounts(voteCounts);
      setLoading(false);
      setPolls(polls.concat(newPolls));
      setHasMore(hasMore);
    } catch (error: any) {
      setLoading(false);
      setError(true);
    }
  };
  const fetchMorePolls = async () => {
    await getPaginatedPolls(
      polls.length === 0 ? new Date() : polls[polls.length - 1].createdAt,
      pollsPerPage
    );
  };
  if (error) {
    return (
      <Stack spacing={1} sx={{ pt: 4, textAlign: "center" }}>
        <h4>Sorry, unexpected error</h4>
        <small>We are working on solving the problem. Be back soon</small>
      </Stack>
    );
  } else {
    if (loading) {
      return <PLoadingPolls />;
    } else {
      if (polls.length === 0) {
        return <CNoPolls />;
      }
      return (
        <PollsContext.Provider value={{ polls, hasMore, fetchMorePolls }}>
          {children}
        </PollsContext.Provider>
      );
    }
  }
};
