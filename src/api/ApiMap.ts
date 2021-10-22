import { fetchComments, saveComment } from "./Comments";
import { feedback } from "./Feedback";
import { fetchUserPolls, fetchPoll } from "./Polls";
import { castVote } from "./Votes";

export const ApiMap = {
  comments: fetchComments,
  saveComment: saveComment,
  userPolls: fetchUserPolls,
  castVote: castVote,
  sendFeedback: feedback,
  getPoll: fetchPoll,
};
