import produce from "immer";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { createContext } from "react";
import { CCommentsDialog } from "../components/present/CComments";

type TDiscussionContext = {
  openDiscussion: (pollId: string) => any;
};

export const DiscussionContext = createContext<TDiscussionContext>({
  openDiscussion: () => {
    toast.error("No discussion context");
  },
});

export const DiscussionProvider: FC = ({ children }) => {
  const [discussion, setDiscussion] = useState({
    open: false,
    pollId: "",
  });
  return (
    <DiscussionContext.Provider
      value={{
        openDiscussion: (pollId) => {
          setDiscussion({ open: true, pollId });
        },
      }}
    >
      {children}
      <CCommentsDialog
        open={discussion.open}
        onClose={() => {
          setDiscussion(
            produce((draft) => {
              draft.open = false;
            })
          );
        }}
        pollId={discussion.pollId}
      />
    </DiscussionContext.Provider>
  );
};
