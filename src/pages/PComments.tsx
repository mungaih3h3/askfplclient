import { Button, Stack } from "@mui/material";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import CCreateComment from "../components/create/CCreateComment";
import CComment from "../components/present/CComment";
import { AuthContext } from "../contexts/AuthProvider";
import { WithAuthentication } from "../HOC/WithAuthentication";
import Comment from "../logic/Comment";
import { Reply, ArrowBackIos } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import { fetchComments, saveComment } from "../api/Comments";
import toast from "react-hot-toast";

type TCommentsContext = {
  addComment: (comment: Comment) => any;
  getImmediateSubtree: (commentId: string) => Comment[];
};

export const CommentsContext = createContext<TCommentsContext>({
  addComment: () => {},
  getImmediateSubtree: () => [],
});

interface PCommentsProps {}

const PComments: FC<PCommentsProps> = () => {
  const [comments, setComments] = useState([] as Comment[]);
  const [showAddReply, setShowAddReply] = useState(false);
  const { getAuthenticatedUser, getToken } = useContext(AuthContext);
  const history = useHistory();
  const { pollId } = useParams<{ pollId: string }>();
  useEffect(() => {
    if (pollId !== undefined)
      fetchComments(pollId)
        .then(setComments)
        .catch((error: any) => toast.error(error.message));
  }, [pollId]);
  if (!pollId) return <em>No comments. The post might have been deleted</em>;
  const addComment = (newComment: Comment) => {
    setComments(comments.concat(newComment));
    saveComment(newComment, getToken()).catch((error: any) =>
      toast.error(error.message)
    );
  };

  return (
    <CommentsContext.Provider
      value={{
        addComment,
        getImmediateSubtree: (commentId) =>
          Comment.getImmediateSubtree(commentId, comments),
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <h2>Discussion</h2>
          <Button
            onClick={() => history.goBack()}
            variant="outlined"
            startIcon={<ArrowBackIos />}
          >
            Back
          </Button>
        </Box>
        <Box>
          <Button
            startIcon={<Reply />}
            onClick={() => setShowAddReply(!showAddReply)}
          >
            reply to post
          </Button>
        </Box>
        {showAddReply && (
          <CCreateComment
            onCreate={(newComment) => {
              addComment(newComment);
              setShowAddReply(false);
            }}
            initialComment={
              new Comment("", getAuthenticatedUser().username, [pollId])
            }
          />
        )}
        <Stack spacing={2}>
          {Comment.getImmediateSubtree(pollId, comments).map(
            (comment, index) => (
              <CComment key={comment.id} comment={comment} />
            )
          )}
        </Stack>
      </Stack>
    </CommentsContext.Provider>
  );
};

export default WithAuthentication(PComments);
