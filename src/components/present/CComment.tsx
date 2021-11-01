import {
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import { formatDistanceToNow } from "date-fns";
import { FC, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import Comment from "../../logic/Comment";
import CCreateComment from "../create/CCreateComment";
import {
  ArrowDownward,
  ArrowUpward,
  Reply,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { CommentsContext } from "./CComments";
import COption from "./COption";
import toast from "react-hot-toast";
interface CCommentProps {
  comment: Comment;
}

const CComment: FC<CCommentProps> = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showAddReply, setShowAddReply] = useState(false);
  const { getAuthenticatedUser, isAuthenticated, openAuthDialog } =
    useContext(AuthContext);
  const {
    getImmediateSubtree,
    addComment,
    voteComment,
    getUserCommentVote,
    pastDeadline,
  } = useContext(CommentsContext);

  const addToVotes = (): number => {
    switch (getUserCommentVote(comment.id)) {
      case "up":
        return 1;
      case "down":
        return -1;
      case "none":
        return 0;
      default:
        throw new Error("Invalid comment vote state");
    }
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Stack spacing={1} sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    color: grey[500],
                    alignItems: "center",
                  }}
                >
                  <span>{comment.username}</span>
                  <span>-</span>
                  <span>
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <Stack
                  spacing={1}
                  sx={{ alignItems: "center" }}
                  direction="row"
                >
                  <IconButton
                    onClick={() => {
                      if (pastDeadline) {
                        toast.error(
                          "You cannot upvote or downvote this comment. You are past the deadline"
                        );
                        return;
                      }
                      voteComment(comment.id, "up");
                    }}
                  >
                    <ArrowUpward
                      sx={{
                        color: addToVotes() === 1 ? indigo[700] : grey[100],
                      }}
                    />
                  </IconButton>
                  <Typography>
                    {comment.votes.up - comment.votes.down}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      if (pastDeadline) {
                        toast.error(
                          "You cannot upvote or downvote this comment. You are past the deadline"
                        );
                        return;
                      }
                      voteComment(comment.id, "down");
                    }}
                  >
                    <ArrowDownward
                      sx={{
                        color: addToVotes() === -1 ? indigo[700] : grey[100],
                      }}
                    />
                  </IconButton>
                </Stack>
              </Box>
              {comment.suggestion !== undefined && (
                <COption option={comment.suggestion} />
              )}
              <p>{comment.comment}</p>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                }}
              >
                {getImmediateSubtree(comment.id).length > 0 && (
                  <Button
                    size="small"
                    startIcon={showReplies ? <VisibilityOff /> : <Visibility />}
                    onClick={() => setShowReplies(!showReplies)}
                  >
                    {showReplies ? "hide" : "show"} replies
                  </Button>
                )}
                <Button
                  size="small"
                  startIcon={<Reply />}
                  onClick={() => {
                    if (isAuthenticated()) {
                      if (pastDeadline) {
                        toast.error(
                          "You cannot comment. You are past the deadline"
                        );
                        return;
                      }
                      setShowAddReply(!showAddReply);
                    } else {
                      openAuthDialog();
                    }
                  }}
                >
                  reply
                </Button>
              </div>
            </Stack>
          </Box>

          {showAddReply && (
            <CCreateComment
              initialComment={
                new Comment(
                  "",
                  getAuthenticatedUser().username,
                  comment.ancestors.concat(comment.id)
                )
              }
              onCreate={(newComment) => {
                addComment(newComment);
                setShowAddReply(false);
              }}
            />
          )}
          <Box>
            {showReplies &&
              getImmediateSubtree(comment.id).map((reply) => (
                <CComment key={reply.id} comment={reply} />
              ))}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CComment;
