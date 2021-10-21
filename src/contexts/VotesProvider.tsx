import produce from "immer";
import { createContext, FC, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiInstance } from "../api/ApiInstance";
import { ApiMap } from "../api/ApiMap";
import { castVote } from "../api/Votes";
import { ApiContext } from "./ApiProvider";
import { AuthContext } from "./AuthProvider";
type TVotesContext = {
  userVotes: Map<string, string>;
  voteCount: Map<string, Map<string, number>>;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  vote: (pollId: string, optionId: string) => any;
  addVoteCounts: (voteCount: Map<string, Map<string, number>>[]) => any;
  addUserVotes: (v: Map<string, string>) => any;
};

export const VotesContext = createContext<TVotesContext>({
  userVotes: new Map(),
  voteCount: new Map(),
  loading: true,
  error: false,
  errorMessage: "",
  vote: () => {},
  addVoteCounts: () => {},
  addUserVotes: () => {},
});

export const VotesProvider: FC = ({ children }) => {
  const [error, setError] = useState({
    error: false,
    errorMessage: "",
  });

  const [userVotes, setUserVotes] = useState(new Map() as Map<string, string>);
  const [voteCount, setVoteCount] = useState(
    new Map<string, Map<string, number>>()
  );
  const { getToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { getInstance } = useContext(ApiContext);
  const vote = (pollId: string, optionId: string) => {
    setUserVotes(
      produce((draft) => {
        draft.set(pollId, optionId);
      })
    );
    setVoteCount(
      produce((draft) => {
        //decrement past vote
        draft
          .get(pollId)
          ?.set(
            userVotes.get(pollId) || "",
            (draft.get(pollId)?.get(userVotes.get(pollId) || "") || 0) - 1
          );
        draft
          .get(pollId)
          ?.set(optionId, (draft.get(pollId)?.get(optionId) || 0) + 1);
      })
    );
    (async () => {
      try {
        await ApiMap.castVote(getInstance(), pollId, optionId);
      } catch (error: any) {
        toast.error(error.message);
      }
    })();
  };
  const addVoteCounts = (v: Map<string, Map<string, number>>[]) => {
    const g = v.flatMap((m) => [...m]);
    const newMap = new Map(g.concat([...voteCount]));
    setVoteCount(newMap);
  };
  const addUserVotes = (v: Map<string, string>) => {
    const newMap = new Map([...v].concat([...userVotes]));
    setUserVotes(newMap);
  };
  return (
    <VotesContext.Provider
      value={{
        userVotes,
        voteCount,
        vote,
        loading,
        error: error.error,
        errorMessage: error.errorMessage,
        addVoteCounts,
        addUserVotes,
      }}
    >
      {children}
    </VotesContext.Provider>
  );
};
