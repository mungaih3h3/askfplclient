import produce from "immer";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { dummypolls } from "../dummydata/dummypolls";
import Poll from "../logic/Poll";
import toast from "react-hot-toast";
import { fetchPolls, fetchUserPolls, savePoll } from "../api/Polls";
import { AuthContext } from "./AuthProvider";
type TPollContext = {
  polls: Poll[];
  userPolls: Poll[];
  userVotes: Map<string, string>;
  voteCount: Map<string, Map<string, number>>;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  addPoll: (poll: Poll) => any;
  vote: (pollId: string, optionId: string) => any;
};

export const PollContext = createContext<TPollContext>({
  polls: [],
  userPolls: [],
  userVotes: new Map(),
  voteCount: new Map(),
  loading: true,
  error: false,
  errorMessage: "",
  addPoll: () => {},
  vote: () => {},
});

export const PollProvider: FC = ({ children }) => {
  const [userPolls, setUserPolls] = useState([] as Poll[]);
  const [polls, setPolls] = useState(dummypolls as Poll[]);
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
  });

  const [userVotes, setUserVotes] = useState(new Map() as Map<string, string>);
  const [voteCount, setVoteCount] = useState(
    new Map() as Map<string, Map<string, number>>
  );
  const { getToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const addPoll = (poll: Poll) => {
    savePoll(getToken(), poll).catch((error: any) => {
      console.log(error.message);
      toast.error(error.message);
    });
    setUserPolls(
      produce((draft) => {
        //@ts-ignore
        draft.push(poll);
      })
    );
    setPolls(
      produce((draft) => {
        //@ts-ignore
        draft.push(poll);
      })
    );
  };
  const vote = (pollId: string, optionId: string) => {
    setUserVotes(
      produce((draft) => {
        draft.set(pollId, optionId);
      })
    );
  };
  useEffect(() => {
    fetchPolls()
      .then((polls) => {
        setLoading(false);
        setPolls(polls);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  }, []);
  useEffect(() => {
    fetchUserPolls(getToken())
      .then((polls) => {
        setUserPolls(polls);
      })
      .catch((error: any) => {
        setError({
          error: true,
          errorMessage: error.message,
        });
        toast.error(error.message);
      });
  }, []);
  return (
    <PollContext.Provider
      value={{
        userPolls,
        addPoll,
        polls,
        userVotes,
        voteCount,
        vote,
        loading,
        error: error.error,
        errorMessage: error.errorMessage,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};
