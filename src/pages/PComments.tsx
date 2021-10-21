import { Button, IconButton, Stack, Typography } from "@mui/material";
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
import { CLoadingComment } from "../components/loading/CLoadingComment";
import { ApiContext } from "../contexts/ApiProvider";
import { ApiMap } from "../api/ApiMap";
import { grey } from "@mui/material/colors";
import { fontSizes } from "../theme/fontSizes";

type TCommentsContext = {
  addComment: (comment: Comment) => Promise<any>;
  getImmediateSubtree: (commentId: string) => Comment[];
};

export const CommentsContext = createContext<TCommentsContext>({
  addComment: async () => {},
  getImmediateSubtree: () => [],
});

interface PCommentsProps {}

const PComments: FC<PCommentsProps> = () => {
  const [comments, setComments] = useState([] as Comment[]);
  const [showAddReply, setShowAddReply] = useState(false);
  const { getAuthenticatedUser } = useContext(AuthContext);
  const history = useHistory();
  const { pollId } = useParams<{ pollId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { getInstance } = useContext(ApiContext);
  useEffect(() => {
    (async () => {
      try {
        if (!pollId) throw new Error("Invalid poll id from url params");
        const comments = await ApiMap.comments(getInstance(), pollId);
        setComments(comments);
      } catch (error: any) {
        setError(true);
      }
      setLoading(false);
    })();
  }, [pollId]);
  if (!pollId) return <em>No comments. The post might have been deleted</em>;
  const addComment = async (newComment: Comment) => {
    try {
      setComments(comments.concat(newComment));
      await ApiMap.saveComment(getInstance(), newComment);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <CommentsContext.Provider
      value={{
        addComment,
        getImmediateSubtree: (commentId) =>
          Comment.getImmediateSubtree(commentId, comments),
      }}
    >
      <Stack spacing={2} sx={{ my: 1 }}>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            py: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIos
              fontSize="small"
              sx={{
                color: grey[500],
              }}
            />
          </IconButton>
          <Typography
            sx={{
              fontSize: fontSizes[4],
              px: 2,
              fontWeight: 600,
              color: grey[500],
            }}
            variant="h1"
          >
            Discussion
          </Typography>
        </Stack>
        {error && (
          <Stack spacing={0.5} sx={{ textAlign: "center" }}>
            <h4>Sorry, and unexpected error occurred</h4>
            <small>We are working on solving the problem. Be back soon</small>
          </Stack>
        )}
        {!error && (
          <Box>
            <Button
              startIcon={<Reply />}
              onClick={() => setShowAddReply(!showAddReply)}
            >
              reply to post
            </Button>
          </Box>
        )}
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
        {!error && (
          <Stack spacing={2}>
            {loading
              ? new Array(10)
                  .fill(null)
                  .map((_, index) => <CLoadingComment key={index} />)
              : Comment.getImmediateSubtree(pollId, comments).map(
                  (comment, index) => (
                    <CComment key={comment.id} comment={comment} />
                  )
                )}
          </Stack>
        )}
      </Stack>
    </CommentsContext.Provider>
  );
};

export default WithAuthentication(PComments);
