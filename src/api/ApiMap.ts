import { fetchComments, saveComment } from "./Comments";
import { fetchUserPolls } from "./Polls";
import { castVote } from "./Votes";

export const ApiMap = {
  comments: fetchComments,
  saveComment: saveComment,
  userPolls: fetchUserPolls,
  castVote: castVote,
};
