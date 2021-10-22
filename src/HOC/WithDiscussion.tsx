import produce from "immer";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { CCommentsDialog } from "../components/present/CComments";
type WithDiscussionComponentProps = {
  openDiscussion: (pollId: string) => any;
};
export const WithDiscussion = (Component: FC<WithDiscussionComponentProps>) => {
  const Child = ({ ...props }) => {
    const [discussion, setDiscussion] = useState({
      open: false,
      pollId: "",
    });
    return (
      <>
        <Component
          {...props}
          openDiscussion={(pollId) => {
            try {
              if (pollId === "") throw new Error("Cannot open discussion");
              setDiscussion(
                produce((draft) => {
                  draft.open = true;
                  draft.pollId = pollId;
                })
              );
            } catch (error: any) {
              toast.error(error.message);
            }
          }}
        />
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
      </>
    );
  };
  return Child;
};
