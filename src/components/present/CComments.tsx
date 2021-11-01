import {
  Button,
  Container,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { createContext, FC, useContext, useEffect, useState } from "react";
import CCreateComment from "../create/CCreateComment";
import CComment from "./CComment";
import { AuthContext } from "../../contexts/AuthProvider";
import Comment from "../../logic/Comment";
import { Reply, ArrowBackIos, Add } from "@mui/icons-material";
import { Box } from "@mui/system";
import toast from "react-hot-toast";
import { CLoadingComment } from "../loading/CLoadingComment";
import { ApiContext } from "../../contexts/ApiProvider";
import { ApiMap } from "../../api/ApiMap";
import { grey } from "@mui/material/colors";
import { fontSizes } from "../../theme/fontSizes";
import { BotContext } from "../../contexts/BotProvider";
import { ActiveBotContext } from "../../contexts/ActiveBotProvider";
import produce from "immer";
import { ReactComponent as AddNote } from "../../illustrations/addnote.svg";

type TCCommentsContext = {
  addComment: (comment: Comment) => Promise<any>;
  getImmediateSubtree: (commentId: string) => Comment[];
  voteComment: (commentId: string, upOrDown: "up" | "down") => any;
  getUserCommentVote: (commentId: string) => "up" | "none" | "down";
};

export const CommentsContext = createContext<TCCommentsContext>({
  addComment: async () => {},
  getImmediateSubtree: () => [],
  voteComment: () => {},
  getUserCommentVote: () => "none",
});

interface CCommentsProps {
  pollId: string;
}

const CComments: FC<CCommentsProps> = ({ pollId }) => {
  const [comments, setComments] = useState([] as Comment[]);
  const [userCommentVotes, setUserCommentVotes] = useState(
    new Map<string, "up" | "down">()
  );
  const [showAddReply, setShowAddReply] = useState(false);
  const { getAuthenticatedUser, isAuthenticated, openAuthDialog, token } =
    useContext(AuthContext);
  const { activeBot } = useContext(ActiveBotContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { getInstance } = useContext(ApiContext);

  useEffect(() => {
    (async () => {
      try {
        if (pollId === "") throw new Error("Invalid poll id from url params");
        const { comments, userCommentVotes: serverUserCommentVotes } =
          await ApiMap.comments(getInstance(), pollId);
        setComments(comments);
        setUserCommentVotes(serverUserCommentVotes);
      } catch (error: any) {
        setError(true);
      }
      setLoading(false);
    })();
  }, [pollId, token, activeBot]);
  const addComment = async (newComment: Comment) => {
    try {
      setComments(comments.concat(newComment));
      await ApiMap.saveComment(getInstance(), newComment);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const voteComment = async (commentId: string, upOrDown: "up" | "down") => {
    if (!isAuthenticated()) {
      openAuthDialog();
      return;
    }
    if (userCommentVotes.get(commentId) === upOrDown) return;
    setComments(
      produce((draft) => {
        const index = comments.findIndex((c) => c.id === commentId);
        if (
          userCommentVotes.get(commentId) !== upOrDown &&
          userCommentVotes.get(commentId) !== undefined
        ) {
          draft[index].votes[upOrDown === "up" ? "down" : "up"] -= 1;
        }
        draft[index].votes[upOrDown] += 1;
      })
    );
    setUserCommentVotes(
      produce((draft) => {
        draft.set(commentId, upOrDown);
      })
    );
    ApiMap.voteComment(getInstance(), commentId, upOrDown).catch((error: any) =>
      toast.error(error.message)
    );
  };

  const getUserCommentVote = (commentId: string): "up" | "none" | "down" => {
    const vote = userCommentVotes.get(commentId) || "none";
    return vote;
  };

  return (
    <CommentsContext.Provider
      value={{
        addComment,
        getImmediateSubtree: (commentId) =>
          Comment.getImmediateSubtree(commentId, comments),
        voteComment,
        getUserCommentVote,
      }}
    >
      <Stack spacing={2} sx={{ my: 1 }}>
        {error && (
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <h4>Sorry, and unexpected error occurred</h4>
            <small>We are working on solving the problem. Be back soon</small>
          </Stack>
        )}
        {!error && !showAddReply && comments.length !== 0 && (
          <Box>
            <Button
              startIcon={<Reply />}
              onClick={() => {
                if (isAuthenticated()) {
                  setShowAddReply(!showAddReply);
                } else {
                  openAuthDialog();
                }
              }}
            >
              reply to poll
            </Button>
          </Box>
        )}
        {!error && !loading && comments.length === 0 && !showAddReply && (
          <Stack
            spacing={1}
            sx={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ py: 2 }}>
              <AddNote height={200} />
            </Box>
            <Typography>Be the first to join the discussion</Typography>
            <Button
              startIcon={<Add />}
              variant="contained"
              color="primary"
              onClick={() => {
                if (isAuthenticated()) {
                  setShowAddReply(!showAddReply);
                } else {
                  openAuthDialog();
                }
              }}
            >
              comment
            </Button>
          </Stack>
        )}
        {showAddReply && (
          <CCreateComment
            onCreate={(newComment) => {
              addComment(newComment);
              setShowAddReply(false);
            }}
            initialComment={
              new Comment(
                "",
                activeBot !== undefined
                  ? activeBot.username
                  : getAuthenticatedUser().username,
                [pollId]
              )
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

interface CCommentsDialogProps extends CCommentsProps {
  open: boolean;
  onClose: () => any;
}

const Transition = React.forwardRef<FC>((props, ref) => {
  //@ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CCommentsDialog: FC<CCommentsDialogProps> = ({
  open,
  onClose,
  ...rest
}) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      //@ts-ignore
      TransitionComponent={Transition}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Container maxWidth="sm">
          <Stack spacing={2}>
            <Stack
              spacing={2}
              direction="row"
              sx={{
                py: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton onClick={() => onClose()}>
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
            <CComments {...rest} />
          </Stack>
        </Container>
      </Box>
    </Dialog>
  );
};

export default CComments;
