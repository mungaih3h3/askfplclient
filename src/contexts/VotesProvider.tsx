import produce from "immer";
import { createContext, FC, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiInstance } from "../api/ApiInstance";
import { castVote } from "../api/Votes";
import { AuthContext } from "./AuthProvider";
type TVotesContext = {
  userVotes: Map<string, string>;
  voteCount: Map<string, Map<string, number>>;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  vote: (pollId: string, optionId: string) => any;
  addVoteCount: (voteCount: Map<string, Map<string, number>>) => any;
  addUserVotes: (v: Map<string, string>) => any;
};

export const VotesContext = createContext<TVotesContext>({
  userVotes: new Map(),
  voteCount: new Map(),
  loading: true,
  error: false,
  errorMessage: "",
  vote: () => {},
  addVoteCount: () => {},
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
  const vote = (pollId: string, optionId: string) => {
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
    setUserVotes(
      produce((draft) => {
        draft.set(pollId, optionId);
      })
    );
    getToken()
      .then((token) => {
        castVote(token, pollId, optionId).catch((error: any) =>
          toast.error(error.message)
        );
      })
      .catch((error: any) => toast.error(error.message));
  };
  const addVoteCount = (v: Map<string, Map<string, number>>) => {
    const newMap = new Map([...v].concat([...voteCount]));
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
        addVoteCount,
        addUserVotes,
      }}
    >
      {children}
    </VotesContext.Provider>
  );
};
