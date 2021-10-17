import produce from "immer";
import { FC, useState } from "react";
import { createContext } from "react";
import dummycomments from "../dummydata/dummycomments";
import Comment from "../logic/Comment";

type TCommentsContext = {
  getComments: (postId: string) => Comment[];
  changeComment: (newComment: Comment, index: number) => any;
  addComment: (newComment: Comment) => any;
};

export const CommentsContext = createContext<TCommentsContext>({
  getComments: (postId: string) => {
    return [];
  },
  changeComment: () => {},
  addComment: () => {},
});

export const CommentsProvider: FC = ({ children }) => {
  const [comments, setComments] = useState(dummycomments);
  const getComments = (postId: string) => {
    return comments;
  };
  const changeComment = (newComment: Comment, index: number) => {
    setComments(
      produce((draft) => {
        draft[index] = newComment;
      })
    );
  };
  const addComment = (newComment: Comment) => {
    setComments(
      produce((draft) => {
        draft.push(newComment);
      })
    );
  };
  return (
    <CommentsContext.Provider
      value={{ getComments, changeComment, addComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
