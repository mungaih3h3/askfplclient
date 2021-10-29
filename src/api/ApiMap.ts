import { fetchComments, saveComment, voteComment } from "./Comments";
import { feedback } from "./Feedback";
import { fetchUserPolls, fetchPoll } from "./Polls";
import { castVote, getUserPollVotes } from "./Votes";

export const ApiMap = {
  comments: fetchComments,
  saveComment: saveComment,
  userPolls: fetchUserPolls,
  castVote: castVote,
  sendFeedback: feedback,
  getPoll: fetchPoll,
  userPollVotes: getUserPollVotes,
  voteComment: voteComment,
};
