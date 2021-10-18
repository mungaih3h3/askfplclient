import produce from "immer";
import { createContext, FC, useState } from "react";
import { dummypolls } from "../dummydata/dummypolls";
import Poll from "../logic/Poll";

type TPollContext = {
  polls: Poll[];
  userPolls: Poll[];
  userVotes: Map<string, string>;
  voteCount: Map<string, Map<string, number>>;
  addPoll: (poll: Poll) => any;
  vote: (pollId: string, optionId: string) => any;
};

export const PollContext = createContext<TPollContext>({
  polls: [],
  userPolls: [],
  userVotes: new Map(),
  voteCount: new Map(),
  addPoll: () => {},
  vote: () => {},
});

export const PollProvider: FC = ({ children }) => {
  const [userPolls, setUserPolls] = useState([] as Poll[]);
  const [polls, setPolls] = useState(dummypolls as Poll[]);

  const [userVotes, setUserVotes] = useState(new Map() as Map<string, string>);
  const [voteCount, setVoteCount] = useState(
    new Map() as Map<string, Map<string, number>>
  );
  const addPoll = (poll: Poll) => {
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
  return (
    <PollContext.Provider
      value={{ userPolls, addPoll, polls, userVotes, voteCount, vote }}
    >
      {children}
    </PollContext.Provider>
  );
};
