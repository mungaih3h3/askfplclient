import { Stack } from "@mui/material";
import { FC, useEffect, useState, useContext, createContext } from "react";
import { fetchPolls, fetchUserPolls } from "../api/Polls";
import { ApiContext } from "./ApiProvider";
import Poll from "../logic/Poll";
import { CNoPolls } from "../components/present/CNoPolls";
import { PLoadingPolls } from "../components/loading/PLoadingPolls";
import { VotesContext } from "./VotesProvider";
import { ApiMap } from "../api/ApiMap";
import User from "../logic/User";
import { AuthContext } from "./AuthProvider";
import { ActiveBotContext } from "./ActiveBotProvider";
type TPollsContext = {
  polls: Poll[];
  hasMore: boolean;
  fetchMorePolls: () => Promise<any>;
  currentGW: number;
};

export const PollsContext = createContext<TPollsContext>({
  polls: [],
  hasMore: false,
  fetchMorePolls: async () => {},
  currentGW: 0,
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
  const [currentGW, setCurrentGW] = useState(0);
  const { getInstance } = useContext(ApiContext);
  const { addUserVotes, addVoteCounts, setUserVotes } =
    useContext(VotesContext);
  const { token, isAuthenticated, getAuthenticatedUser } =
    useContext(AuthContext);
  const { activeBot } = useContext(ActiveBotContext);

  useEffect(() => {
    getPaginatedPolls(new Date(), pollsPerPage);
  }, []);
  useEffect(() => {
    const fetchVotes = async (user: User) => {
      try {
        if (onlyUser) {
          const {
            polls: newPolls,
            hasMore,
            userVotes,
            voteCounts,
            currentGW: gw,
          } = await fetchUserPolls(
            getInstance(user.username),
            new Date(),
            pollsPerPage
          );
          setPolls(newPolls);
          setHasMore(hasMore);
          setUserVotes(userVotes);
          addVoteCounts(voteCounts);
          setCurrentGW(gw);
        } else {
          const newUserVotes = await ApiMap.userPollVotes(
            getInstance(user.username),
            polls.map((poll) => poll.id)
          );
          setUserVotes(newUserVotes);
        }
      } catch (error: any) {
        console.log(error);
        setError(true);
      }
    };
    if (isAuthenticated()) {
      fetchVotes(activeBot || getAuthenticatedUser());
    }
  }, [polls, token, activeBot]);

  const getPaginatedPolls = async (startDate: Date, limit: number) => {
    try {
      const {
        polls: newPolls,
        hasMore,
        userVotes,
        voteCounts,
        currentGW: gw,
      } = onlyUser
        ? await fetchUserPolls(getInstance(), startDate, limit)
        : await fetchPolls(getInstance(), startDate, limit);
      addUserVotes(userVotes);
      addVoteCounts(voteCounts);
      setLoading(false);
      setPolls(polls.concat(newPolls));
      setHasMore(hasMore);
      setCurrentGW(gw);
    } catch (error: any) {
      console.log(error);
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
        <PollsContext.Provider
          value={{ polls, hasMore, fetchMorePolls, currentGW }}
        >
          {children}
        </PollsContext.Provider>
      );
    }
  }
};
